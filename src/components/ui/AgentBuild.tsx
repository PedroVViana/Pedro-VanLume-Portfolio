import { useLayoutEffect } from 'react';
import gsap from 'gsap';

/**
 * "Agentic build": vários cursores (agentes) montam o site na frente do usuário.
 *
 * Fluxo:
 *  1. Intro: enxame de cursores orbitando o centro da tela + HUD "Escaneando página…".
 *  2. Cada elemento visível vira uma "camada": um agente voa até ele, arrasta um
 *     wireframe (contorno ciano + alças + etiqueta) e revela o conteúdo — texto é
 *     "digitado" com cursor I-beam, o resto aparece com um pop.
 *  3. Ao rolar a página, as camadas que entram na tela são montadas do mesmo jeito.
 *
 * O componente não altera o JSX das seções: ele lê o DOM já renderizado.
 * Para excluir algo, use `data-build-skip`; para forçar um bloco único, `data-build`.
 */

const AGENT_COLORS = [
  '#ff5f57', '#febc2e', '#28c840', '#0ea5e9', '#8c52ff', '#f472b6',
  '#22d3ee', '#a3e635', '#fb923c', '#e879f9', '#60a5fa', '#34d399',
  '#facc15', '#f87171', '#c084fc', '#2dd4bf', '#818cf8', '#fda4af',
];

const ATOMIC_TAGS = new Set(['img', 'svg', 'input', 'textarea', 'select', 'video', 'iframe', 'picture']);
const WRAPPER_ATOMIC_TAGS = new Set(['a', 'button']);
const BLOCK_TEXT_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']);
const INLINE_TEXT_TAGS = new Set([
  'li', 'blockquote', 'label', 'figcaption', 'dt', 'dd', 'span', 'small',
  'strong', 'em', 'b', 'code', 'td', 'th',
]);
const BLOCKISH = 'h1,h2,h3,h4,h5,h6,p,ul,ol,li,div,img,picture,button,blockquote,section,article,video,iframe,table';
const SKIP_TAGS = new Set(['script', 'style', 'noscript', 'template', 'canvas', 'br', 'hr']);

type Kind = 'text' | 'pop';

interface Task {
  el: Element;
  kind: Kind;
  label: string;
}

interface Agent {
  el: HTMLDivElement;
  color: string;
  busy: boolean;
}

const CURSOR_SVG = (color: string) => `
  <svg class="ab-arrow" width="18" height="20" viewBox="0 0 18 20" aria-hidden="true">
    <path d="M2 1.5 L15.5 9.2 L9.4 10.6 L6.4 16.8 Z" fill="${color}" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/>
  </svg>
  <svg class="ab-ibeam" width="12" height="20" viewBox="0 0 12 20" aria-hidden="true">
    <path d="M2 1.5h3l1 1 1-1h3M6 2.5v15M2 18.5h3l1-1 1 1h3" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M2 1.5h3l1 1 1-1h3M6 2.5v15M2 18.5h3l1-1 1 1h3" fill="none" stroke="#111" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function hasOwnText(el: Element) {
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) return true;
  }
  return false;
}

function isRendered(el: Element) {
  const r = el.getBoundingClientRect();
  return r.width > 2 && r.height > 2;
}

/** Decide se o elemento é uma "camada" a ser montada (e não percorre seus filhos). */
function classify(el: Element): Kind | null {
  const tag = el.tagName.toLowerCase();
  if (el.hasAttribute('data-build')) return 'pop';
  if (ATOMIC_TAGS.has(tag)) return 'pop';
  if (WRAPPER_ATOMIC_TAGS.has(tag)) {
    // Link/botão que embrulha um card inteiro: desce para montar as partes.
    return el.querySelector('h1,h2,h3,h4,h5,h6,p,div,img,ul,li') ? null : 'pop';
  }
  if (BLOCK_TEXT_TAGS.has(tag)) return el.textContent?.trim() ? 'text' : 'pop';
  if (INLINE_TEXT_TAGS.has(tag)) {
    if (el.querySelector(BLOCKISH)) return null;
    return el.textContent?.trim() ? 'text' : null;
  }
  if (tag === 'div' && hasOwnText(el) && !el.querySelector(BLOCKISH)) return 'text';
  return null;
}

function collectTargets(root: Element, layer: Element, hud: Element): Task[] {
  const out: Task[] = [];
  const walk = (parent: Element) => {
    for (const child of Array.from(parent.children)) {
      const tag = child.tagName.toLowerCase();
      if (child === layer || child === hud) continue;
      if (SKIP_TAGS.has(tag)) continue;
      if (child.matches('[aria-hidden="true"],[data-build-skip],.animate-marquee')) continue;
      if (!isRendered(child)) continue;
      const kind = classify(child);
      if (kind) {
        out.push({ el: child, kind, label: labelFor(child) });
      } else {
        walk(child);
      }
    }
  };
  walk(root);
  return out;
}

function labelFor(el: Element) {
  const tag = el.tagName.toLowerCase();
  const cls = (el.getAttribute('class') || '').split(/\s+/).find((c) => /^[a-z][a-z-]{2,18}$/.test(c));
  return cls && !['flex', 'grid', 'block', 'inline-flex', 'relative', 'absolute', 'hidden'].includes(cls)
    ? `${tag}.${cls}`
    : tag;
}

function tweenTo(target: gsap.TweenTarget, vars: gsap.TweenVars) {
  return new Promise<void>((resolve) => {
    gsap.to(target, { ...vars, onComplete: () => resolve() });
  });
}

export default function AgentBuild() {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.getElementById('root');
    if (!root) return;

    let alive = true;
    const isMobile = window.innerWidth < 768;
    const AGENT_COUNT = isMobile ? 8 : 18;

    // ---------- Camada visual (cursores + wireframes), em coordenadas do documento ----------
    const layer = document.createElement('div');
    layer.className = 'ab-layer';
    layer.setAttribute('aria-hidden', 'true');

    // ---------- HUD ----------
    const hud = document.createElement('div');
    hud.className = 'ab-hud';
    hud.setAttribute('aria-hidden', 'true');
    hud.innerHTML = `
      <div class="ab-hud-dots">${AGENT_COLORS.slice(0, 5).map((c) => `<i style="background:${c}"></i>`).join('')}</div>
      <span class="ab-hud-agents">${AGENT_COUNT} agentes</span>
      <span class="ab-hud-sep"></span>
      <span class="ab-hud-count">0 / 0 camadas</span>
      <span class="ab-hud-status" data-state="scan">Escaneando página…</span>
      <span class="ab-hud-bar"><i></i></span>`;
    const hudCount = hud.querySelector('.ab-hud-count') as HTMLSpanElement;
    const hudStatus = hud.querySelector('.ab-hud-status') as HTMLSpanElement;
    const hudBar = hud.querySelector('.ab-hud-bar i') as HTMLElement;

    // ---------- Coleta e esconde as camadas antes do primeiro paint ----------
    const tasksAll = collectTargets(root, layer, hud);
    tasksAll.forEach((t) => t.el.setAttribute('data-ab', 'pending'));

    document.body.appendChild(layer);
    document.body.appendChild(hud);

    const total = tasksAll.length;
    let done = 0;
    const updateHud = () => {
      hudCount.textContent = `${done} / ${total} camadas`;
      hudBar.style.width = `${total ? (done / total) * 100 : 100}%`;
    };
    updateHud();

    const setStatus = (state: 'scan' | 'build' | 'done') => {
      hudStatus.dataset.state = state;
      hudStatus.textContent = state === 'scan' ? 'Escaneando página…' : state === 'build' ? 'Construindo' : 'Concluído';
    };

    // ---------- Revelação ----------
    const cleanupAnim = (el: Element) => {
      const end = () => {
        if (el.getAttribute('data-ab') !== 'pending') el.removeAttribute('data-ab');
        (el as HTMLElement).style?.removeProperty('--ab-dur');
        (el as HTMLElement).style?.removeProperty('--ab-steps');
        el.removeEventListener('animationend', end);
      };
      el.addEventListener('animationend', end);
    };

    const revealInstant = (el: Element) => {
      el.removeAttribute('data-ab');
      done++;
      updateHud();
    };

    // ---------- Fila de tarefas ----------
    const queue: Task[] = [];
    let waiters: Array<() => void> = [];
    const notify = () => {
      const w = waiters;
      waiters = [];
      w.forEach((fn) => fn());
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          const task = tasksAll.find((t) => t.el === entry.target);
          if (task) queue.push(task);
        }
        if (queue.length) {
          wake();
          notify();
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0 },
    );

    const pickTask = (agent: Agent): Task | null => {
      const vh = window.innerHeight;
      // Camadas que já saíram muito da tela (rolagem rápida) aparecem direto.
      for (let i = queue.length - 1; i >= 0; i--) {
        const t = queue[i];
        if (!t.el.isConnected) { queue.splice(i, 1); done++; continue; }
        const r = t.el.getBoundingClientRect();
        if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) {
          queue.splice(i, 1);
          revealInstant(t.el);
        }
      }
      if (!queue.length) return null;
      const ax = Number(gsap.getProperty(agent.el, 'x')) - window.scrollX;
      const ay = Number(gsap.getProperty(agent.el, 'y')) - window.scrollY;
      let best = 0;
      let bestScore = Infinity;
      queue.forEach((t, i) => {
        const r = t.el.getBoundingClientRect();
        const offscreen = r.bottom < 0 || r.top > vh ? 4000 : 0;
        const score = Math.hypot(r.left - ax, r.top - ay) + offscreen + i * 6;
        if (score < bestScore) { bestScore = score; best = i; }
      });
      return queue.splice(best, 1)[0];
    };

    // ---------- Agentes ----------
    const cx0 = window.scrollX + window.innerWidth / 2;
    const cy0 = window.scrollY + window.innerHeight / 2;

    const agents: Agent[] = Array.from({ length: AGENT_COUNT }, (_, i) => {
      const el = document.createElement('div');
      el.className = 'ab-cursor';
      el.innerHTML = CURSOR_SVG(AGENT_COLORS[i % AGENT_COLORS.length]);
      layer.appendChild(el);
      gsap.set(el, { x: cx0, y: cy0, opacity: 0 });
      return { el, color: AGENT_COLORS[i % AGENT_COLORS.length], busy: false };
    });

    // Some com os cursores e o HUD quando tudo fica ocioso; volta quando chega trabalho.
    let idleTimer: number | undefined;
    let hidden = false;
    const wake = () => {
      window.clearTimeout(idleTimer);
      if (!hidden) return;
      hidden = false;
      setStatus('build');
      gsap.to(hud, { autoAlpha: 1, y: 0, duration: 0.3, overwrite: true });
      agents.forEach((a) => gsap.to(a.el, { opacity: 1, duration: 0.25, overwrite: 'auto' }));
    };
    const scheduleIdle = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (!alive || queue.length || agents.some((a) => a.busy)) return;
        hidden = true;
        setStatus('done');
        agents.forEach((a) => gsap.to(a.el, { opacity: 0, duration: 0.5, overwrite: 'auto' }));
        gsap.to(hud, { autoAlpha: 0, y: 12, duration: 0.5, delay: 1.1 });
      }, 700);
    };

    const runTask = async (agent: Agent, task: Task) => {
      const el = task.el;
      if (!el.isConnected) { done++; updateHud(); return; }
      const r = el.getBoundingClientRect();
      const x1 = r.left + window.scrollX;
      const y1 = r.top + window.scrollY;
      const w = r.width;
      const h = r.height;

      const ax = Number(gsap.getProperty(agent.el, 'x'));
      const ay = Number(gsap.getProperty(agent.el, 'y'));
      const dist = Math.hypot(x1 - ax, y1 - ay);

      // 1. voa até o canto superior esquerdo
      await tweenTo(agent.el, { x: x1, y: y1, duration: clamp(dist / 1500, 0.22, 0.6), ease: 'power2.inOut' });
      if (!alive) return;

      // 2. arrasta o wireframe
      const frame = document.createElement('div');
      frame.className = 'ab-frame';
      frame.innerHTML = `<i class="tl"></i><i class="tr"></i><i class="bl"></i><i class="br"></i><span class="ab-tag">${task.label}</span>`;
      layer.appendChild(frame);
      gsap.set(frame, { x: x1, y: y1, width: 0, height: 0, opacity: 1 });
      const drawDur = clamp(Math.hypot(w, h) / 1600, 0.18, 0.42);
      await Promise.all([
        tweenTo(frame, { width: w, height: h, duration: drawDur, ease: 'power2.out' }),
        tweenTo(agent.el, { x: x1 + w, y: y1 + h, duration: drawDur, ease: 'power2.out' }),
      ]);
      if (!alive) return;
      frame.classList.add('is-drawn');

      // 3. revela
      const htmlEl = el as HTMLElement;
      if (task.kind === 'text') {
        const cs = getComputedStyle(el);
        const fs = parseFloat(cs.fontSize) || 16;
        const lh = cs.lineHeight === 'normal' ? fs * 1.25 : parseFloat(cs.lineHeight) || fs * 1.25;
        const lines = Math.max(1, Math.round(h / lh));
        const len = (el.textContent || '').trim().length;
        agent.el.classList.add('is-typing');

        if (lines <= 2) {
          const dur = clamp(len * 0.02, 0.25, 0.8);
          htmlEl.style.setProperty('--ab-dur', `${dur}s`);
          htmlEl.style.setProperty('--ab-steps', String(clamp(len, 6, 48)));
          el.setAttribute('data-ab', 'type');
          cleanupAnim(el);
          gsap.set(agent.el, { x: x1, y: y1 + h / 2 - 10 });
          await tweenTo(agent.el, { x: x1 + w, duration: dur, ease: `steps(${clamp(len, 6, 48)})` });
        } else {
          const dur = clamp(lines * 0.13, 0.35, 1.1);
          htmlEl.style.setProperty('--ab-dur', `${dur}s`);
          htmlEl.style.setProperty('--ab-steps', String(lines));
          el.setAttribute('data-ab', 'lines');
          cleanupAnim(el);
          gsap.set(agent.el, { x: x1 + w, y: y1 });
          await tweenTo(agent.el, { y: y1 + h - lh, duration: dur, ease: `steps(${lines})` });
        }
        agent.el.classList.remove('is-typing');
      } else {
        el.setAttribute('data-ab', 'pop');
        cleanupAnim(el);
        gsap.fromTo(agent.el, { scale: 1 }, { scale: 0.82, duration: 0.08, yoyo: true, repeat: 1 });
        await new Promise((res) => window.setTimeout(res, 220));
      }

      done++;
      updateHud();

      // 4. wireframe some sem bloquear o agente
      gsap.to(frame, { opacity: 0, duration: 0.35, delay: 0.3, onComplete: () => frame.remove() });
    };

    const agentLoop = async (agent: Agent) => {
      while (alive) {
        const task = pickTask(agent);
        if (!task) {
          agent.busy = false;
          scheduleIdle();
          await new Promise<void>((res) => waiters.push(res));
          continue;
        }
        agent.busy = true;
        await runTask(agent, task);
      }
    };

    // ---------- Intro: enxame orbitando ----------
    const core = document.createElement('div');
    core.className = 'ab-core';
    layer.appendChild(core);
    gsap.set(core, { x: cx0 - 18, y: cy0 - 18, scale: 0.6, opacity: 0 });
    gsap.to(core, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' });
    gsap.fromTo(hud, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4, delay: 0.1 });

    const orbit = agents.map((_, i) => ({
      a: (i / AGENT_COUNT) * Math.PI * 2,
      r: 42 + Math.random() * 46,
      s: (1.6 + Math.random() * 1.6) * (i % 2 ? 1 : -1),
      wobble: Math.random() * Math.PI * 2,
    }));
    const t0 = performance.now();
    const orbitTick = () => {
      const t = (performance.now() - t0) / 1000;
      const cx = window.scrollX + window.innerWidth / 2;
      const cy = window.scrollY + window.innerHeight / 2;
      gsap.set(core, { x: cx - 18, y: cy - 18 });
      agents.forEach((ag, i) => {
        const o = orbit[i];
        const ang = o.a + t * o.s;
        const rr = o.r + Math.sin(t * 3 + o.wobble) * 8;
        gsap.set(ag.el, { x: cx + Math.cos(ang) * rr, y: cy + Math.sin(ang) * rr });
      });
    };
    gsap.ticker.add(orbitTick);
    agents.forEach((ag, i) => gsap.to(ag.el, { opacity: 1, duration: 0.3, delay: 0.05 + i * 0.03 }));

    const introTimer = window.setTimeout(() => {
      if (!alive) return;
      gsap.ticker.remove(orbitTick);
      gsap.to(core, { scale: 0.4, opacity: 0, duration: 0.3, onComplete: () => core.remove() });
      setStatus('build');
      tasksAll.forEach((t) => io.observe(t.el));
      agents.forEach((a) => agentLoop(a));
    }, 1150);

    return () => {
      alive = false;
      window.clearTimeout(introTimer);
      window.clearTimeout(idleTimer);
      gsap.ticker.remove(orbitTick);
      io.disconnect();
      gsap.killTweensOf([hud, core, ...agents.map((a) => a.el)]);
      notify();
      tasksAll.forEach((t) => {
        t.el.removeAttribute('data-ab');
        (t.el as HTMLElement).style?.removeProperty('--ab-dur');
        (t.el as HTMLElement).style?.removeProperty('--ab-steps');
      });
      layer.remove();
      hud.remove();
    };
  }, []);

  return null;
}

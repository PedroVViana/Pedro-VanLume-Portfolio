import { Button } from "@/components/ui/Button";

interface ProjectButtonProps {
    onClick?: () => void;
    text?: string;
}

export function ProjectButton({ onClick, text = "Ver projetos" }: ProjectButtonProps) {
    return (
        <Button
            className="group relative overflow-hidden bg-[#1D1D1F] hover:bg-black text-white shadow-apple-md px-10 h-11 rounded-full transition-all hover:scale-105 active:scale-95 border-none font-semibold"
            size="lg"
            onClick={onClick}
        >
            <span>
                {text}
            </span>
        </Button>
    );
}

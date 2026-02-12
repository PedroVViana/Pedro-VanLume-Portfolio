"use client";

import { useEffect, useMemo, useState, memo } from "react";
import {
    Cloud,
    fetchSimpleIcons,
    ICloud,
    renderSimpleIcon,
    SimpleIcon,
} from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
    containerProps: {
        style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingTop: 40,
        },
    },
    options: {
        reverse: true,
        depth: 1,
        wheelZoom: false,
        imageScale: 2,
        activeCursor: "pointer",
        tooltip: null,
        initial: [0.1, -0.1],
        clickToFront: 1000,
        dragControl: true,
        freezeActive: true,
        decel: 0.95,
        tooltipDelay: 0,
        outlineColour: "#0000",
        maxSpeed: 0.01,
        minSpeed: 0.002,
    },
};

export const renderCustomIcon = (
    icon: SimpleIcon,
    theme: string,
    onHover?: (icon: SimpleIcon | null) => void,
    onClick?: (icon: SimpleIcon) => void
) => {
    const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
    const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
    const minContrastRatio = theme === "dark" ? 2 : 1.2;

    return renderSimpleIcon({
        icon,
        bgHex,
        fallbackHex,
        minContrastRatio,
        size: 50,
        aProps: {
            href: undefined,
            target: undefined,
            rel: undefined,
            onClick: (e: any) => {
                e.preventDefault();
                e.stopPropagation();
                if (onClick) onClick(icon);
            },
            onMouseEnter: () => onHover?.(icon),
        },
        imgProps: {
            alt: icon.title,
        },
    });
};

export type DynamicCloudProps = {
    iconSlugs: string[];
    onIconHover?: (icon: SimpleIcon | null) => void;
    onIconClick?: (icon: SimpleIcon) => void;
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

// Usamos memo para evitar que o componente da nuvem re-renderize
// a menos que iconSlugs ou as funções de callback mudem.
export const IconCloud = memo(({
    iconSlugs,
    onIconHover,
    onIconClick,
}: DynamicCloudProps) => {
    const [data, setData] = useState<IconData | null>(null);
    const theme = "light";

    useEffect(() => {
        fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
    }, [iconSlugs]);

    const renderedIcons = useMemo(() => {
        if (!data) return null;

        return Object.values(data.simpleIcons).map((icon) =>
            renderCustomIcon(icon, theme, onIconHover, onIconClick)
        );
    }, [data, theme, onIconHover, onIconClick]);

    return (
        <div onMouseLeave={() => onIconHover?.(null)}>
            {/* @ts-ignore */}
            <Cloud {...cloudProps}>{renderedIcons}</Cloud>
        </div>
    );
});

IconCloud.displayName = "IconCloud";

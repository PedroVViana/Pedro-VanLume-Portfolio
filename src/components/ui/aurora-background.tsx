"use client";
import { cn } from "../../lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode;
    showRadialGradient?: boolean;
}

export const AuroraBackground = ({
    className,
    children,
    showRadialGradient = true,
    ...props
}: AuroraBackgroundProps) => {
    return (
        <div
            className={cn(
                "relative flex flex-col h-screen items-center justify-center bg-white border-none transition-bg",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className={cn(
                        "absolute -inset-[10px] opacity-100 will-change-transform aurora-container",
                        showRadialGradient && "[mask-image:radial-gradient(ellipse_at_100%_0%,black_20%,transparent_80%)]"
                    )}
                ></div>
            </div>
            <div className="relative z-10 w-full h-full flex flex-col">
                {children}
            </div>
        </div>
    );
};

import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";

interface GetStartedButtonProps {
    onClick?: () => void;
    text?: string;
}

export function GetStartedButton({ onClick, text = "Fale Comigo" }: GetStartedButtonProps) {
    return (
        <Button
            className="group relative overflow-hidden bg-white text-black hover:bg-white/90 border border-apple-border shadow-apple-sm transition-all active:scale-95 rounded-full px-10 h-11"
            size="lg"
            onClick={onClick}
        >
            <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0 font-semibold">
                {text}
            </span>
            <i className="absolute right-1 top-1 bottom-1 rounded-full z-10 grid w-1/4 place-items-center transition-all duration-500 bg-black/5 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-black not-italic">
                <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
            </i>
        </Button>
    );
}

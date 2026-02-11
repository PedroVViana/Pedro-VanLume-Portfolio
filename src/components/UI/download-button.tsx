import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
    onClick?: () => void;
    text?: string;
}

export function DownloadButton({ onClick, text = "Baixar CV" }: DownloadButtonProps) {
    return (
        <Button
            className="group relative overflow-hidden bg-apple-accent-blue text-white hover:bg-apple-accent-blue/90 border-none shadow-apple-sm transition-all active:scale-95 rounded-full px-10 h-11"
            size="lg"
            onClick={onClick}
        >
            <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0 font-semibold">
                {text}
            </span>
            <i className="absolute right-1 top-1 bottom-1 rounded-full z-10 grid w-1/4 place-items-center transition-all duration-500 bg-white/20 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-white not-italic">
                <Download size={16} strokeWidth={2} aria-hidden="true" />
            </i>
        </Button>
    );
}

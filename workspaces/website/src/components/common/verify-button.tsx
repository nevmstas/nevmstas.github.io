'use client'

import { ExternalLink } from "lucide-react";

interface VerifyButtonProps {
  link: string;
}

export function VerifyButton({ link }: VerifyButtonProps) {
  return (
    <button 
      className="text-xs text-cyan-400 flex items-center hover:text-cyan-300 transition-colors" 
      onClick={() => window.open(link, "_blank")}
    >
      Verify <ExternalLink className="h-3 w-3 ml-1" />
    </button>
  );
} 
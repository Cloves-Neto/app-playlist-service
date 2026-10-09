"use client";

import React from "react";
import { Music2 } from "lucide-react";

interface QuickCaptureInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}

export const QuickCaptureInput = React.forwardRef<HTMLInputElement, QuickCaptureInputProps>(
  ({ value, onChange, error, disabled }, ref) => {
    return (
      <div className="w-full">
        <div className="relative flex items-center">
          <Music2 className="absolute left-3 w-4 h-4 text-muted-foreground/70 pointer-events-none" />
          <input
            ref={ref}
            type="text"
            placeholder="Qual música você quer anotar hoje? (Ex: Bohemian Rhapsody)"
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full bg-transparent pl-9 pr-4 py-2.5 text-sm md:text-base font-medium placeholder:text-muted-foreground/60 focus:outline-none disabled:opacity-50 text-foreground"
          />
        </div>
        {error && <p className="text-[11px] text-destructive px-3 pt-1">{error}</p>}
      </div>
    );
  }
);

QuickCaptureInput.displayName = "QuickCaptureInput";

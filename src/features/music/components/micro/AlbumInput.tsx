"use client";

import React from "react";
import { Disc } from "lucide-react";

interface AlbumInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}

export function AlbumInput({ value, onChange, error, disabled }: AlbumInputProps) {
  return (
    <div className="flex-1 min-w-[140px]">
      <div className="relative flex items-center">
        <Disc className="absolute left-2.5 w-3.5 h-3.5 text-muted-foreground/60 pointer-events-none" />
        <input
          type="text"
          placeholder="Álbum ou Single"
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border/50 rounded-md pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
        />
      </div>
      {error && <p className="text-[10px] text-destructive px-1 pt-0.5">{error}</p>}
    </div>
  );
}

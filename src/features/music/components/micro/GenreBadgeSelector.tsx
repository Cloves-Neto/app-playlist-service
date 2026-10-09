"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const PRESET_GENRES = [
  "Rock",
  "Pop",
  "Jazz",
  "Hip Hop",
  "Indie",
  "Eletrônica",
  "MPB",
  "R&B",
  "Lo-Fi",
  "Clássica",
];

interface GenreBadgeSelectorProps {
  value: string;
  onChange: (genre: string) => void;
}

export function GenreBadgeSelector({ value, onChange }: GenreBadgeSelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-1">
      <span className="text-[11px] text-muted-foreground mr-1">Sugestões:</span>
      {PRESET_GENRES.map((genre) => {
        const isSelected = value.toLowerCase() === genre.toLowerCase();
        return (
          <Badge
            key={genre}
            variant={isSelected ? "default" : "outline"}
            className={`cursor-pointer text-[10px] px-2 py-0.5 rounded-full transition-all select-none ${
              isSelected
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "border-border/60 hover:bg-muted/80 text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => onChange(genre)}
          >
            {genre}
          </Badge>
        );
      })}
    </div>
  );
}

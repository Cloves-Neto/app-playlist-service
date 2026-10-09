"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PlaylistCreateButtonProps {
  onClick: () => void;
}

export function PlaylistCreateButton({ onClick }: PlaylistCreateButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="w-full h-8 text-xs font-medium justify-center gap-1.5 border-dashed border-border/80 hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
    >
      <Plus className="w-3.5 h-3.5" />
      <span>Nova Playlist</span>
    </Button>
  );
}

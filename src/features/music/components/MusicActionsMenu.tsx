"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

interface MusicActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function MusicActionsMenu({ onEdit, onDelete }: MusicActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-1.5 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-ring">
        <MoreVertical className="w-3.5 h-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 bg-card/95 backdrop-blur-md border-border/80">
        <DropdownMenuItem
          onClick={onEdit}
          className="text-xs cursor-pointer flex items-center gap-2 py-1.5"
        >
          <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
          <span>Editar</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onDelete}
          className="text-xs cursor-pointer flex items-center gap-2 py-1.5 text-destructive focus:text-destructive"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Excluir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

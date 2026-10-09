"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, CornerDownLeft, Loader2 } from "lucide-react";

interface QuickCaptureSubmitButtonProps {
  isLoading: boolean;
  disabled?: boolean;
}

export function QuickCaptureSubmitButton({ isLoading, disabled }: QuickCaptureSubmitButtonProps) {
  return (
    <Button
      type="submit"
      size="sm"
      disabled={isLoading || disabled}
      className="h-7 px-3 text-xs font-medium gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Salvando...</span>
        </>
      ) : (
        <>
          <Plus className="w-3.5 h-3.5" />
          <span>Salvar Nota</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[9px] font-mono bg-primary-foreground/20 px-1 py-0.2 rounded ml-0.5">
            <CornerDownLeft className="w-2.5 h-2.5" />
          </kbd>
        </>
      )}
    </Button>
  );
}

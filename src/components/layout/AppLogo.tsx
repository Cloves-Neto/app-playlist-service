import React from "react";
import Link from "next/link";
import { Music } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AppLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
        <Music className="w-4 h-4" />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="font-bold text-base tracking-tight text-foreground">
          TrackNotes
        </span>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-mono text-muted-foreground border-border/60">
          v1.0
        </Badge>
      </div>
    </Link>
  );
}

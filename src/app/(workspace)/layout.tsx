import React, { Suspense } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { PlaylistSidebar } from "@/features/playlist/components/PlaylistSidebar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <AppHeader />
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          <Suspense
            fallback={
              <aside className="w-full md:w-60 shrink-0 space-y-4">
                <div className="h-4 w-20 bg-muted/50 rounded animate-pulse" />
                <div className="h-8 w-full bg-muted/30 rounded-lg animate-pulse" />
                <div className="h-28 w-full bg-muted/20 rounded-xl animate-pulse" />
              </aside>
            }
          >
            <PlaylistSidebar />
          </Suspense>
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

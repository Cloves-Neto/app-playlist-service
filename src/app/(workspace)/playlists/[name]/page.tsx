import React, { Suspense } from "react";
import { PlaylistDetailView } from "@/features/playlist/components/PlaylistDetailView";

interface PageProps {
  params: Promise<{ name: string }>;
}

async function PlaylistContent({ params }: PageProps) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  return <PlaylistDetailView playlistName={decodedName} />;
}

export default function PlaylistPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="space-y-4 animate-pulse">
          <div className="h-6 w-32 bg-muted/60 rounded" />
          <div className="h-24 w-full bg-muted/30 rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-32 rounded-xl bg-muted/30" />
            ))}
          </div>
        </div>
      }
    >
      <PlaylistContent params={params} />
    </Suspense>
  );
}

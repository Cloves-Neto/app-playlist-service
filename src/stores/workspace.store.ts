import { create } from "zustand";

interface WorkspaceState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPlaylist: string | null;
  setSelectedPlaylist: (name: string | null) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  selectedPlaylist: null,
  setSelectedPlaylist: (name: string | null) => set({ selectedPlaylist: name }),
}));

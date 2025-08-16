// src/types.ts

export interface DevilFruit {
  id: number;
  name: string;
  meaning: string;
  currentUser: string | null;
  picture: string | null;
  categoria: string;
  fandomUrl?: string;
}

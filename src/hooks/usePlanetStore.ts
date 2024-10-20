import { create } from 'zustand';
import { Planet, PlanetStore } from '@/interfaces/planets';

const usePlanetStore = create<PlanetStore>((set) => ({
  planets: [],
  setPlanets: (planets: Planet[]) => set({ planets }),
}));

export default usePlanetStore;

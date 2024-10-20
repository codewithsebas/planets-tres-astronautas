import { create } from 'zustand';
import { Planet, PlanetStore } from '@/interfaces/planets';

// Zustand hook that manages the state of planets.
// Stores an array of planets and provides a function to update that array.
const usePlanetStore = create<PlanetStore>((set) => ({
  planets: [],
  setPlanets: (planets: Planet[]) => set({ planets }),
}));

export default usePlanetStore;

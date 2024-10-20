import { create } from 'zustand';
import { FavoritesStore, Planet } from '@/interfaces/planets';

// Create a Zustand store to manage favorite planets
const useFavoritesStore = create<FavoritesStore>((set) => ({
  favorites: [],
  // Function to add a planet to favorites
  addFavorite: (planet: Planet) => {
    set((state) => {
      const updatedFavorites = state.favorites.some(
        (fav) => fav.id === planet.id
      )
        ? state.favorites
        : [...state.favorites, planet];
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      }

      return { favorites: updatedFavorites };
    });
  },
  // Function to remove a planet from favorites
  removeFavorite: (planetId: number | string) => {
    set((state) => {
      const updatedFavorites = state.favorites.filter(
        (fav) => fav.id !== planetId
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      }

      return { favorites: updatedFavorites };
    });
  },
}));

// Loads the favorites stored in localStorage when starting the store
if (typeof window !== 'undefined') {
  const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  useFavoritesStore.setState({ favorites: storedFavorites });
}

export default useFavoritesStore;

import { create } from 'zustand';
import { FavoritesStore, Planet } from '@/interfaces/planets';

const useFavoritesStore = create<FavoritesStore>((set) => ({
    favorites: [],
    addFavorite: (planet: Planet) => {
        set((state) => {
            const updatedFavorites = state.favorites.some((fav) => fav.id === planet.id)
                ? state.favorites
                : [...state.favorites, planet];
            if (typeof window !== 'undefined') {
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            }
            
            return { favorites: updatedFavorites };
        });
    },
    removeFavorite: (planetId: number | string) => {
        set((state) => {
            const updatedFavorites = state.favorites.filter((fav) => fav.id !== planetId);
            if (typeof window !== 'undefined') {
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            }

            return { favorites: updatedFavorites };
        });
    },
}));

if (typeof window !== 'undefined') {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    useFavoritesStore.setState({ favorites: storedFavorites });
}

export default useFavoritesStore;

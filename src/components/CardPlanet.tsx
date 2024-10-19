import { CardPlanetProps } from '@/interfaces/planets'
import React from 'react'
import { useRouter } from "next/router";
import useFavoritesStore from '@/store/useFavoritesStore';
import { Heart, HeartOff } from 'lucide-react';

const CardPlanet: React.FC<CardPlanetProps> = ({ planet }) => {
    const router = useRouter();
    const { addFavorite, removeFavorite, favorites } = useFavoritesStore();
    const isFavorite = planet ? favorites.some((fav) => fav.id === planet.id) : false;
    const handleFavoriteClick = () => {
        if (planet) {
            if (isFavorite) {
                removeFavorite(planet.id);
            } else {
                addFavorite(planet);
            }
        }
    };
    return (
        <div onClick={() => router.push(`/planet/${planet.id}`)} className='w-full border p-3 rounded-lg duration-200 hover:shadow'>
            <h2>{planet.name}</h2>
            <p>Masa: {planet.massvalue}</p>
            <div className='flex justify-end'>
                <button onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteClick();
                }}>
                    {
                        isFavorite ? <HeartOff size={20} /> : <Heart size={20} />
                    }
                </button>
            </div>
        </div>
    )
}

export default CardPlanet
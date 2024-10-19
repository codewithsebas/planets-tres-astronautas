import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Planet } from '@/interfaces/planets';
import { Heart, HeartOff } from 'lucide-react';
import useFavoritesStore from '@/store/useFavoritesStore';

export default function PlanetDetail() {
    const [planet, setPlanet] = useState<Planet | null>(null);
    const router = useRouter();
    const { id } = router.query;
    const { addFavorite, removeFavorite, favorites } = useFavoritesStore();

    useEffect(() => {
        const fetchPlanet = async () => {
            if (id) {
                const { data, error } = await supabase
                    .from('planets')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error("Error al obtener el planeta:", error.message);
                } else {
                    setPlanet(data);
                }
            }
        };

        fetchPlanet();
    }, [id]);

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

    if (!planet) return <div>Cargando...</div>;

    return (
        <div>
            <h1>{planet.name}</h1>
            <p>Masa: {planet.massvalue}</p>
            <button onClick={handleFavoriteClick}>
                {
                    isFavorite ? <HeartOff /> : <Heart />
                }
            </button>
        </div>
    );
}

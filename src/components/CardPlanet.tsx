import React from 'react';
import { CardPlanetProps } from '@/interfaces/planets';
import { useRouter } from 'next/router';
import useFavoritesStore from '@/store/useFavoritesStore';
import Image from 'next/image';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const CardPlanet: React.FC<CardPlanetProps> = ({ planet }) => {
  const router = useRouter();
  const { addFavorite, removeFavorite, favorites } = useFavoritesStore();
  const isFavorite = planet
    ? favorites.some((fav) => fav.id === planet.id)
    : false;
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
    <div
      onClick={() => router.push(`/planet/${planet.id}`)}
      className="group relative flex min-h-40 w-full cursor-pointer flex-col justify-between overflow-hidden rounded-lg border border-white/70 bg-gradient-to-r from-zinc-950 to-black p-3 shadow-white duration-200 hover:border-white hover:shadow-xl"
    >
      <h2 className="text-2xl font-semibold">{planet.name}</h2>
      <div className="z-20 py-3 text-white/80">
        <p>
          Nombre en inglés: <strong>{planet.englishname}</strong>
        </p>
        <p>
          Lunas: <strong>{planet.moons || 0}</strong>
        </p>
        <p>
          Masa (kg):{' '}
          <strong>
            {(
              planet.massvalue * Math.pow(10, planet.massexponent)
            ).toExponential(2)}
          </strong>
        </p>
        <p>
          Volumen (km³):{' '}
          <strong>
            {(planet.volvalue * Math.pow(10, planet.volexponent)).toExponential(
              2
            )}
          </strong>
        </p>
      </div>
      <div className="flex justify-start">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFavoriteClick();
          }}
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 active:scale-105" size={20} />
          ) : (
            <FaRegHeart className="text-white active:scale-105" size={20} />
          )}
        </button>
      </div>

      <div className="absolute -right-32 -top-6 h-60 w-80 opacity-80 duration-200 group-hover:opacity-100 sm:-right-24">
        <Image
          src={planet.image}
          alt={planet.name}
          width={1000}
          height={1000}
          className="h-full w-full scale-95 object-contain duration-200 group-hover:scale-100"
        />
      </div>
    </div>
  );
};

export default CardPlanet;

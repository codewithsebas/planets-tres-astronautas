import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Planet } from '@/interfaces/planets';
import useFavoritesStore from '@/store/useFavoritesStore';
import SpaceBackground from '@/components/SpaceBackground';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { RxExternalLink } from 'react-icons/rx';

export default function PlanetDetail() {
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
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
          if (error.code === 'PGRST116') {
            setNotFound(true);
          } else {
            console.error('Error al obtener el planeta:', error.message);
            setError(
              'Error al obtener el planeta. Por favor, intenta de nuevo.'
            );
          }
        } else if (!data) {
          setNotFound(true);
        } else {
          setPlanet(data);
        }
      }
    };

    fetchPlanet();
  }, [id]);

  // Planet detail component that handles planet fetching data shows detailed information and allows to mark it as a favorite. It uses Zustand for managing
  // the status of favorites. Handles different statuses such as loading, error and not found.
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

  const handleBack = () => {
    router.back();
  };

  if (error)
    return (
      <SpaceBackground>
        <main className="flex h-full min-h-screen w-full flex-col items-center justify-start gap-5 pb-10 pt-10 text-xl sm:pt-20">
          {error}{' '}
          <button
            onClick={handleBack}
            className="flex w-fit items-center gap-2 rounded-lg p-2 pe-4 duration-200 hover:bg-white/10"
          >
            <IoIosArrowBack /> Volver
          </button>
        </main>{' '}
      </SpaceBackground>
    );

  if (notFound)
    return (
      <SpaceBackground>
        <main className="flex h-full min-h-screen w-full flex-col items-center justify-start gap-5 pb-10 pt-10 text-xl sm:pt-20">
          El planeta no se ha encontrado.
          <button
            onClick={handleBack}
            className="flex w-fit items-center gap-2 rounded-lg p-2 pe-4 duration-200 hover:bg-white/10"
          >
            <IoIosArrowBack /> Volver
          </button>
        </main>
        .
      </SpaceBackground>
    );

  if (!planet)
    return (
      <SpaceBackground>
        <main className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-5 pb-10 pt-10 sm:pt-20">
          <AiOutlineLoading3Quarters className="animate-spin" />
          Cargando...
        </main>
      </SpaceBackground>
    );

  return (
    <>
      <Head>
        <title>Planets - {planet.name || 'Planeta'}</title>
        <meta name="description" content="Planets - Tres Astronautas" />
        <meta name="keywords" content="Planets" />
        <meta name="author" content="Sebastian Giraldo" />
      </Head>

      <SpaceBackground>
        <main className="flex h-full min-h-screen w-full flex-col items-center justify-start gap-8 pb-10 pt-10 sm:pt-20">
          <div className="flex w-full max-w-2xl flex-col px-4">
            <button
              onClick={handleBack}
              className="flex w-fit items-center gap-2 rounded-lg p-2 pe-4 duration-200 hover:bg-white/10"
            >
              <IoIosArrowBack /> Volver
            </button>
            <figure className="flex w-full max-w-4xl justify-center">
              <Image
                src={planet.image}
                alt={planet.name}
                width={1000}
                height={1000}
                className="h-auto w-full object-contain"
              />
            </figure>
            <div className="flex flex-col gap-5">
              <div className="flex items-end justify-between border-b pb-3">
                <h1 className="text-center text-3xl font-extrabold text-white sm:text-6xl">
                  {planet.name}
                </h1>
                <button
                  onClick={handleFavoriteClick}
                  aria-label="Toggle favorite"
                >
                  {isFavorite ? (
                    <FaHeart
                      className="text-red-500 active:scale-105"
                      size={20}
                    />
                  ) : (
                    <FaRegHeart
                      className="text-white active:scale-105"
                      size={20}
                    />
                  )}
                </button>
              </div>
              <div className="flex w-full flex-col gap-5 rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-semibold text-gray-200 sm:text-2xl">
                  Información del Planeta
                </h2>
                <ul className="space-y-2 text-base text-gray-200/90 sm:text-xl">
                  <li>
                    Nombre: <strong>{planet.name}</strong>
                  </li>
                  <li>
                    Nombre en inglés: <strong>{planet.englishname}</strong>
                  </li>
                  <li>
                    ¿Es un planeta?{' '}
                    <strong>{planet.isplanet ? 'Sí' : 'No'}</strong>
                  </li>
                  <li>
                    Lunas: <strong>{planet.moons || 0}</strong>
                  </li>
                  <li>
                    Semieje mayor (km): <strong>{planet.semimajoraxis}</strong>
                  </li>
                  <li>
                    Perihelio (km): <strong>{planet.perihelion}</strong>
                  </li>
                  <li>
                    Afelio (km): <strong>{planet.aphelion}</strong>
                  </li>
                  <li>
                    Excentricidad: <strong>{planet.eccentricity}</strong>
                  </li>
                  <li>
                    Inclinación (°): <strong>{planet.inclination}</strong>
                  </li>
                  <li>
                    Masa (kg):{' '}
                    <strong>
                      {(
                        planet.massvalue * Math.pow(10, planet.massexponent)
                      ).toExponential(2)}
                    </strong>
                  </li>
                  <li>
                    Volumen (km³):{' '}
                    <strong>
                      {(
                        planet.volvalue * Math.pow(10, planet.volexponent)
                      ).toExponential(2)}
                    </strong>
                  </li>
                  <li>
                    Densidad (g/cm³): <strong>{planet.density}</strong>
                  </li>
                  <li>
                    Gravedad (m/s²): <strong>{planet.gravity}</strong>
                  </li>
                  <li>
                    Velocidad de escape (m/s): <strong>{planet.escape}</strong>
                  </li>
                  <li>
                    Radio medio (km): <strong>{planet.meanradius}</strong>
                  </li>
                  <li>
                    Radio ecuatorial (km): <strong>{planet.equaradius}</strong>
                  </li>
                  <li>
                    Órbita sideral (días):{' '}
                    <strong>{planet.sideralorbit}</strong>
                  </li>
                  <li>
                    Rotación sideral (horas):{' '}
                    <strong>{planet.sideralrotation}</strong>
                  </li>
                  <li>
                    Temperatura promedio (°C): <strong>{planet.avgtemp}</strong>
                  </li>
                  <li>
                    Tipo de cuerpo: <strong>{planet.bodytype}</strong>
                  </li>
                </ul>

                <Link
                  href={planet.rel}
                  target="_blank"
                  className="mt-5 flex w-fit items-center gap-2 rounded-lg border px-4 py-2 duration-200 hover:bg-white/10"
                >
                  Más Información <RxExternalLink size={20} />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </SpaceBackground>
    </>
  );
}

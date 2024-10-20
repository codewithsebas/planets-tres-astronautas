import Head from 'next/head';
import { useEffect, useState } from 'react';
import usePlanetStore from '@/hooks/usePlanetStore';
import { fetchPlanets } from '@/services/planetService';
import CardPlanet from '@/components/CardPlanet';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination';
import SpaceBackground from '@/components/SpaceBackground';
import { IoClose, IoEarthSharp } from 'react-icons/io5';

export default function Home() {
  const router = useRouter();

  // Extracts the search, order and page parameters from the URL
  const {
    search: searchQuery,
    sort: sortQuery,
    page: pageQuery,
  } = router.query;

  const [page, setPage] = useState(Number(pageQuery) || 1);
  const [limit] = useState(5);
  const [search, setSearch] = useState<string>(
    Array.isArray(searchQuery) ? searchQuery[0] : searchQuery || ''
  );
  const [sort, setSort] = useState<string>(
    Array.isArray(sortQuery) ? sortQuery[0] : sortQuery || 'asc'
  );

  // Gets the global status of the planets from the custom hook
  const { planets, setPlanets } = usePlanetStore();
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  // Effect that is executed when loading planets according to search, order and page
  useEffect(() => {
    const loadPlanets = async () => {
      try {
        const data = await fetchPlanets(page, limit, search, sort);

        if (data.length === 0) {
          setNotFound(true);
        } else {
          setPlanets(data);
          setNotFound(false);
        }
      } catch (error) {
        console.error(error);
        setError('Error al cargar los planetas. Por favor, intenta de nuevo.');
      }
    };

    loadPlanets();
  }, [page, limit, search, sort, setPlanets]);

  // Updates the URL when the search, order or page parameters change
  useEffect(() => {
    const query = { search, sort, page };
    router.replace({
      pathname: '/',
      query,
    });
  }, [search, sort, page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    setPage(1);
    setNotFound(false);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setPage(1);
    setNotFound(false);
  };

  // Calculates the total number of planets and pages.
  const totalPlanets = planets.length;
  const totalPages = Math.ceil(totalPlanets / limit);

  return (
    <>
      <Head>
        <title>Planets - Tres Astronautas</title>
        <meta name="description" content="Planets - Tres Astronautas" />
        <meta name="keywords" content="Planets" />
        <meta name="author" content="Sebastian Giraldo" />
      </Head>
      <SpaceBackground>
        <main className="flex h-full min-h-screen w-full flex-col items-center justify-start gap-5 pb-10 pt-10 sm:pt-20">
          <div className="flex h-full w-full max-w-5xl flex-col gap-5 px-5">
            <h1 className="animate__bounce text-2xl font-bold">
              Bienvenido a Planetas - Tres Astronautas
            </h1>
            <div className="flex w-full flex-col justify-between gap-2 sm:flex-row">
              <div className="flex w-full items-center justify-between gap-2 rounded-lg border border-white/80 bg-black p-2 py-2">
                <IoEarthSharp size={20} color="#b9b9b9" />
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Buscar planeta"
                  className="w-full bg-transparent outline-none"
                />
                <IoClose
                  className="cursor-pointer"
                  size={20}
                  onClick={() => setSearch('')}
                />
              </div>
              <div className="w-full rounded-lg border border-white/80 bg-black p-2 sm:w-fit">
                <select
                  onChange={handleSortChange}
                  value={sort}
                  className="w-full bg-transparent px-3 outline-none sm:w-auto"
                >
                  <option value="asc" className="w-full bg-black">
                    Ascendente
                  </option>
                  <option value="desc" className="w-full bg-black">
                    Descendente
                  </option>
                </select>
              </div>
            </div>

            {error ? (
              <p className="flex flex-col items-center justify-center gap-3 text-xl">
                {error} <IoEarthSharp size={20} color="#b9b9b9" />
              </p>
            ) : notFound ? (
              <p className="flex h-full flex-col items-center justify-start gap-3 text-xl">
                No se encontraron planetas para tu búsqueda{' '}
                <IoEarthSharp size={30} />
              </p>
            ) : planets.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {planets.map((planet) => (
                  <CardPlanet key={planet.id} planet={planet} />
                ))}
              </div>
            ) : (
              <p className="flex h-full flex-col items-center justify-start gap-3 text-xl">
                Cargando...
              </p>
            )}

            {planets.length > 0 && (
              <Pagination
                currentPage={page}
                onPageChange={setPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </main>
      </SpaceBackground>
    </>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { useEffect, useState } from "react";
import usePlanetStore from "@/hooks/usePlanetStore";
import { fetchPlanets } from "@/services/planetService";
import CardPlanet from "@/components/CardPlanet";
import { useRouter } from "next/router";
import { Earth, Grid2x2X, X } from "lucide-react";
import Pagination from "@/components/Pagination";

export default function Home() {
  const router = useRouter();
  const { search: searchQuery, sort: sortQuery, page: pageQuery } = router.query;

  const [page, setPage] = useState(Number(pageQuery) || 1);
  const [limit] = useState(5);
  const [search, setSearch] = useState<string>(Array.isArray(searchQuery) ? searchQuery[0] : searchQuery || "");
  const [sort, setSort] = useState<string>(Array.isArray(sortQuery) ? sortQuery[0] : sortQuery || "asc");
  const { planets, setPlanets } = usePlanetStore();

  useEffect(() => {
    const loadPlanets = async () => {
      try {
        const data = await fetchPlanets(page, limit, search, sort);
        setPlanets(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadPlanets();
  }, [page, limit, search, sort, setPlanets]);

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
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setPage(1);
  };

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
      <main className="w-full h-full md:h-screen flex flex-col items-center justify-start gap-5 pt-10 sm:pt-20 pb-10">
        <div className="w-full h-full max-w-4xl flex flex-col gap-5 px-5">
          <h1 className="text-2xl font-bold">Bienvenido a Tres Astronautas</h1>
          <div className="w-full flex justify-between gap-2 flex-col sm:flex-row">
            <div className="w-full p-2 py-2 border rounded-lg  flex justify-between items-center gap-2 ">
              <Earth size={20} color="#b9b9b9" />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Buscar planeta"
                className="w-full outline-none"
              />
              <X className="cursor-pointer" size={20} onClick={() => setSearch("")} />
            </div>
            <div className="p-2 border rounded-lg w-full sm:w-fit">
            <select onChange={handleSortChange} value={sort} className="bg-transparent outline-none px-3 w-full sm:w-auto">
              <option value="asc" className="w-full">Ascendente</option>
              <option value="desc" className="w-full">Descendente</option>
            </select>
            </div>
          </div>


          {planets.length > 0 ? (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {
                planets.map((planet) => (
                  <CardPlanet key={planet.id} planet={planet} />
                ))}
            </div>
          ) : (
            <p className="flex items-center flex-col justify-start gap-3 h-full">No hay resultados <Grid2x2X size={20} color="#333" /></p>
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
    </>
  );
}

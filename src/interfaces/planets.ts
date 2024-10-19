export interface FavoritesStore {
    favorites: Planet[];
    addFavorite: (planet: Planet) => void;
    removeFavorite: (planetId: number | string) => void;
}
  
export interface PlanetStore {
    planets: Planet[];
    setPlanets: (planets: Planet[]) => void;
}
  
export interface Planet {
    id: string;
    name: string;
    englishname: string;
    image: string;
    isplanet: boolean;
    moons?: number;
    semimajoraxis: number;
    perihelion: number;
    aphelion: number;
    eccentricity: number;
    inclination: number;
    massvalue: number;
    massexponent: number;
    volvalue: number;
    volexponent: number;
    density: number;
    gravity: number;
    escape: number;
    meanradius: number;
    equaradius: number;
    polaradius: number;
    flattening: number;
    dimension?: string;
    sideralorbit: number;
    sideralrotation: number;
    aroundplanet?: string;
    discoveredby?: string;
    discoverydate?: Date;
    alternativename?: string;
    axistilt: number;
    avgtemp: number;
    mainanomaly: number;
    argperiapsis: number;
    longascnode: number;
    bodytype: string;
    rel: string;
}

export interface CardPlanetProps {
    planet: Planet;
}
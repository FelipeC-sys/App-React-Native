import { useEffect, useState } from "react";
import { PokemonListItem } from "../types/pokemon";

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=20";

export function usePokemonList() {
    const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPokemons() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error("No se pudo obtener la lista de Pokémon");
                }

                const data = await response.json();

                setPokemons(data.results);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error desconocido");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchPokemons();
    }, []);

    return {
        pokemons,
        loading,
        error,
    };
}
import { useEffect, useState } from "react";
import { PokemonDetail } from "../types/pokemon";

export function usePokemonDetail(name: string) {
    const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${name}`
                );

                if (!response.ok) {
                    throw new Error("No se pudo obtener el Pokémon");
                }

                const data: PokemonDetail = await response.json();

                setPokemon(data);
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

        fetchPokemon();
    }, [name]);

    return {
        pokemon,
        loading,
        error,
    };
}
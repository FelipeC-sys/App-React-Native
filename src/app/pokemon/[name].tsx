import { useLocalSearchParams } from "expo-router";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";

export default function PokemonDetailScreen() {
    const { name } = useLocalSearchParams<{ name: string }>();

    const pokemonName = Array.isArray(name) ? name[0] : name;

    const { pokemon, loading, error } = usePokemonDetail(pokemonName);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Cargando Pokémon...</Text>
            </View>
        );
    }

    if (error || !pokemon) {
        return (
            <View style={styles.center}>
                <Text>{error ?? "Pokémon no encontrado"}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{pokemon.name}</Text>

            <Image
                source={{ uri: pokemon.sprites.front_default ?? undefined }}
                style={styles.image}
            />

            <Text style={styles.info}>ID: {pokemon.id}</Text>
            <Text style={styles.info}>Altura: {pokemon.height}</Text>
            <Text style={styles.info}>Peso: {pokemon.weight}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 30,
        paddingTop: 60,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },
    info: {
        fontSize: 18,
        marginVertical: 5,
    },
});
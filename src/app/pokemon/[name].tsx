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
                <Text style={styles.message}>Cargando Pokémon...</Text>
            </View>
        );
    }

    if (error || !pokemon) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>
                    {error ?? "Pokémon no encontrado"}
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.id}>#{pokemon.id}</Text>

            <Text style={styles.title}>{pokemon.name}</Text>

            <Image
                source={{
                    uri: pokemon.sprites.front_default ?? undefined,
                }}
                style={styles.image}
            />

            <View style={styles.infoContainer}>
                <View style={styles.infoCard}>
                    <Text style={styles.label}>ID</Text>
                    <Text style={styles.value}>{pokemon.id}</Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.label}>Altura</Text>
                    <Text style={styles.value}>{pokemon.height}</Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.label}>Peso</Text>
                    <Text style={styles.value}>{pokemon.weight}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        paddingTop: 40,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    message: {
        marginTop: 10,
        fontSize: 16,
    },

    error: {
        fontSize: 16,
        textAlign: "center",
    },

    id: {
        fontSize: 18,
        fontWeight: "bold",
    },

    title: {
        fontSize: 36,
        fontWeight: "bold",
        textTransform: "capitalize",
        marginTop: 5,
    },

    image: {
        width: 250,
        height: 250,
        marginVertical: 20,
    },

    infoContainer: {
        width: "100%",
        gap: 12,
    },

    infoCard: {
        padding: 15,
        borderRadius: 12,
        backgroundColor: "#eeeeee",
        alignItems: "center",
    },

    label: {
        fontSize: 14,
        fontWeight: "bold",
    },

    value: {
        fontSize: 20,
        marginTop: 4,
    },
});
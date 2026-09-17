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
            <View style={styles.pokemonCard}>
                <Text style={styles.id}>#{pokemon.id}</Text>

                <Text style={styles.title}>{pokemon.name}</Text>

                <Image
                    source={{
                        uri: pokemon.sprites.front_default ?? undefined,
                    }}
                    style={styles.image}
                />
            </View>

            <Text style={styles.sectionTitle}>Información</Text>

            <View style={styles.infoContainer}>
                <View style={styles.infoCard}>
                    <Text style={styles.icon}>🔢</Text>
                    <Text style={styles.label}>ID</Text>
                    <Text style={styles.value}>{pokemon.id}</Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.icon}>📏</Text>
                    <Text style={styles.label}>Altura</Text>
                    <Text style={styles.value}>{pokemon.height}</Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.icon}>⚖️</Text>
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
        backgroundColor: "#f5f6fa",
        padding: 20,
        paddingTop: 40,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f6fa",
        padding: 20,
    },

    pokemonCard: {
        backgroundColor: "#ffffff",
        borderRadius: 25,
        alignItems: "center",
        paddingVertical: 25,
        borderWidth: 1,
        borderColor: "#e5e5e5",
    },

    id: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#999999",
    },

    title: {
        fontSize: 36,
        fontWeight: "bold",
        textTransform: "capitalize",
        marginTop: 5,
        color: "#222222",
    },

    image: {
        width: 260,
        height: 260,
        marginTop: 10,
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 25,
        marginBottom: 12,
        color: "#222222",
    },

    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },

    infoCard: {
        flex: 1,
        backgroundColor: "#ffffff",
        borderRadius: 16,
        paddingVertical: 15,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e5e5e5",
    },

    icon: {
        fontSize: 24,
        marginBottom: 5,
    },

    label: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#777777",
    },

    value: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 4,
        color: "#222222",
    },

    message: {
        marginTop: 10,
        fontSize: 16,
        color: "#555555",
    },

    error: {
        fontSize: 16,
        color: "#cc0000",
        textAlign: "center",
    },
});
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { router } from "expo-router";
import { useState } from "react";
import { usePokemonList } from "../hooks/usePokemonList";

export default function HomeScreen() {
  const { pokemons, loading, error } = usePokemonList();

  const [search, setSearch] = useState("");

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Cargando Pokémon...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokedex Lite</Text>

        <Text style={styles.subtitle}>
          Explora todos los Pokémon
        </Text>
      </View>

      <TextInput
        style={styles.search}
        placeholder="🔎  Buscar Pokémon..."
        placeholderTextColor="#888888"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      {filteredPokemons.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResults}>
            No se encontraron Pokémon.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredPokemons}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const pokemonId = item.url
              .split("/")
              .filter(Boolean)
              .pop();

            const imageUrl =
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/" +
              "sprites/pokemon/" +
              pokemonId +
              ".png";

            return (
              <Pressable
                style={({ pressed }) => [
                  styles.card,
                  pressed && styles.cardPressed,
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/pokemon/[name]",
                    params: {
                      name: item.name,
                    },
                  })
                }
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                  />
                </View>

                <View style={styles.cardInfo}>
                  <Text style={styles.pokemonId}>
                    #{pokemonId}
                  </Text>

                  <Text style={styles.pokemonName}>
                    {item.name}
                  </Text>

                  <Text style={styles.viewDetails}>
                    Ver detalles →
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    paddingHorizontal: 20,
    paddingTop: 55,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
    padding: 20,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#222222",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 16,
    color: "#777777",
  },

  search: {
    height: 52,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
    color: "#222222",
  },

  list: {
    paddingBottom: 30,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,

    borderWidth: 1,
    borderColor: "#e5e5e5",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 3,
  },

  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  image: {
    width: 85,
    height: 85,
  },

  cardInfo: {
    flex: 1,
  },

  pokemonId: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#999999",
    marginBottom: 3,
  },

  pokemonName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222222",
    textTransform: "capitalize",
  },

  viewDetails: {
    marginTop: 6,
    fontSize: 13,
    color: "#777777",
  },

  noResultsContainer: {
    alignItems: "center",
    marginTop: 40,
  },

  noResults: {
    fontSize: 17,
    color: "#777777",
    textAlign: "center",
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

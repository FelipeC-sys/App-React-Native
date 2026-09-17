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

  const filteredPokemons = pokemons.filter((pokemon) => {
    return pokemon.name
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>
          Cargando Pokémon...
        </Text>
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
      <Text style={styles.title}>Pokedex Lite</Text>

      <TextInput
        style={styles.search}
        placeholder="Buscar Pokémon..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <FlatList
        data={filteredPokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const pokemonId = item.url
            .split("/")
            .filter((part) => part !== "")
            .pop();

          const imageUrl =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/" +
            "sprites/pokemon/" +
            pokemonId +
            ".png";

          return (
            <Pressable
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/pokemon/[name]",
                  params: {
                    name: item.name,
                  },
                })
              }
            >
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
              />

              <Text style={styles.pokemonName}>
                {item.name}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },

  message: {
    marginTop: 10,
    fontSize: 16,
  },

  error: {
    fontSize: 16,
    textAlign: "center",
  },

  search: {
    height: 50,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#eeeeee",
  },

  image: {
    width: 70,
    height: 70,
    marginRight: 15,
  },

  pokemonName: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";
import { usePokemonList } from "../hooks/usePokemonList";

export default function HomeScreen() {
  const { pokemons, loading, error } = usePokemonList();

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
      <Text style={styles.title}>Pokedex Lite</Text>

      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/pokemon/[name]",
                params: { name: item.name },
              })
            }          >
            <Text style={styles.pokemonName}>{item.name}</Text>
          </Pressable>)}
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
  card: {
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#eeeeee",
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
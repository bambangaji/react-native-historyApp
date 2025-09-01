import React from "react";
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { markVisited, unmarkVisited } from "../redux/placesSlice";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const places = useSelector((state: RootState) => state.places.list);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            {item.visited ? (
              <Button
                title="Unmark Visited"
                onPress={() => dispatch(unmarkVisited(item.id))}
              />
            ) : (
              <Button
                title="Mark Visited"
                onPress={() => dispatch(markVisited(item.id))}
              />
            )}
          </View>
        )}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddPlace" as never)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#2196F3",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
});

import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { markVisited, unmarkVisited } from "../redux/placesSlice";

export default function HomeScreen() {
  const dispatch = useDispatch();
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
    </View>
  );
}

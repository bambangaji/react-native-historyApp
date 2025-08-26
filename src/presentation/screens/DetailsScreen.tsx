// src/presentation/screens/DetailsScreen.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
  Details: { placeId: number };
};

type DetailsRouteProp = RouteProp<RootStackParamList, "Details">;

export default function DetailsScreen() {
  const route = useRoute<DetailsRouteProp>();
  const { placeId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Text>Place ID: {placeId}</Text>
      {/* Later you can fetch the place details from Redux or a useCase */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
});

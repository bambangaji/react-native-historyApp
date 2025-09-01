import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { v4 as uuidv4 } from "uuid";
import { PlacesRepositoryImpl } from "../../data/repositories/placesRepositoryImpl";
import { Place } from "../../domain/entities/place";
import { GS } from "../styles/globalStyles";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Picker } from "@react-native-picker/picker";

const repo = new PlacesRepositoryImpl();

export default function AddPlaceScreen({ navigation }: any) {
    const [name, setName] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const locations = useSelector((state: RootState) => state.locations.locations);

    const handleSave = async () => {
        if (!name.trim()) {
            Alert.alert("Validation", "Name is required!");
            return;
        }

        const newPlace: Place = {
            id: uuidv4(),
            name,
            location: selectedLocation,
            visited: 0,
        };

        try {
            await repo.insertPlace(newPlace);
            Alert.alert("Success", "Place added!");
            navigation.goBack(); // go back to HomeScreen
        } catch (err) {
            console.error("Insert error:", err);
            Alert.alert("Error", "Could not add place");
        }
    };

    return (
        <View style={[GS.card, GS.m8]}>
            <Text >Name</Text>
            <TextInput
                style={[GS.border, GS.roundedLg, GS.pl8, GS.my8]}
                value={name}
                onChangeText={setName}
                placeholder="Enter place name"
            />

            <Text >Location</Text>
            <View style={[GS.border, GS.roundedLg, GS.my8]}>
                <Picker
                    selectedValue={selectedLocation}
                    onValueChange={(itemValue) => setSelectedLocation(itemValue)}
                >
                    <Picker.Item label="-- Select location --" value="" />
                    {locations.map((loc) => (
                        <Picker.Item key={loc.id} label={loc.name} value={loc.name} />
                    ))}
                </Picker>
            </View>

            <Button title="Save Place" onPress={handleSave} />
        </View>
    );
}

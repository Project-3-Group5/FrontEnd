import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const saved = await AsyncStorage.getItem("username");

        if (saved) {
            setUsername(saved);
        } else {
            setUsername("No user logged in");
        }
    };

    return (
        <View style={styles.page}>
            <Text style={styles.title}>Profile</Text>

            <View style={styles.card}>
                <Text style={styles.name}>{username}</Text>
                <Text style={styles.bio}>This is your profile page</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#111827",
        padding: 20,
        paddingTop: 60,
    },
    title: {
        color: "#f3f4f6",
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 20,
    },
    card: {
        backgroundColor: "#1f2937",
        borderRadius: 12,
        padding: 20,
    },
    name: {
        color: "#f3f4f6",
        fontSize: 22,
        fontWeight: "700",
    },
    bio: {
        color: "#9ca3af",
        marginTop: 8,
    },
});
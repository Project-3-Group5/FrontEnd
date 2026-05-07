import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
    const router = useRouter();

    const [tab, setTab] = useState("login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = async () => {
        if (!username || !password) return;

        const displayName =
            tab === "signup" ? `${firstName} ${lastName}` : username;

        await AsyncStorage.setItem("username", displayName);

        router.replace("/(tabs)");
    };

    return (
        <View style={styles.page}>
            <Text style={styles.title}>SkillSwap</Text>

            <View style={styles.tabs}>
                <TouchableOpacity onPress={() => setTab("login")}>
                    <Text style={tab === "login" ? styles.activeTab : styles.tab}>
                        Sign In
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setTab("signup")}>
                    <Text style={tab === "signup" ? styles.activeTab : styles.tab}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>

            {tab === "signup" && (
                <>
                    <TextInput
                        placeholder="First Name"
                        placeholderTextColor="#9ca3af"
                        style={styles.input}
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        placeholder="Last Name"
                        placeholderTextColor="#9ca3af"
                        style={styles.input}
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </>
            )}

            <TextInput
                placeholder="Username"
                placeholderTextColor="#9ca3af"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                    {tab === "login" ? "Sign In" : "Create Account"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#111827",
        justifyContent: "center",
        padding: 24,
    },
    title: {
        color: "#f3f4f6",
        fontSize: 32,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 30,
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#374151",
        paddingBottom: 10,
    },
    tab: {
        color: "#9ca3af",
        fontSize: 18,
    },
    activeTab: {
        color: "#a78bfa",
        fontSize: 18,
        fontWeight: "700",
    },
    input: {
        backgroundColor: "#1f2937",
        borderColor: "#374151",
        borderWidth: 1,
        borderRadius: 8,
        padding: 14,
        marginBottom: 16,
        color: "#f3f4f6",
    },
    button: {
        backgroundColor: "#a78bfa",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#111827",
        fontWeight: "700",
    },
});
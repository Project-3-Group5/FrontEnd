import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function SkillsScreen() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        try {
            setLoading(true);
            setError(false);

            const response = await fetch(`${BASE_URL}/skill`);

            if (!response.ok) throw new Error("Failed to fetch");

            const data = await response.json();
            setSkills(data);
        } catch (err) {
            console.error("Error fetching skills:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.page}>
                <ActivityIndicator size="large" color="#a78bfa" />
                <Text style={styles.statusText}>Loading skills from Render...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.page} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.title}>Explore Skills</Text>

            {error && (
                <Text style={styles.errorText}>
                    Could not connect to the server. Please try again.
                </Text>
            )}

            {skills.length === 0 && !error ? (
                <Text style={styles.statusText}>No skills found in the database.</Text>
            ) : (
                skills.map((skill) => (
                    <View key={skill.id} style={styles.card}>
                        <Text style={styles.name}>{skill.name}</Text>
                        {/* Note: Ensure your backend Skill model has 'category' and 'description'
                            fields, otherwise these will simply render empty/null */}
                        <Text style={styles.category}>{skill.category || "General"}</Text>
                        <Text style={styles.description}>
                            {skill.description || "No description provided."}
                        </Text>
                    </View>
                ))
            )}
        </ScrollView>
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
        borderColor: "#374151",
        borderWidth: 1,
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
    },
    name: {
        color: "#f3f4f6",
        fontSize: 18,
        fontWeight: "700",
    },
    category: {
        color: "#a78bfa", // Changed to match theme
        fontSize: 14,
        fontWeight: "600",
        marginTop: 4,
    },
    description: {
        color: "#9ca3af",
        marginTop: 6,
    },
    statusText: {
        color: "#9ca3af",
        textAlign: "center",
        marginTop: 20,
    },
    errorText: {
        color: "#f87171",
        textAlign: "center",
        marginBottom: 20,
    }
});
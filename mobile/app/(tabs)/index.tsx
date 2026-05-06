import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const users = [
    {
        username: "Alex Chen",
        bio: "I love coding and music.",
        offeredSkills: ["React", "JavaScript"],
        desiredSkills: ["Guitar", "Cooking"],
    },
    {
        username: "Maria Lopez",
        bio: "Designer and artist.",
        offeredSkills: ["Photoshop", "UI Design"],
        desiredSkills: ["Python", "Public Speaking"],
    },
    {
        username: "David Kim",
        bio: "Fitness trainer who wants to learn web development.",
        offeredSkills: ["Workout Plans", "Nutrition"],
        desiredSkills: ["Web Development"],
    },
];

export default function HomeScreen() {
    const [index, setIndex] = useState(0);

    const currentUser = users[index];

    const handleNext = () => {
        setIndex((prev) => prev + 1);
    };

    if (!currentUser) {
        return (
            <View style={styles.page}>
                <Text style={styles.brand}>SkillSwap</Text>
                <Text style={styles.title}>No more users</Text>
                <Text style={styles.bio}>Check back later for more people.</Text>
            </View>
        );
    }

    return (
        <View style={styles.page}>
            <Text style={styles.brand}>SkillSwap</Text>

            <View style={styles.card}>
                <Text style={styles.name}>{currentUser.username}</Text>
                <Text style={styles.bio}>{currentUser.bio}</Text>

                <Text style={styles.label}>Can Teach</Text>
                <View style={styles.tags}>
                    {currentUser.offeredSkills.map((skill) => (
                        <Text key={skill} style={styles.offerTag}>
                            {skill}
                        </Text>
                    ))}
                </View>

                <Text style={styles.label}>Wants to Learn</Text>
                <View style={styles.tags}>
                    {currentUser.desiredSkills.map((skill) => (
                        <Text key={skill} style={styles.wantTag}>
                            {skill}
                        </Text>
                    ))}
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.passBtn} onPress={handleNext}>
                        <Text style={styles.passText}>Pass</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.connectBtn} onPress={handleNext}>
                        <Text style={styles.connectText}>Interested</Text>
                    </TouchableOpacity>
                </View>
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
    brand: {
        color: "#a78bfa",
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 28,
    },
    title: {
        color: "#f3f4f6",
        fontSize: 28,
        fontWeight: "700",
    },
    card: {
        backgroundColor: "#1f2937",
        borderColor: "#374151",
        borderWidth: 1,
        borderRadius: 16,
        padding: 20,
    },
    name: {
        color: "#f3f4f6",
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 6,
    },
    bio: {
        color: "#9ca3af",
        fontSize: 16,
        marginBottom: 18,
    },
    label: {
        color: "#9ca3af",
        fontSize: 15,
        marginTop: 10,
        marginBottom: 8,
    },
    tags: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    offerTag: {
        color: "#34d399",
        borderWidth: 1,
        borderColor: "#34d399",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 6,
    },
    wantTag: {
        color: "#a78bfa",
        borderWidth: 1,
        borderColor: "#a78bfa",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 6,
    },
    actions: {
        flexDirection: "row",
        marginTop: 20,
        gap: 10,
    },
    passBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#374151",
        padding: 14,
        alignItems: "center",
    },
    connectBtn: {
        flex: 2,
        backgroundColor: "#a78bfa",
        padding: 14,
        alignItems: "center",
    },
    passText: {
        color: "#f87171",
        fontWeight: "700",
        fontSize: 16,
    },
    connectText: {
        color: "#111827",
        fontWeight: "700",
        fontSize: 16,
    },
});
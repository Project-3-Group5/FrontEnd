import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getSkills } from "../../api";

const demoSkills = [
    { id: 1, name: "React", category: "Programming", description: "Build frontend apps." },
    { id: 2, name: "Java", category: "Programming", description: "Backend programming." },
    { id: 3, name: "Guitar", category: "Music", description: "Learn chords and songs." },
];

export default function SkillsScreen() {
    const [skills, setSkills] = useState(demoSkills);

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        try {
            const data = await getSkills();

            if (data && data.length > 0) {
                setSkills(data);
            }
        } catch (err) {
            console.log(err);
            setSkills(demoSkills);
        }
    };

    return (
        <View style={styles.page}>
            <Text style={styles.title}>Skills</Text>

            {skills.map((skill) => (
                <View key={skill.id} style={styles.card}>
                    <Text style={styles.name}>{skill.name}</Text>
                    <Text style={styles.category}>{skill.category}</Text>
                    <Text style={styles.description}>{skill.description}</Text>
                </View>
            ))}
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
        color: "#9ca3af",
        marginTop: 4,
    },
    description: {
        color: "#9ca3af",
        marginTop: 6,
    },
});
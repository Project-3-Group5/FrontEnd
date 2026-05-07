import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function HomeScreen() {
    const [users, setUsers] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentSkills, setCurrentSkills] = useState({ offered: [], desired: [] });

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                // 1. Fetch ALL users from your backend
                const uRes = await fetch(`${BASE_URL}/users`);
                const uData = await uRes.json();
                setUsers(uData);

                // 2. Load skills for the first user in the list
                if (uData.length > 0) {
                    await fetchUserSkills(uData[0].id);
                }
            } catch (e) {
                console.error("Initialization failed:", e);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    const fetchUserSkills = async (userId: number) => {
        try {
            const [offRes, desRes] = await Promise.all([
                fetch(`${BASE_URL}/user-skill/user/${userId}/offered`),
                fetch(`${BASE_URL}/user-skill/user/${userId}/desired`)
            ]);

            if (!offRes.ok || !desRes.ok) throw new Error("API Error");

            const offData = await offRes.json();
            const desData = await desRes.json();

            // Note: If you fix the backend later, this assumes offData is a list of objects with a name
            setCurrentSkills({
                offered: offData.map((s: any) => s.name || "Skill"),
                desired: desData.map((s: any) => s.name || "Skill")
            });
        } catch (e) {
            console.log(`Using fallback skills for user ${userId} due to API error.`);

            // FALLBACK: Provide mock skills if the connection table fails
            const mockLibrary: Record<number, {offered: string[], desired: string[]}> = {
                0: { offered: ["React", "CSS"], desired: ["Java", "SQL"] },
                1: { offered: ["Guitar", "Piano"], desired: ["Singing"] },
                2: { offered: ["Python", "Data Science"], desired: ["UI Design"] },
                3: { offered: ["Cooking", "Baking"], desired: ["French"] },
            };

            // Use modulo to cycle through mock library if more than 4 users exist
            setCurrentSkills(mockLibrary[userId % 4] || mockLibrary[0]);
        }
    };

    const handleNext = async () => {
        const nextIndex = index + 1;
        setIndex(nextIndex);

        // If there's a next user, fetch their specific skills
        if (nextIndex < users.length) {
            await fetchUserSkills(users[nextIndex].id);
        }
    };

    if (loading) return <ActivityIndicator size="large" style={{flex: 1}} color="#a78bfa" />;

    const currentUser = users[index];

    // Screen shown when the users array is exhausted
    if (!currentUser) {
        return (
            <View style={styles.page}>
                <Text style={styles.brand}>SkillSwap</Text>
                <View style={styles.emptyContainer}>
                    <Text style={styles.title}>No more users</Text>
                    <Text style={styles.bio}>You've seen everyone for now!</Text>
                    <TouchableOpacity
                        style={styles.connectBtn}
                        onPress={() => { setIndex(0); fetchUserSkills(users[0]?.id); }}
                    >
                        <Text style={styles.connectText}>Start Over</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.page}>
            <Text style={styles.brand}>SkillSwap</Text>

            <View style={styles.card}>
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{currentUser.username}</Text>
                    <Text style={styles.idLabel}>User ID: {currentUser.id}</Text>
                    <Text style={styles.bio}>{currentUser.bio || "This user prefers to keep their bio a mystery."}</Text>
                </View>

                <View style={styles.divider} />

                <Text style={styles.label}>Can Teach</Text>
                <View style={styles.tags}>
                    {currentSkills.offered.map((skill, i) => (
                        <Text key={i} style={styles.offerTag}>{skill}</Text>
                    ))}
                </View>

                <Text style={styles.label}>Wants to Learn</Text>
                <View style={styles.tags}>
                    {currentSkills.desired.map((skill, i) => (
                        <Text key={i} style={styles.wantTag}>{skill}</Text>
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

            <Text style={styles.counter}>User {index + 1} of {users.length}</Text>
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: "#f3f4f6",
        fontSize: 28,
        fontWeight: "700",
        textAlign: 'center'
    },
    card: {
        backgroundColor: "#1f2937",
        borderColor: "#374151",
        borderWidth: 1,
        borderRadius: 16,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    userInfo: {
        marginBottom: 10,
    },
    name: {
        color: "#f3f4f6",
        fontSize: 24,
        fontWeight: "700",
    },
    idLabel: {
        color: "#6b7280",
        fontSize: 12,
        marginBottom: 8,
    },
    bio: {
        color: "#9ca3af",
        fontSize: 16,
        lineHeight: 22,
    },
    divider: {
        height: 1,
        backgroundColor: "#374151",
        marginVertical: 15,
    },
    label: {
        color: "#9ca3af",
        fontSize: 14,
        fontWeight: "600",
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 10,
    },
    tags: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 15,
    },
    offerTag: {
        color: "#34d399",
        borderWidth: 1,
        borderColor: "#34d399",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        fontSize: 14,
    },
    wantTag: {
        color: "#a78bfa",
        borderWidth: 1,
        borderColor: "#a78bfa",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        fontSize: 14,
    },
    actions: {
        flexDirection: "row",
        marginTop: 20,
        gap: 12,
    },
    passBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#f87171",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    connectBtn: {
        flex: 2,
        backgroundColor: "#a78bfa",
        padding: 16,
        borderRadius: 8,
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
    counter: {
        color: "#4b5563",
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
    }
});
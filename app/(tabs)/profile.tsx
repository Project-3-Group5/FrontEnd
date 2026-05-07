import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function ProfileScreen() {
    const [userData, setUserData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newBio, setNewBio] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
            try {
                const response = await fetch(`${BASE_URL}/users/${userId}`);
                const data = await response.json();
                setUserData(data);
                setNewBio(data.bio || "");
            } catch (e) {
                console.error("Failed to load user:", e);
            }
        }
    };

    const handleUpdateBio = async () => {
        if (!userData?.id) return;

        setIsUpdating(true);
        try {
            const response = await fetch(`${BASE_URL}/users/${userData.id}/bio`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Passing the raw string as the body
                body: newBio,
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUserData(updatedUser);
                setIsEditing(false);
            } else {
                alert("Failed to update bio. Check backend CORS/Logs.");
            }
        } catch (e) {
            console.error("Update error:", e);
            alert("Network error updating bio.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <View style={styles.page}>
            <Text style={styles.title}>Profile</Text>

            <View style={styles.card}>
                <Text style={styles.name}>{userData?.username || "Loading..."}</Text>

                {isEditing ? (
                    <View style={styles.editContainer}>
                        <TextInput
                            style={styles.input}
                            value={newBio}
                            onChangeText={setNewBio}
                            placeholder="Write something about yourself..."
                            placeholderTextColor="#9ca3af"
                            multiline
                        />
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity
                                style={styles.cancelBtn}
                                onPress={() => setIsEditing(false)}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.saveBtn}
                                onPress={handleUpdateBio}
                                disabled={isUpdating}
                            >
                                {isUpdating ? (
                                    <ActivityIndicator color="#111827" size="small" />
                                ) : (
                                    <Text style={styles.saveText}>Save</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.bio}>
                            {userData?.bio || "No bio set yet."}
                        </Text>
                        <TouchableOpacity
                            style={styles.editTrigger}
                            onPress={() => setIsEditing(true)}
                        >
                            <Text style={styles.editTriggerText}>Edit Bio</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
        borderWidth: 1,
        borderColor: "#374151",
    },
    name: {
        color: "#f3f4f6",
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 12,
    },
    bio: {
        color: "#9ca3af",
        fontSize: 16,
        lineHeight: 24,
    },
    editContainer: {
        marginTop: 10,
    },
    input: {
        backgroundColor: "#111827",
        color: "#f3f4f6",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#a78bfa",
        minHeight: 80,
        textAlignVertical: 'top',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15,
        gap: 10,
    },
    cancelBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    cancelText: {
        color: "#9ca3af",
        fontWeight: "600",
    },
    saveBtn: {
        backgroundColor: "#a78bfa",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 6,
        minWidth: 80,
        alignItems: 'center',
    },
    saveText: {
        color: "#111827",
        fontWeight: "700",
    },
    editTrigger: {
        marginTop: 20,
        alignSelf: 'flex-start',
    },
    editTriggerText: {
        color: "#a78bfa",
        fontWeight: "600",
        fontSize: 14,
    }
});
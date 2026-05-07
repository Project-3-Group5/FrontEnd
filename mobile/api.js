const API_URL =
    process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:8080";

export async function getSkills() {
    const res = await fetch(`${API_URL}/skill`);
    if (!res.ok) throw new Error("Failed to fetch skills");
    return res.json();
}

export async function getUsers() {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
}
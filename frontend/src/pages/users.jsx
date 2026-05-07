import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api/userApi.js";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res = await getUsers();
            setUsers(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const filtered = users.filter(
        (u) =>
            u.username?.toLowerCase().includes(query.toLowerCase()) ||
            u.bio?.toLowerCase().includes(query.toLowerCase())
    );

    const initials = (username) =>
        username ? username.slice(0, 2).toUpperCase() : "??";

    return (
        <div className="users-page">
            <div className="search-bar">
                <svg
                    className="search-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                    placeholder="Search users..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="users-count">{filtered.length} members</div>

            {loading && <div className="loading-msg">Loading members...</div>}

            <div className="users-list">
                {filtered.map((user) => (
                    <div
                        key={user.id}
                        className="user-list-card"
                        onClick={() => navigate(`/users/${user.id}`)}
                    >
                        <div className="ulc-avatar">{initials(user.username)}</div>

                        <div className="ulc-body">
                            <div className="ulc-name">{user.username}</div>
                            <div className="ulc-meta">
                                {user.bio?.slice(0, 50) ?? "No bio yet"}
                            </div>
                        </div>

                        <div className="ulc-right">
              <span
                  className="tag tag--offer"
                  style={{ fontSize: "0.65rem" }}
              >
                {user.admin ? "Admin" : "User"}
              </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
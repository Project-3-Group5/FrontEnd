import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("isAdmin");
        navigate("/login");
    };

    return (
        <>
            <nav className="navbar">
                <Link to="/home" className="navbar-brand">
                    SkillSwap
                </Link>

                <div className="navbar-actions">
                    <button className="navbar-icon-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            <div className="bottom-nav">
                <Link
                    to="/home"
                    className={`bottom-nav-item ${path === "/home" ? "active" : ""}`}
                >
                    <span>Home</span>
                </Link>

                <Link
                    to="/skills"
                    className={`bottom-nav-item ${path === "/skills" ? "active" : ""}`}
                >
                    <span>Skills</span>
                </Link>

                <Link
                    to="/profile"
                    className={`bottom-nav-item ${path === "/profile" ? "active" : ""}`}
                >
                    <span>Profile</span>
                </Link>
            </div>
        </>
    );
}
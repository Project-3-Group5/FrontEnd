import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

export default function LoginPage() {
    const navigate = useNavigate();

    const [tab, setTab] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};

        if (!form.username) e.username = "Username is required";

        if (!form.password) e.password = "Password is required";
        else if (form.password.length < 8) e.password = "Min 8 characters";

        if (tab === "signup") {
            if (!form.firstName) e.firstName = "Required";
            if (!form.lastName) e.lastName = "Required";
        }

        return e;
    };

    const handleSubmit = () => {
        const e = validate();

        if (Object.keys(e).length > 0) {
            setErrors(e);
            return;
        }

        localStorage.setItem("userId", "1");
        localStorage.setItem("username", form.username);
        localStorage.setItem("isAdmin", "false");

        setErrors({});
        navigate("/home");
    };

    return (
        <div className="auth-page">
            <div className="form-container">
                <h1 className="title">SkillSwap</h1>

                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${tab === "login" ? "active" : ""}`}
                        onClick={() => {
                            setTab("login");
                            setErrors({});
                        }}
                    >
                        Sign In
                    </button>

                    <button
                        className={`auth-tab ${tab === "signup" ? "active" : ""}`}
                        onClick={() => {
                            setTab("signup");
                            setErrors({});
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="form">
                    {tab === "signup" && (
                        <>
                            <div className="input-group">
                                <label>First Name</label>
                                <input
                                    value={form.firstName}
                                    onChange={(e) =>
                                        setForm({ ...form, firstName: e.target.value })
                                    }
                                />
                            </div>

                            <div className="input-group">
                                <label>Last Name</label>
                                <input
                                    value={form.lastName}
                                    onChange={(e) =>
                                        setForm({ ...form, lastName: e.target.value })
                                    }
                                />
                            </div>
                        </>
                    )}

                    <div className="input-group">
                        <label>Username</label>
                        <input
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <button className="sign" onClick={handleSubmit}>
                        {tab === "login" ? "Sign In" : "Create Account"}
                    </button>
                </div>
            </div>
        </div>
    );
}
import { useState } from "react";
import "../styles/LoginPage.css";

//icons used
const IconMail = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const IconLock = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const IconUser = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
);

const IconEye = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const IconEyeOff = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
);

const IconGoogle = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

const IconGithub = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
);


// I created the LoginPage and Signup Page in one so the user can switch in the same tab
//might change later
export default function LoginPage() {
    const [mode, setMode] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [signupForm, setSignupForm] = useState({
        firstName: "", lastName: "", email: "",
        password: "", confirmPassword: "", agreed: false,
    });
    const [errors, setErrors] = useState({});

    const validateLogin = () => {
        const e = {};
        if (!loginForm.email) e.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(loginForm.email)) e.email = "Invalid email";
        if (!loginForm.password) e.password = "Password is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const validateSignup = () => {
        const e = {};
        if (!signupForm.firstName.trim()) e.firstName = "Required";
        if (!signupForm.lastName.trim()) e.lastName = "Required";
        if (!signupForm.email) e.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(signupForm.email)) e.email = "Invalid email";
        if (!signupForm.password) e.password = "Password is required";
        else if (signupForm.password.length < 8) e.password = "Min 8 characters";
        if (signupForm.password !== signupForm.confirmPassword) e.confirmPassword = "Passwords don't match";
        if (!signupForm.agreed) e.agreed = "You must agree to the terms";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (validateLogin()) {
            console.log("Login:", loginForm);
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (validateSignup()) {
            console.log("Signup:", signupForm);
        }
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setErrors({});
        setShowPassword(false);
        setShowConfirm(false);
    };

    return (
        <div className="auth-page">
            <div className="form-container">
                <p className="title">SkillSwap</p>

                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${mode === "login" ? "active" : ""}`}
                        onClick={() => switchMode("login")}
                    >
                        Log In
                    </button>
                    <button
                        className={`auth-tab ${mode === "signup" ? "active" : ""}`}
                        onClick={() => switchMode("signup")}
                    >
                        Sign Up
                    </button>
                </div>

                {mode === "login" && (
                    <form className="form" onSubmit={handleLogin} noValidate>
                        <div className="input-group">
                            <label htmlFor="login-email">Email</label>
                            <div className="input-wrapper">
                                <span className="input-icon"><IconMail /></span>
                                <input
                                    id="login-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={loginForm.email}
                                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                />
                            </div>
                            {errors.email && <span className="field-error">{errors.email}</span>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="login-password">Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon"><IconLock /></span>
                                <input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={loginForm.password}
                                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <IconEyeOff /> : <IconEye />}
                                </button>
                            </div>
                            {errors.password && <span className="field-error">{errors.password}</span>}
                        </div>

                        <div className="forgot">
                            <a href="#">Forgot password?</a>
                        </div>

                        <button type="submit" className="sign">Sign In</button>

                        <div className="social-message">
                            <div className="line" />
                            <span className="message">or continue with</span>
                            <div className="line" />
                        </div>

                        <div className="social-icons">
                            <button type="button" className="icon" title="Google"><IconGoogle /></button>
                            <button type="button" className="icon" title="GitHub"><IconGithub /></button>
                        </div>
                    </form>
                )}

                {mode === "signup" && (
                    <form className="form" onSubmit={handleSignup} noValidate>
                        <div className="form-row">
                            <div className="input-group">
                                <label htmlFor="first-name">First Name</label>
                                <div className="input-wrapper">
                                    <span className="input-icon"><IconUser /></span>
                                    <input
                                        id="first-name"
                                        type="text"
                                        placeholder="Jane"
                                        value={signupForm.firstName}
                                        onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })}
                                    />
                                </div>
                                {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                            </div>

                            <div className="input-group">
                                <label htmlFor="last-name">Last Name</label>
                                <div className="input-wrapper">
                                    <span className="input-icon"><IconUser /></span>
                                    <input
                                        id="last-name"
                                        type="text"
                                        placeholder="Doe"
                                        value={signupForm.lastName}
                                        onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })}
                                    />
                                </div>
                                {errors.lastName && <span className="field-error">{errors.lastName}</span>}
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="signup-email">Email</label>
                            <div className="input-wrapper">
                                <span className="input-icon"><IconMail /></span>
                                <input
                                    id="signup-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={signupForm.email}
                                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                                />
                            </div>
                            {errors.email && <span className="field-error">{errors.email}</span>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="signup-password">Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon"><IconLock /></span>
                                <input
                                    id="signup-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Min 8 characters"
                                    value={signupForm.password}
                                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <IconEyeOff /> : <IconEye />}
                                </button>
                            </div>
                            {errors.password && <span className="field-error">{errors.password}</span>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon"><IconLock /></span>
                                <input
                                    id="confirm-password"
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Repeat your password"
                                    value={signupForm.confirmPassword}
                                    onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                >
                                    {showConfirm ? <IconEyeOff /> : <IconEye />}
                                </button>
                            </div>
                            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                        </div>

                        <label className="form-checkbox">
                            <input
                                type="checkbox"
                                checked={signupForm.agreed}
                                onChange={(e) => setSignupForm({ ...signupForm, agreed: e.target.checked })}
                            />
                            <span>
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </span>
                        </label>
                        {errors.agreed && <span className="field-error">{errors.agreed}</span>}

                        <button type="submit" className="sign">Create Account</button>

                        <div className="social-message">
                            <div className="line" />
                            <span className="message">or sign up with</span>
                            <div className="line" />
                        </div>

                        <div className="social-icons">
                            <button type="button" className="icon" title="Google"><IconGoogle /></button>
                            <button type="button" className="icon" title="GitHub"><IconGithub /></button>
                        </div>
                    </form>
                )}

                <p className="signup">
                    {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => switchMode(mode === "login" ? "signup" : "login")}>
                        {mode === "login" ? "Sign Up" : "Log In"}
                    </button>
                </p>
            </div>
        </div>
    );
}


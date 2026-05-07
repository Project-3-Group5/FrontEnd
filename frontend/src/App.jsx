import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import HomePage from "./pages/HomePage.jsx";
import Skills from "./pages/Skills.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Profile from "./pages/Profile.jsx";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/home"
                    element={
                        <>
                            <Navbar />
                            <HomePage />
                        </>
                    }
                />

                <Route
                    path="/skills"
                    element={
                        <>
                            <Navbar />
                            <Skills />
                        </>
                    }
                />


                <Route
                    path="/profile"
                    element={
                        <>
                            <Navbar />
                            <Profile />
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
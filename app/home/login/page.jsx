"use client";
import { useState } from "react";
import Barre from "@/components/Barre";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const validate = () => {
        const tempErrors = {};
        if (!values.username) tempErrors.username = "Nom d'utilisateur requis";
        if (!values.email && !isLogin) tempErrors.email = "Email requis";
        if (!values.password) tempErrors.password = "Mot de passe requis";
        if (!isLogin && values.password !== values.confirmPassword)
            tempErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        return tempErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const tempErrors = validate();
        setErrors(tempErrors);

        if (Object.keys(tempErrors).length === 0) {
            // Ici tu peux appeler ton API pour connexion ou inscription
            setMessage(isLogin ? "Connexion réussie !" : "Inscription réussie !");
            setValues({ username: "", email: "", password: "", confirmPassword: "" });
        } else {
            setMessage("");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <div className="relative z-20">
                <Barre />
            </div>

            {/* Formulaire centré */}
            <div className="flex items-center justify-center  p-4">
                <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10"/>

                <div className="bg-white rounded-xl shadow-lg mt-6 w-full max-w-md p-8 animate-fadeIn relative z-10">
                    {/* Toggle Connexion / Inscription */}
                    <div className="flex justify-around mb-2 border-b-2 border-gray-200">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`py-2 font-semibold ${isLogin ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
                        >
                            Connexion
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`py-2 font-semibold ${!isLogin ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
                        >
                            Inscription
                        </button>
                    </div>

                    {/* Conteneur animé pour la hauteur */}
                    <div
                        className="overflow-hidden transition-all duration-500 ease-in-out"
                        style={{
                            height: isLogin ? "200px" : "320px" // ajuste selon la taille exacte du formulaire
                        }}
                    >
                        <div onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    placeholder="Nom d'utilisateur"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-600"
                                />
                                {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
                            </div>

                            {!isLogin && (
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-600"
                                    />
                                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                                </div>
                            )}

                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Mot de passe"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-600"
                                />
                                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                            </div>

                            {!isLogin && (
                                <div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirmer le mot de passe"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-600"
                                    />
                                    {errors.confirmPassword &&
                                        <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
                            >
                                {isLogin ? "Se connecter" : "S'inscrire"}
                            </button>

                            {message && <p className="text-green-600 font-semibold mt-2 text-center">{message}</p>}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Barre from "../../../components/Barre";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AuthForm() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [focus, setFocus] = useState({ username: false, age: false, adresse: false, email: false, password: false, confirmPassword: false });
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        adresse: "",
        numero: "",
        ville:""
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const inputs = [
        { id: 1, name: "username", type: "text", label: "Nom d'utilisateur" },
        { id: 2, name: "email", type: "email", label: "Email" },
        { id: 3, name: "password", type: "password", label: "Mot de passe" },
        { id: 4, name: "confirmPassword", type: "password", label: "Confirmer le mot de passe" },
        { id: 5, name: "age", type: "number", label: "Âge" },
        { id: 6, name: "adresse", type: "text", label: "Adresse" },
        { id: 7, name: "numero", type: "text", label: "Numéro de téléphone" },
        { id: 8, name: "ville", type: "text", label: "Ville de résidence" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "numero") {
            let cleaned = value.replace(/[^0-9]/g, "");
            if (cleaned.length > 2) cleaned = cleaned.slice(0, 2) + " " + cleaned.slice(2);
            if (cleaned.length > 6) cleaned = cleaned.slice(0, 6) + " " + cleaned.slice(6);
            if (cleaned.length > 9) cleaned = cleaned.slice(0, 9) + " " + cleaned.slice(9);
            if (cleaned.length > 12) cleaned = cleaned.slice(0, 12);
            setValues({ ...values, [name]: cleaned });
        } else {
            const allowed = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9@\.\-\_ ]*$/;
            if (allowed.test(value)) setValues({ ...values, [name]: value });
        }
    };

    const validateAndRegister = async () => {
        const tempErrors = {};
        if (!values.username.trim()) tempErrors.username = "Nom requis";
        if (!values.email.trim() && !isLogin) tempErrors.email = "Email requis";
        if (!values.password.trim()) tempErrors.password = "Mot de passe requis";
        if (!values.age.trim() && !isLogin) tempErrors.age = "Âge requis";
        if (!values.adresse.trim() && !isLogin) tempErrors.adresse = "Adresse requise";
        if (!values.numero.trim() && !isLogin) tempErrors.numero = "Numéro requis";
        if (!values.ville.trim() && !isLogin) tempErrors.ville = "Ville requis";
        if (!isLogin && values.password !== values.confirmPassword)
            tempErrors.confirmPassword = "Les mots de passe ne correspondent pas";

        setErrors(tempErrors);
        setIsSubmit(true);
        if (Object.keys(tempErrors).length > 0) return;

        try {
            const response = await axios.post(`${apiUrl}/NewUsers`, {
                username: values.username,
                email: values.email,
                password: values.password,
                age: values.age,
                adresse: values.adresse,
                numero: values.numero,
                ville: values.ville,
            });
            setIsRegistered(true);
            setMessage(`Bienvenue ${values.username} 🎉`);
            setValues({ username: "", email: "", password: "", confirmPassword: "", age: "", adresse: "", numero: "",ville:"" });
            setErrors({});
            setIsSubmit(false);
        } catch (error) {
            console.error("Erreur API:", error);
            setMessage("Erreur lors de l'inscription !");
        }
    };

    const handlelogin = async () => {
        const tempErrors = {};
        if (!values.username.trim()) tempErrors.username = "Nom requis";
        if (!values.password.trim()) tempErrors.password = "Mot de passe requis";
        setErrors(tempErrors);
        setIsSubmit(true);
        if (Object.keys(tempErrors).length > 0) return;

        try {
            const response = await axios.post(`${apiUrl}/LoginUser`, {
                nom: values.username,
                password: values.password,
            });

            if (response.data.message !== "Utilisateur non trouvé" && response.data.message !== "Mot de passe incorrect !") {
                let { userId, username } = response.data;
                localStorage.setItem("authUser", JSON.stringify({ userId, username }));
                setIsRegistered(true);
                setMessage(`Bienvenue ${username} 🎉`);
            } else {
                setValues({ username: "", password: "" });
                setIsRegistered(true);
                setMessage("Aucun utilisateur trouvé, veuillez réessayer");
            }
        } catch (error) {
            console.error("Erreur API:", error);
            setMessage("Erreur lors de la connexion !");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) handlelogin();
        else validateAndRegister();
    };

    return (
        <div className="relative min-h-screen bg-white flex flex-col">
            {/* Gradient arrière-plan */}
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10" />

            {/* Navbar */}
            <div className="relative z-20">
                <Barre />
            </div>

            {/* Conteneur formulaire centré */}
            <div className="flex flex-1 justify-center items-start -mt-8 -md:mt-24 p-4">
                <AnimatePresence>
                    {!isRegistered && (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 flex flex-col gap-4 z-20"
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Toggle connexion / inscription */}
                            <div className="flex justify-around mb-4 border-b-2 border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(true)}
                                    className={`py-2 font-semibold ${isLogin ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
                                >
                                    Connexion
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(false)}
                                    className={`py-2 font-semibold ${!isLogin ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
                                >
                                    Inscription
                                </button>
                            </div>

                            {/* Inputs */}
                            {inputs.map((inputField) => {
                                if (isLogin && inputField.name !== "username" && inputField.name !== "password") return null;
                                if (inputField.name === "numero") return null; // éviter doublon

                                const hasError = isSubmit && errors[inputField.name];

                                // AGE + NUMERO
                                if (inputField.name === "age") {
                                    return (
                                        <div key="age-numero" className="flex flex-col sm:flex-row gap-4 w-full">
                                            <div className="relative w-full sm:w-1/3 h-20">
                                                <input
                                                    type="number"
                                                    name="age"
                                                    value={values.age}
                                                    onChange={handleChange}
                                                    onFocus={() => setFocus({ ...focus, age: true })}
                                                    onBlur={() => setFocus({ ...focus, age: false })}
                                                    className={`text-xl w-full text-gray-700 bg-white/75 border rounded-xl py-2 px-4 h-14 ${hasError ? "border-red-600" : "border-gray-300 focus:border-blue-500"} focus:outline-none transition`}
                                                />
                                                <span className={`absolute left-3 top-7 text-sm text-blue-900 transition-all duration-300 ${focus.age || values.age ? "-translate-y-12" : "top-[24px] text-sky-900"}`}>Âge</span>
                                            </div>
                                            <div className="relative w-full sm:w-2/3 h-20">
                                                <input
                                                    type="text"
                                                    name="numero"
                                                    value={values.numero}
                                                    onChange={handleChange}
                                                    onFocus={() => setFocus({ ...focus, numero: true })}
                                                    onBlur={() => setFocus({ ...focus, numero: false })}
                                                    className={`text-xl w-full text-gray-700 bg-white/75 border rounded-xl py-2 px-4 h-14 ${hasError ? "border-red-600" : "border-gray-300 focus:border-blue-500"} focus:outline-none transition`}
                                                />
                                                <span className={`absolute left-3 top-7 text-sm text-blue-900 transition-all duration-300 ${focus.numero || values.numero ? "-translate-y-12" : "top-[24px] text-sky-900"}`}>Numéro</span>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={inputField.id} className="relative w-full h-16">
                                        <input
                                            type={inputField.type}
                                            name={inputField.name}
                                            value={values[inputField.name]}
                                            onChange={handleChange}
                                            onFocus={() => setFocus({ ...focus, [inputField.name]: true })}
                                            onBlur={() => setFocus({ ...focus, [inputField.name]: false })}
                                            className={`text-xl w-full text-gray-700 bg-white/75 border rounded-xl py-2 px-4 h-14 focus:outline-none transition ${hasError ? "border-red-600" : "border-gray-300 focus:border-blue-500"}`}
                                        />
                                        <span className={`absolute left-3 top-7 text-sm text-blue-900 transition-all duration-300 ${focus[inputField.name] || values[inputField.name] ? "-translate-y-12" : "top-[14px] text-sky-900"}`}>
                      {inputField.label}
                    </span>
                                    </div>
                                );
                            })}

                            <div className="flex flex-col sm:flex-row gap-2">
                                <button
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
                                >
                                    {isLogin ? "Se connecter" : "S'inscrire"}
                                </button>
                                <button
                                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition transform hover:scale-105"
                                    onClick={() => router.back()}
                                    type="button"
                                >
                                    Retour
                                </button>
                            </div>
                        </motion.form>
                    )}

                    {isRegistered && (
                        <motion.div
                            key="welcome"
                            className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 text-center text-2xl font-semibold text-blue-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {message}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

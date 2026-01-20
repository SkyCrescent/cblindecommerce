"use client";

import React, { useState } from "react";
import {router} from "next/client";
import {useRouter} from "next/navigation";

export default function AdminLogin() {
    const [focus, setFocus] = useState({ nom: false, prenom: false });
    const [isSubmit, setIsSubmit] = useState(false);
    const [values, setValues] = useState({ nom: "", prenom: "" });
    const [errors, setErrors] = useState({ nom: false, prenom: false });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Lettres avec accents et chiffres uniquement
        const regex = /^[\p{L}\p{N}\s'-]*$/u;
        if (regex.test(value)) {
            setValues({ ...values, [name]: value });
            setErrors({ ...errors, [name]: false });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);

        const tempErrors = {
            nom: !values.nom.trim(),
            prenom: !values.prenom.trim(),
        };
        setErrors(tempErrors);

        if (tempErrors.nom || tempErrors.prenom) return;

        // Vérifie les identifiants
        if (values.nom === "Orion" && values.prenom === "78945") {
            router.push("/admin/home");
        } else {
            setValues({ nom: "", prenom: "" });
            setErrors({ nom: true, prenom: true });
            setIsSubmit(true);
        }
    };

    const input = [
        {
            id: 1,
            name: "nom",
            label: "Nom",
            type: "text",
            value: values.nom,
            error: "Veuillez entrer votre nom",
        },
        {
            id: 2,
            name: "prenom",
            label: "Mot de passe",
            type: "text",
            value: values.prenom,
            error: "Veuillez entrer votre prénom",
        },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10"/>

            <div className="relative z-20 w-[45%] bg-white shadow-2xl rounded-md p-8 space-y-8">

                {/* TITRE */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Connexion Admin</h1>
                    <p className="text-gray-500 text-sm mt-2">
                        Accédez à l’espace d’administration pour gérer les produits et commandes.
                    </p>
                </div>

                {/* FORMULAIRE */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="relative w-full space-y-6">
                        {input.map((inputs) => {
                            const hasError = isSubmit && errors[inputs.name];
                            return (
                                <div key={inputs.id} className="relative w-[80%] mx-auto h-20 flex flex-col justify-center">
                                    <input
                                        type={inputs.type}
                                        name={inputs.name}
                                        value={inputs.value}
                                        onChange={handleChange}
                                        onFocus={() => setFocus({ ...focus, [inputs.name]: true })}
                                        onBlur={() => setFocus({ ...focus, [inputs.name]: false })}
                                        className={`text-xl w-full text-gray-700 bg-white/75 border rounded-xl py-2 px-10 h-14 focus:outline-none transition
                                            ${hasError ? "border-red-600 focus:border-red-600" : "border-gray-300 focus:border-blue-500"}`}
                                    />
                                    <span
                                        className={`absolute left-3 p-1 w-auto top-7 text-[15px] font-sans text-blue-900 transition-all duration-300
                                        ${focus[inputs.name] || inputs.value ? "-translate-y-12" : "top-[15px] text-sky-900"}`}>
                                        {inputs.label}
                                    </span>
                                    {hasError && (
                                        <div className="text-[70%] text-red-600 mt-1">{inputs.error}</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* BOUTON */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition transform hover:scale-105"
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../../../components/NavBar";
import Image from "next/image";
import axios from "axios";

export default function NouvelUtilisateur() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const [selectedFile, setSelectedFile] = useState(null);
    const [focus, setFocus] = useState(false);

    const [values, setValues] = useState({
        nom: "",
        password: "",
        type: "",
        photo: "",
    });

    const [errors, setErrors] = useState({});
    const [dialog, setDialog] = useState({
        open: false,
        message: "",
        type: "", // success | error
    });

    /* ================= INPUTS ================= */
    const inputFields = [
        { id: 1, name: "nom", type: "text", label: "Nom de l'utilisateur", value: values.nom },
        // { edit: 2, name: "password", type: "password", label: "Mot de passe", value: values.password },
        //

    ];

    /* ================= HANDLE CHANGE ================= */
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "nom") {
            let cleaned = value.replace(/[^\w\s]/gi, "");
            cleaned = cleaned.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
            setValues({ ...values, nom: cleaned });
        } else {
            setValues({ ...values, [name]: value });
        }
    };

    /* ================= PHOTO ================= */
    const handlePhoto = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowed = ["jpg", "jpeg", "png"];
        const ext = file.name.split(".").pop().toLowerCase();
        if (!allowed.includes(ext)) return;

        setSelectedFile(file);

        try {
            const formData = new FormData();
            formData.append("file", file);

            await axios.post("/pages/parteners", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setValues((prev) => ({
                ...prev,
                photo: `media/parteners/${file.name}`,
            }));
        } catch (err) {
            console.error(err);
        }
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = async () => {
        let newErrors = {};

        if (!values.nom.trim()) newErrors.nom = "Nom requis";
        if (!values.photo) newErrors.photo = "Photo requise";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setDialog({
                open: true,
                type: "error",
                message: "Veuillez remplir correctement tous les champs.",
            });
            return;
        }


        try {
            await axios.post(`${apiUrl}/createNewPartenaires`, values);

            setDialog({
                open: true,
                type: "success",
                message: "Utilisateur créé avec succès 🎉",
            });

            setValues({
                nom: "",
                password: "",
                type: "",
                photo: "",
            });
            setSelectedFile(null);
        } catch (error) {
            console.error(error);
            setDialog({
                open: true,
                type: "error",
                message: "Erreur lors de la création de l'utilisateur",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 relative">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-0" />

            {/* NAVBAR */}
            <div className="relative z-30 w-[80%] mx-auto">
                <NavBar />
            </div>

            {/* FORM */}
            <div className="relative z-30 w-full px-4 sm:px-6 md:px-0 md:w-[70%] lg:w-[50%] mx-auto mt-4 bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold text-blue-700 mb-8 text-center">
                    Création d’un nouveau partenaire
                </h1>

                <div className="space-y-8">

                    {/* PHOTO */}
                    <div className="flex justify-center">
                        <div
                            className="
                    w-40 h-40
                    sm:w-48 sm:h-48
                    md:w-56 md:h-56
                    rounded-full overflow-hidden
                    shadow-xl shadow-gray-400/60
                    ring-4 ring-white
                    hover:scale-105 transition-all duration-300
                "
                        >
                            <label className="w-full h-full cursor-pointer">
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    className="sr-only"
                                    onChange={handlePhoto}
                                />
                                {selectedFile ? (
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <Image src="/picture.png" alt="photo" width={36} height={36} />
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    {/* INPUT */}
                    <div className="w-full max-w-md mx-auto">
                        {inputFields.map((input) => (
                            <div key={input.id} className="relative">
                                <input
                                    type={input.type}
                                    name={input.name}
                                    value={input.value}
                                    onChange={handleChange}
                                    onFocus={() => setFocus(true)}
                                    onBlur={() => setFocus(false)}
                                    className={`w-full py-3 px-4 border rounded-lg bg-white/75
                            ${errors[input.name]
                                        ? "border-red-500"
                                        : "border-gray-300 focus:border-blue-500"}
                        `}
                                />
                                <span
                                    className={
                                        focus || input.value
                                            ? "absolute left-3 -top-3 text-xs text-blue-900 font-bold bg-white px-1"
                                            : "absolute left-3 top-3 text-sm text-gray-500"
                                    }
                                >
                        {input.label}
                    </span>
                            </div>
                        ))}
                    </div>

                    {/* BUTTONS */}
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Créer le partenaire
                        </button>
                        <button
                            onClick={() => router.back()}
                            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </div>

            {/* DIALOG */}
            {dialog.open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl text-center w-80">
                        <h2 className={`font-bold mb-2 ${dialog.type === "error" ? "text-red-600" : "text-green-600"}`}>
                            {dialog.type === "error" ? "Erreur" : "Succès"}
                        </h2>
                        <p className="mb-4">{dialog.message}</p>
                        <button
                            onClick={() => setDialog({ ...dialog, open: false })}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

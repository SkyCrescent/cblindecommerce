"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../../../components/NavBar";
import Image from "next/image";
import axios from "axios";

export default function NouveauProduit() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);
    const [values, setValues] = useState({ nom: "", details: "", photo: "" });
    const [errors, setErrors] = useState({});
    const [focus, setFocus] = useState(false);
    const [dialog, setDialog] = useState({ open: false, message: "", type: "" });

    const inputFields = [
        { id: 1, name: "nom", type: "text", label: "Nom de la catalogue", value: values.nom },
        { id: 2, name: "details", type: "text", label: "Description", value: values.details },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "nom" || name === "details") {
            let cleaned = value.replace(/[^\w\s]/gi, "");
            cleaned = cleaned.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
            setValues({ ...values, [name]: cleaned });
        }
    };

    const handlePhoto = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const allowed = ["jpg", "jpeg", "png", "gif"];
            const ext = file.name.split(".").pop().toLowerCase();
            if (allowed.includes(ext)) {
                setSelectedFile(file);
                setValues({ ...values, photo: `media/foods/${file.name}` });
            } else {
                console.log("Fichier non autorisé");
            }
        } else {
            setSelectedFile(null);
            setValues({ ...values, photo: "" });
        }
    };

    const handleSubmit = async () => {
        let newErrors = {};
        if (!values.nom.trim()) newErrors.nom = "Nom invalide";
        if (!values.details.trim()) newErrors.details = "Détail requis";
        if (!values.photo.trim()) newErrors.photo = "Photo requise";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setDialog({ open: true, message: "Veuillez remplir correctement tous les champs.", type: "error" });
            return;
        }

        setErrors({});
        try {
            await axios.post(`${apiUrl}/NewCatalogue`, values);
            setDialog({ open: true, message: "Catalogue ajouté avec succès 🎉", type: "success" });
            setValues({ nom: "", details: "", photo: "" });
            setSelectedFile(null);
        } catch (error) {
            console.error(error);
            setDialog({ open: true, message: "Erreur lors de l'ajout du produit !", type: "error" });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 relative p-4 md:p-6">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-0"/>

            {/* Navbar */}
            <div className="relative z-30 w-full md:w-[80%] mx-auto mb-6">
                <NavBar/>
            </div>

            {/* Formulaire */}
            <div className="relative z-30 w-full max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 text-center">Ajout de nouveau catalogue</h1>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Photo */}
                    <div className="w-full md:w-60 h-60 mx-auto md:mx-0 rounded-full overflow-hidden shadow-xl ring-4 ring-white hover:scale-105 transition-all duration-300">
                        <label htmlFor="imageInput2" className="w-full h-full cursor-pointer">
                            <input
                                type="file"
                                id="imageInput2"
                                accept=".jpg,.jpeg,.png"
                                className="sr-only"
                                onChange={handlePhoto}
                            />
                            {selectedFile ? (
                                <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Image sélectionnée"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-gray-300 rounded-full flex items-center justify-center">
                                    <Image src="/picture.png" alt="Placeholder" width={40} height={40}/>
                                </div>
                            )}
                        </label>
                    </div>

                    {/* Inputs */}
                    <div className="flex-1 flex flex-col gap-4">
                        {inputFields.map((input) => (
                            <div key={input.id} className="relative w-full h-16">
                                <input
                                    type={input.type}
                                    name={input.name}
                                    value={input.value}
                                    onChange={handleChange}
                                    onFocus={() => setFocus(true)}
                                    onBlur={() => setFocus(false)}
                                    className={`text-gray-700 bg-white/75 border rounded-lg py-3 px-4 w-full focus:outline-none
                                        ${errors[input.name] ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
                                    `}
                                />
                                <span className={focus || input.value
                                    ? "absolute left-3 top-0 text-xs text-blue-900 font-bold -translate-y-5 duration-300"
                                    : "absolute left-3 top-3 text-sky-900 text-sm duration-300 pointer-events-none"
                                }>
                                    {input.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Boutons */}
                <div className="mt-6 flex flex-col md:flex-row gap-4">
                    <button
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 hover:scale-105 transition"
                        onClick={handleSubmit}
                    >
                        Ajouter le catalogue
                    </button>
                    <button
                        className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 hover:scale-105 transition"
                        onClick={() => router.back()}
                    >
                        Annuler
                    </button>
                </div>
            </div>

            {/* Dialog */}
            {dialog.open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
                        <h2 className={`text-lg font-semibold mb-3 ${dialog.type === "error" ? "text-red-600" : "text-green-600"}`}>
                            {dialog.type === "error" ? "Des informations sont manquantes" : "Succès"}
                        </h2>
                        <p className="text-gray-700 mb-4">{dialog.message}</p>
                        <button
                            onClick={() => setDialog({ ...dialog, open: false })}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition w-32 mx-auto"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import NavBar from "../../../../components/NavBar";

export default function NouveauService() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [dialog, setDialog] = useState({ open: false, message: "", type: "" });

    const [values, setValues] = useState({
        nom: "",
        details: "",
        photo: "",
        prix: "",
    });

    /* ================= INPUTS ================= */
    const inputFields = [
        { id: 1, name: "nom", type: "text", label: "Nom du service" },
        { id: 2, name: "details", type: "text", label: "Description du service" },
        { id: 3, name: "prix", type: "number", label: "Prix du service (FCFA)" },
    ];

    /* ================= CHANGE ================= */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    /* ================= PHOTO ================= */
    const handlePhoto = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowed = ["jpg", "jpeg", "png"];
        const ext = file.name.split(".").pop().toLowerCase();
        if (!allowed.includes(ext)) {
            alert("Format d'image non valide");
            return;
        }

        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));

        try {
            const formData = new FormData();
            formData.append("file", file);

            await axios.post("/pages/api2", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setValues((prev) => ({
                ...prev,
                photo: `media/services/${file.name}`,
            }));
        } catch (err) {
            console.error(err);
        }
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = async () => {
        let newErrors = {};

        if (!values.nom.trim()) newErrors.nom = "Nom requis";
        if (!values.details.trim()) newErrors.details = "Description requise";
        if (!values.photo) newErrors.photo = "Image requise";
        if (!values.prix || values.prix <= 0) newErrors.prix = "Prix invalide";

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            setDialog({
                open: true,
                message: "Veuillez remplir correctement tous les champs",
                type: "error",
            });
            return;
        }

        try {
            await axios.post(`${apiUrl}/createNewService`, {
                nom: values.nom,
                details: values.details,
                photo: values.photo,
                prix : values.prix
            });

            setDialog({
                open: true,
                message: "Service ajouté avec succès 🎉",
                type: "success",
            });

            setValues({ nom: "", details: "", photo: "", prix: "" });
            setSelectedFile(null);
            setPreview(null);
        } catch (error) {
            setDialog({
                open: true,
                message: "Erreur lors de l’ajout du service",
                type: "error",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 relative">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent" />

            <div className="relative z-20 w-[90%] mx-auto">
                <NavBar />
            </div>

            <div className="relative z-20 w-full md:w-[60%] mx-auto mt-6 bg-white p-8 rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold text-blue-700 text-center mb-8">
                    Ajout d’un nouveau service
                </h1>

                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* IMAGE */}
                        <div className="w-52 h-52 rounded-full overflow-hidden shadow-xl ring-4 ring-white">
                            <label className="cursor-pointer w-full h-full flex items-center justify-center">
                                <input type="file" className="hidden" onChange={handlePhoto} />
                                {preview ? (
                                    <img src={preview} className="w-full h-full object-cover" />
                                ) : (
                                    <Image src="/picture.png" width={40} height={40} alt="placeholder" />
                                )}
                            </label>
                        </div>

                        {/* INPUTS */}
                        <div className="flex-1 space-y-4">
                            {inputFields.map((input) => (
                                <div key={input.id} className="relative">
                                    <input
                                        type={input.type}
                                        name={input.name}
                                        value={values[input.name]}
                                        onChange={handleChange}
                                        className={`w-full border rounded-lg px-4 py-3 focus:outline-none
                                            ${errors[input.name]
                                            ? "border-red-500"
                                            : "border-gray-300 focus:border-blue-600"
                                        }`}
                                    />
                                    <span className="absolute left-4 -top-2 bg-white px-2 text-sm text-blue-700">
                                        {input.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BOUTONS */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleSubmit}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Ajouter le service
                        </button>
                        <button
                            onClick={() => router.back()}
                            className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {dialog.open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[340px] text-center">
                        <h2 className={`text-lg font-bold mb-3 ${dialog.type === "error" ? "text-red-600" : "text-green-600"}`}>
                            {dialog.type === "error" ? "Erreur" : "Succès"}
                        </h2>
                        <p className="mb-4">{dialog.message}</p>
                        <button
                            onClick={() =>
                            {
                                setDialog({ ...dialog, open: false })
                                router.back();
                            }}
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

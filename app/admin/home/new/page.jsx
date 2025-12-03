"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../../../components/NavBar";

export default function NouveauProduit() {
    const router = useRouter();

    const [values, setValues] = useState({
        nom: "",
        prix: "",
        quantite: "",
        catalogue: "",
        photo: null,
    });
    const [focus, setFocus] = useState(false);
    const [preview, setPreview] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    const inputFields = [
        { id: 1, name: "nom", type: "text", label: "Nom du produit", value: values.nom },
        { id: 2, name: "prix", type: "text", label: "Prix (USD)", value: values.prix },
        { id: 3, name: "quantite", type: "text", label: "Quantité", value: values.quantite },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        setValues({ ...values, photo: file });
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        console.log("Nouveau produit :", values);
        alert("Produit ajouté !");
        router.push("/admin/catalogue");
    };

    return (
        <div className="min-h-screen  bg-gray-100 relative">
            {/* Dégradé derrière le formulaire */}
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-0"/>

            {/* Navbar */}
            <div className="relative z-30 w-[80%] mx-auto">
                <NavBar/>
            </div>

            {/* Formulaire centré */}
            <div className="relative z-30 w-[50%]  mx-auto mt-2 bg-white p-8 rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold text-blue-700 mb-8 text-center">
                    Ajouter un nouveau produit
                </h1>

                <div onSubmit={handleSubmit} className="space-y-6">
                    {/* Ligne avec photo à gauche et inputs à droite */}
                    <div
                        className="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-6 space-y-6 md:space-y-0">
                        {/* Photo */}
                        <label
                            className="w-52 h-52 rounded-full border-2 border-gray-300 overflow-hidden cursor-pointer flex justify-center items-center flex-shrink-0">
                            {preview ? (
                                <img src={preview} alt="preview" className="w-full h-full object-cover"/>
                            ) : (
                                <span className="text-gray-400 text-sm text-center">Photo</span>
                            )}
                            <input type="file" accept="image/*" className="hidden" onChange={handlePhoto}/>
                        </label>

                        {/* Inputs */}
                        <div className=" space-y-4 relative w-[60%]">
                            {inputFields.map((input) => (
                                <div key={input.id} className="relative w-full h-16">
                                    <input
                                        type={input.type}
                                        name={input.name}
                                        value={input.value}
                                        onChange={handleChange}
                                        onFocus={() => setFocus(true)}
                                        onBlur={() => setFocus(false)}
                                        className="text-gray-700 bg-white/75 border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:border-blue-500"
                                    />
                                    <span
                                        className={
                                            focus || input.value
                                                ? "absolute left-3 top-0 text-xs text-blue-900 font-bold -translate-y-5 duration-300"
                                                : "absolute left-3 top-3 text-sky-900 text-sm duration-300 pointer-events-none"
                                        }
                                    >
                {input.label}
              </span>
                                </div>
                            ))}

                            {/* Catalogue */}
                            <div className="relative w-full h-16">
                                <select
                                    name="catalogue"
                                    value={values.catalogue}
                                    onChange={handleChange}
                                    className="text-gray-700 bg-white/75 border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Choisissez un catalogue</option>
                                    <option value="informatique">Informatique</option>
                                    <option value="automobile">Automobile</option>
                                    <option value="mode">Mode & Chaussures</option>
                                    <option value="sport">Sport</option>
                                    <option value="enfant">Jouets & Enfants</option>
                                    <option value="maison">Maison</option>
                                </select>
            {/*                    <span*/}
            {/*                        className={*/}
            {/*                            focus || values.catalogue*/}
            {/*                                ? "absolute left-3 top-0 text-xs text-blue-900 font-bold -translate-y-5 duration-300"*/}
            {/*                                : "absolute left-3 top-3 text-sky-900 text-sm duration-300 pointer-events-none"*/}
            {/*                        }*/}
            {/*                    >*/}
            {/*  Catalogue*/}
            {/*</span>*/}
                            </div>
                        </div>
                    </div>

                    {/* Bouton */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 hover:scale-105 transition"
                    >
                        Ajouter le produit
                    </button>
                </div>


            </div>
        </div>

    );
}

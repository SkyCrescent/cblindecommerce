
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import NavBar from "../../../components/NavBar";

export default function AdminCatalogue() {
    const router = useRouter();

    const [items, setItems] = useState([
        { id: 1, nom: "Ordinateurs de bureaux", photo: "media/img/burautique.jpg", prix: 250, stock: 15 },
        { id: 2, nom: "Articles automobiles", photo: "media/img/auto.png", prix: 80, stock: 32 },
        { id: 3, nom: "Chaussures hommes", photo: "media/img/chaussure-cuir-homme-bout-fleuri.jpg", prix: 45, stock: 21 },
        { id: 4, nom: "Ordinateurs de bureaux", photo: "media/img/burautique.jpg", prix: 250, stock: 15 },
        { id: 5, nom: "Articles automobiles", photo: "media/img/auto.png", prix: 80, stock: 32 },
        { id: 6, nom: "Chaussures hommes", photo: "media/img/chaussure-cuir-homme-bout-fleuri.jpg", prix: 45, stock: 21 },


    ]);

    const supprimerProduit = (id) => {
        setItems((prev) => prev.filter((p) => p.id !== id));
    };

    const modifierProduit = (id) => {
        router.push(`/admin/home/${id}`);
    };

    const ajouterProduit = () => {
        router.push("/admin/List/new");
    };

    return (
        <div className="relative min-h-screen bg-white p-6">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10"/>

            <div className="relative z-30">
                <NavBar/>
            </div>


            <div className="relative z-20 flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-blue-700">Gestion de catalogues</h1>

                <button
                    onClick={ajouterProduit}
                    className="bg-green-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transition"
                >
                     Nouveau Catalogue
                </button>
            </div>

            <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="relative group bg-white rounded-xl  overflow-hidden hover:shadow-xl transition cursor-pointer"
                    >
                        {/* IMAGE */}
                        <div className="w-full h-48 overflow-hidden">
                            <img
                                src={`/${item.photo}`}
                                className="w-full h-full object-cover group-hover:scale-105 duration-300"
                            />
                        </div>

                        {/* CONTENU DE BASE */}
                        <div className="p-4">
                            <h2 className="font-semibold text-gray-800 text-lg">{item.nom}</h2>
                            <p className="text-sm text-gray-500">Prix : {item.prix} USD</p>
                            <p className="text-sm text-gray-500">Stock : {item.stock}</p>
                        </div>

                        {/* OVERLAY AU HOVER */}
                        <div
                            className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center gap-3
                   opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    modifierProduit(item.id);
                                }}
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 hover:scale-110 transition"
                            >
                                Modifier
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    supprimerProduit(item.id);
                                }}
                                className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 hover:scale-110 transition"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

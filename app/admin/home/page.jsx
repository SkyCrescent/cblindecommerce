"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../../components/NavBar";
import axios from "axios";

export default function AdminCatalogue() {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [produits, setProduits] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setSelectedItems] = useState("");
    const [focus, setFocus] = useState(false);
    const [dialog, setDialog] = useState(false);

    const input = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Nom",
            label: "Entrez votre le nom du produit",
            className: `text-xl w-full md:w-[90%] text-gray-700 bg-white/75 border rounded-lg border-gray-300 py-2 px-4 md:px-10 h-14 focus:outline-none focus:border-blue-500`,
        },
    ];

    const getData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/AllProduits`);
            if (response.data.data && response.data.data.length > 0) {
                setProduits(response.data.data);
            } else {
                setProduits([]);
            }
        } catch (error) {
            console.error("Erreur récupération API:", error);
            setProduits([]);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const supprimerProduit = async (id) => {
        try {
            await axios.post(`${apiUrl}/DeleteProduits`, { id });
            await getData();
        } catch (error) {
            console.error("Erreur suppression produit :", error);
        }
        setDialog(false);
    };

    const modifierProduit = (id) => {
        router.push(`/admin/home/updatefoods?id=${encodeURIComponent(btoa(id))}`);
    };

    const ajouterProduit = () => {
        router.push("/admin/home/new");
    };

    return (
        <div className="relative min-h-screen bg-white p-4 md:p-6">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10" />

            {/* NavBar */}
            <div className="relative z-30">
                <NavBar />
            </div>

            {/* Header + Search */}
            <div className="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold text-blue-700">Gestion des produits</h1>

                {/* Input + Search */}
                <div className="relative w-full md:w-[50%] mt-2 md:mt-0">
                    {input.map((inputs) => (
                        <div key={inputs.id} className="rounded-md w-full flex flex-col items-center justify-center">
                            <div className="w-full relative">
                                <input
                                    onFocus={() => setFocus(true)}
                                    onBlur={() => setFocus(false)}
                                    type={inputs.type}
                                    name={inputs.name}
                                    className={inputs.className}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    value={searchTerm}
                                />
                                <span
                                    className={
                                        focus || searchTerm
                                            ? "absolute left-2 top-2 text-xs font-bold text-blue-900 duration-300"
                                            : "absolute left-2 top-[16px] text-sky-900 text-xs duration-300 pointer-events-none"
                                    }
                                >
                                    {inputs.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Button Ajouter */}
                <button
                    onClick={ajouterProduit}
                    className="bg-green-600 text-white px-4 md:px-5 py-3 rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transition mt-2 md:mt-0"
                >
                    + Nouveau Produit
                </button>
            </div>

            {/* Liste des produits */}
            <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                {produits
                    .filter((p) => p.nom.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((item) => (
                        <div
                            key={item.id}
                            className="relative group bg-white rounded-xl overflow-hidden hover:shadow-xl transition cursor-pointer"
                        >
                            {/* Image */}
                            <div className="w-full h-48 overflow-hidden">
                                <img
                                    src={`/${item.photo}`}
                                    className="w-full h-full object-cover group-hover:scale-105 duration-300"
                                />
                            </div>

                            {/* Infos produit */}
                            <div className="p-4">
                                <h2 className="font-semibold text-gray-800 text-lg">{item.nom}</h2>
                                <p className="text-sm text-gray-500">Prix : {item.prix} FCFA</p>
                                <p className="text-sm text-gray-500">Stock : {item.quantite} éléments</p>
                            </div>

                            {/* Actions */}
                            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 p-4">
                                <button
                                    onClick={() => modifierProduit(item.id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition w-full"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedItems(item.id);
                                        setDialog(true);
                                    }}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 hover:scale-105 transition w-full"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Dialog suppression */}
            {dialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
                        <h2 className="text-lg font-semibold mb-3 text-red-600">Confirmation</h2>
                        <p className="text-gray-700 mb-4">Voulez-vous supprimer ce produit ?</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={() => supprimerProduit(selectedItems)}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition w-full sm:w-auto"
                            >
                                OK
                            </button>
                            <button
                                onClick={() => setDialog(false)}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 hover:scale-105 transition w-full sm:w-auto"
                            >
                                Non
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

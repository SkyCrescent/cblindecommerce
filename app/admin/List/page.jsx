"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../../components/NavBar";
import axios from "axios";

export default function AdminCatalogue() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [catalogue, setcatalogue] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setselectedItems] = useState(null);
    const [dialog, setDialog] = useState(false);
    const [focus , SetFocus] = useState(false);

    const [values, setValues] = useState({ username: "" });

    const input = [
        { id: 1, name: "username", type: "text", placeholder: "Nom", value: values.username, label: "Entrez le nom du catalogue", className: `text-xl w-full md:w-[90%] text-gray-700 bg-white/75 border rounded-lg border-gray-300 py-2 px-4 md:px-10 h-14 focus:outline-none focus:border-blue-500` }
    ];

    const getData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/AllCatalogue`);
            if (response.data.data) setcatalogue(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const supprimerProduit = async (id) => {
        try {
            await axios.post(`${apiUrl}/DeleteCatalogue`, { id });
            await getData();
        } catch (error) {
            console.error(error);
        }
        setDialog(false);
    };

    const modifierProduit = (id) => router.push(`/admin/List/updatecatalogue/?id=${encodeURIComponent(btoa(id))}`);
    const ajouterProduit = () => router.push("/admin/List/new");

    useEffect(() => { getData(); }, []);

    return (
        <div className="relative min-h-screen bg-white p-4 md:p-6">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10"/>

            <div className="relative z-20">
                <NavBar/>
            </div>

            {/* HEADER */}
            <div className="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0">
                <h1 className="text-3xl font-bold text-blue-700">Gestion de catalogues</h1>

                {/* Input + bouton */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full md:w-[60%]">
                    {input.map((inputs) => (
                        <div key={inputs.id} className="relative w-full">
                            <input
                                type={inputs.type}
                                name={inputs.name}
                                className={inputs.className}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => SetFocus(true)}
                                onBlur={() => SetFocus(false)}
                            />
                            <span className={(focus || searchTerm) ? "absolute left-3 top-1 text-xs text-blue-900 font-bold -translate-y-5 duration-300" : "absolute left-3 top-3 text-sky-900 text-sm duration-300 pointer-events-none"}>
                                {inputs.label}
                            </span>
                        </div>
                    ))}
                    <button
                        onClick={ajouterProduit}
                        className="bg-green-600 text-white px-5 py-3 w-auto rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transition"
                    >
                        Nouveau Catalogue
                    </button>
                </div>
            </div>

            {/* GRID CATALOGUES */}
            <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                {catalogue.filter((p) => p.nom.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                    <div key={item.id} className="relative group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                        <div className="w-full h-48 relative overflow-hidden rounded-t-xl">
                            <img
                                src={`/${item.Photo}`}
                                alt={item.nom}
                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        <div className="p-4">
                            <h2 className="font-semibold text-gray-800 text-lg truncate">{item.nom}</h2>
                            <p className="text-sm text-gray-500 truncate">Description : {item.details}</p>
                        </div>

                        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button
                                onClick={() => modifierProduit(item.id)}
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => { setselectedItems(item.id); setDialog(true); }}
                                className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 hover:scale-105 transition"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* DIALOG */}
            {dialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
                        <h2 className="text-lg font-semibold mb-3 text-red-600">En attente de validation</h2>
                        <p className="text-gray-700 mb-4">Voulez-vous supprimer ce catalogue ? Tous les produits associés seront effacés.</p>
                        <div className="flex justify-between gap-4">
                            <button
                                onClick={() => supprimerProduit(selectedItems)}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition w-1/2"
                            >
                                OK
                            </button>
                            <button
                                onClick={() => setDialog(false)}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 hover:scale-105 transition w-1/2"
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

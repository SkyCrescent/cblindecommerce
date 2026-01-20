"use client";

import {useParams, usePathname, useRouter, useSearchParams} from "next/navigation";
import React, { useEffect, useState } from "react";
import Barre from "@/components/Barre";
import f from "../../../../public/media/icons/search_filled_127px.png";
import Pied2 from "@/components/Pied 2";
import axios from "axios";
import { motion } from "framer-motion";

export default function CatalogueDetail() {
    const router = useRouter();
    //const searchParams = useSearchParams();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.get("id");
    //fonction pour rechercher data dans l'url
    let id = null;

    if (query) {
        id = atob(decodeURIComponent(query));
        //decryptage des data present dans l"URL
    }
    const dat = JSON.parse(id)
    console.log(dat);

    useEffect(() => {
    }, [id]);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [isSubmit, SetIsSubmit] = useState(false);

    const [infosItems, setInfosItems] = useState([]);      // source brute
    const [filteredItems, setFilteredItems] = useState([]); // données filtrées

    const [infosCatalogue, setCatalogue] = useState(null);
    const [loading, setLoading] = useState(true);
  //  const router = useRouter();
    const [values, setValues] = useState({ username: "" });
    const [focus, SetFocus] = useState(false);

    const colors = [
        "bg-red-500/60",
        "bg-blue-500/60",
        "bg-purple-500/60",
        "bg-green-500/60",
        "bg-pink-500/60",
        "bg-orange-500/60",
        "bg-teal-500/60"
    ];

    const input = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Nom",
            value: values.username,
            label: "Entrez le nom du produit",
            className: `text-xl w-full md:w-[90%] text-gray-700 bg-white/75 border rounded-lg border-gray-300 py-2 px-10 h-14 focus:outline-none focus:border-blue-500`,
            img: f.src,
        }
    ];

    // --- API ---
    const getInfos = async (id) => {
        try {
            setLoading(true);
            const response = await axios.post(`${apiUrl}/GetInfosCatalogue`, { id });
            const catalogueResp = response.data.catalogue?.[0] || null;
            const produitsResp = response.data.infosCatalogue || [];

            setCatalogue(catalogueResp);
            setInfosItems(produitsResp);
            setFilteredItems(produitsResp);
        } catch (error) {
            console.error("Erreur récupération infos :", error);
            setCatalogue(null);
            setInfosItems([]);
            setFilteredItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) getInfos(id);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const regex = /^[\p{L}\p{N}\s'-]*$/u;
        if (!regex.test(value)) return;

        const newValues = { ...values, [name]: value };
        setValues(newValues);

        const term = value.trim().toLowerCase();
        if (term === "") setFilteredItems(infosItems);
        else
            setFilteredItems(
                infosItems.filter(item =>
                    (item.nom || item.name || "").toString().toLowerCase().includes(term)
                )
            );
    };

    useEffect(() => {
        const term = values.username.trim().toLowerCase();
        if (term === "") setFilteredItems(infosItems);
        else
            setFilteredItems(
                infosItems.filter(item =>
                    (item.nom || item.name || "").toString().toLowerCase().includes(term)
                )
            );
    }, [values.username, infosItems]);

    if (!infosCatalogue && !loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-gray-500 text-xl">
                Catalogue introuvable ❌
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-white flex flex-col items-center">
            {/* Gradient */}
            <div className="absolute h-full inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10" />

            {/* Barre */}
            <div className="relative z-30 w-full"><Barre /></div>

            {/* HEADER / COVER */}
            <div className="max-w-6xl w-full mx-auto mt-20 flex flex-col md:flex-row items-center gap-10 px-4">
                {/* Texte */}
                <div className="w-full md:w-1/2 font-[Segoe UI] leading-snug relative z-30">
                    <h6 className="text-blue-600 text-lg font-semibold tracking-wide mb-3">CATALOGUE :</h6>
                    <h1 className="text-4xl font-extrabold leading-tight text-gray-900">
                        {infosCatalogue?.nom || "—"}
                    </h1>
                    <p className="text-gray-700 text-lg mt-3">{infosCatalogue?.details || ""}</p>
                    <div className="text-sm py-6 font-bold text-blue-700 animate-pulse">
                        Explorez les produits disponibles ↓
                    </div>

                    {/* INPUT */}
                    <div className="relative w-full md:w-[110%] mt-1 -ml-2">
                        {input.map((inputs) => (
                            <div key={inputs.id} className="rounded-md h-20 w-full flex flex-col items-center justify-center">
                                <div className="absolute w-full">
                                    <input
                                        onFocus={() => SetFocus(true)}
                                        onBlur={() => SetFocus(false)}
                                        type={inputs.type}
                                        name={inputs.name}
                                        className={inputs.className}
                                        onChange={handleChange}
                                        value={inputs.value}
                                        autoComplete="off"
                                    />
                                    {inputs.img && (
                                        <img
                                            src={inputs.img}
                                            alt=""
                                            className="absolute right-5 top-[26%] cursor-pointer transition duration-300 transform hover:scale-125"
                                            width={30} height={30}
                                        />
                                    )}
                                    <span
                                        className={
                                            (focus || values.username)
                                                ? "absolute left-3 p-1 w-auto top-7 text-xs font-bold text-blue-900 -translate-y-12 duration-300"
                                                : "absolute tracking-wide pointer-events-none duration-300 left-0 top-[17px] px-10 text-sky-900"
                                        }
                                    >
                                        {inputs.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* IMAGE COVER */}
                <div className="w-full md:w-1/2 relative">
                    <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={infosCatalogue?.Photo ? `/${infosCatalogue.Photo}` : "/media/img/default-cover.jpg"}
                            alt={infosCatalogue?.nom || "cover"}
                            className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
                        />
                    </div>
                </div>
            </div>

            {/* Liste des produits */}
            <div className="relative w-full max-w-6xl py-6 px-4 z-30 mt-10">
                {loading ? (
                    <div className="w-full flex justify-center py-10 relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="absolute w-32 h-32 rounded-full border-t-4 border-gray-200"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="absolute w-24 h-24 rounded-full border-b-4 border-yellow-500"
                        />
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">Aucun produit disponible pour ce catalogue.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredItems.map((item) => {
                            const overlayColor = colors[Math.floor(Math.random() * colors.length)];
                            return (
                                <div
                                    key={item.id}
                                    className="group bg-transparent rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                >
                                    <div className="h-52 w-full overflow-hidden relative">
                                        <img
                                            src={item.photo ? `/${item.photo}` : item.img}
                                            alt={item.nom || item.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                        />
                                        <div
                                            className={`absolute inset-0 flex flex-col justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ${overlayColor}`}
                                        >
                                            <p className="text-white text-lg font-bold">{item.prix ?? item.price} FCFA</p>
                                            <p className="text-white text-sm">
                                                {(item.quantite ?? item.stock) > 0
                                                    ? `${item.quantite ?? item.stock} en stock`
                                                    : "Rupture de stock"}
                                            </p>
                                            <button
                                                onClick={() => router.push(`../infos?id=${encodeURIComponent(btoa(item.id))}`)}
                                                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 hover:scale-105 transition"
                                            >
                                                Commander
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white">
                                        <h3 className="text-sm md:text-base text-gray-800 font-medium">
                                            {item.nom ?? item.name}
                                        </h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Pied */}
            <div className="relative h-auto mt-10 w-full z-30"><Pied2 /></div>
        </div>
    );
}

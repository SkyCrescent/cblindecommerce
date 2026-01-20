"use client";

import { useRouter } from "next/navigation";
import Barre from "@/components/Barre";
import Pied2 from "@/components/Pied 2";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CataloguesPage() {
    const router = useRouter();
    const [catalogue, setCatalogue] = useState([]);
    const [filteredCatalogue, setFilteredCatalogue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [focus, setFocus] = useState(false);
    const [values, setValues] = useState({ username: "" });

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const input = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Nom",
            value: values.username,
            label: "Entrez le nom du catalogue",
            className: `text-base sm:text-xl w-full sm:w-[90%] text-gray-700 bg-white/75 border rounded-lg border-gray-300 py-2 px-4 sm:px-10 h-12 sm:h-14 focus:outline-none focus:border-blue-500`,
            img: `../media/icons/search_filled_127px.png`,
        },
    ];

    const getData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/AllCatalogue`);
            if (response.data.data && response.data.data.length > 0) {
                setCatalogue(response.data.data);
                setFilteredCatalogue(response.data.data);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des catalogues :", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let cleaned = value.replace(/[^\w\s]/gi, "");
        cleaned = cleaned.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
        setValues({ ...values, [name]: cleaned });
    };

    useEffect(() => {
        if (values.username === "") {
            setFilteredCatalogue(catalogue);
        } else {
            const filtered = catalogue.filter((c) =>
                c.nom.toLowerCase().includes(values.username.toLowerCase())
            );
            setFilteredCatalogue(filtered);
        }
    }, [values.username, catalogue]);

    return (
        <div className="relative min-h-screen bg-white">
            <div className="absolute inset-0 h-full bg-gradient-to-l from-blue-900/30 to-transparent z-10" />

            {/* Navbar */}
            <div className="relative z-30">
                <Barre />
            </div>

            {/* HEADER + INPUT */}
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center py-4 px-4 sm:px-6 md:py-6 md:px-10 z-30">
                {/* LEFT TEXT BLOCK */}
                <div className="w-full md:w-2/5 leading-snug mb-6 md:mb-0">
                    <h6 className="text-blue-600 text-lg font-semibold tracking-wide mb-3 sm:mb-5">
                        BIENVENU SUR
                    </h6>
                    <h1 className="text-3xl sm:text-4xl md:text-4xl font-extrabold leading-tight text-gray-900">
                        La principale plateforme<br />
                        e-commerce de
                    </h1>
                    <h1 className="text-4xl sm:text-5xl md:text-5xl font-black text-blue-600 mt-2 tracking-wide">
                        C-BLIND
                    </h1>
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-sm sm:text-base py-4 sm:py-6 font-bold"
                    >
                        + plusieurs catégories disponibles.
                    </motion.div>
                </div>

                {/* RIGHT INPUT BLOCK */}
                <div className="w-full md:w-2/5 relative mt-2 md:mt-0">
                    {input.map((inputs) => (
                        <div
                            key={inputs.id}
                            className="rounded-md h-12 sm:h-14 w-full flex flex-col justify-center mx-auto mb-4"
                        >
                            <div className="relative w-full">
                                <input
                                    type={inputs.type}
                                    name={inputs.name}
                                    className={inputs.className}
                                    value={inputs.value}
                                    onChange={handleChange}
                                    onFocus={() => setFocus(true)}
                                    onBlur={() => setFocus(false)}
                                />
                                {inputs.img && (
                                    <img
                                        src={inputs.img}
                                        alt=""
                                        className="absolute right-3 sm:right-6 top-[25%] cursor-pointer transition-transform duration-300 transform hover:scale-125"
                                        width={24}
                                        height={24}
                                    />
                                )}
                                <span
                                    className={
                                        focus || values.username
                                            ? "absolute left-2 sm:left-3 top-3 text-xs font-bold text-blue-900 -translate-y-10 transition-all duration-300"
                                            : "absolute left-2 sm:left-3 top-[14px] text-xs text-sky-900 pointer-events-none transition-all duration-300"
                                    }
                                >
                                    {inputs.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* GRID CATALOGUES */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 z-30 mb-6 px-4 sm:px-6 min-h-[320px]">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360, borderColor: ["#000000", "#007BFF", "#000000"] }}
                            transition={{
                                rotate: { repeat: Infinity, duration: 2.8, ease: "linear" },
                                borderColor: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                            }}
                            className="absolute w-16 sm:w-20 h-16 sm:h-20 rounded-full border-t-4 border-gray-200"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="absolute w-12 sm:w-14 h-12 sm:h-14 rounded-full border-b-4 border-yellow-500"
                        />
                    </div>
                ) : (
                    filteredCatalogue.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => router.push(`/home/list/edit?id=${encodeURIComponent(btoa(item.id))}`)}
                            className="group bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeIn"
                        >
                            <div className="h-full w-full overflow-hidden relative">
                                <img
                                    src={`/${item.Photo}`}
                                    alt={item.nom}
                                    className="w-full h-72 sm:h-80 md:h-78 object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 p-2">
                                    <h2 className="text-white text-lg sm:text-xl font-semibold text-center">{item.nom}</h2>
                                    <p className="text-white text-xs sm:text-sm text-center">{item.details}</p>
                                    <p className="text-sky-300 text-xs sm:text-sm text-center">
                                        Cliquez pour voir le catalogue
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* FOOTER */}
            <div className="relative h-auto z-30">
                <Pied2 />
            </div>
        </div>
    );
}

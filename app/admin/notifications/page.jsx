"use client";

import NavBar from "../../../components/NavBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [allNotif, setAllNotif] = useState([]);
    const [selectedNotifId, setSelectedNotifId] = useState(null); // ID de la notif sélectionnée

    const getData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/getAllNotif`);
            if (response.data.data && response.data.data.length > 0) {
                setAllNotif(response.data.data);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des notifications :", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const toggleNotif = (id) => {
        setSelectedNotifId(selectedNotifId === id ? null : id);
    };

    return (
        <div className="relative min-h-screen bg-white p-6">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10" />
            <div className="relative z-20">
                <NavBar />
            </div>

            <div className="relative z-20 mb-6">
                <h1 className="text-3xl font-bold text-blue-700 mb-4">Notifications</h1>

                {allNotif.length === 0 ? (
                    <p className="text-gray-500">Aucune notification reçue</p>
                ) : (
                    <ul className="space-y-2">
                        {allNotif.map((notif) => (
                            <React.Fragment key={notif.id}>
                                <li
                                    className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 rounded-lg p-3 cursor-pointer transition"
                                    onClick={() => toggleNotif(notif.id)}
                                >
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800">
                                            {notif.userName}
                                        </span>
                                        <span className="text-sm text-gray-500">{notif.dat}</span>
                                    </div>
                                    <span className="text-gray-400">
                                        {selectedNotifId === notif.id ? "▲" : "▼"}
                                    </span>
                                </li>

                                {/* Contenu sous la ligne sélectionnée */}
                                <AnimatePresence>
                                    {selectedNotifId === notif.id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden bg-white border border-gray-300 rounded-lg p-4 ml-4 mr-4"
                                        >
                                            <p className="text-gray-700">{notif.contenu}</p>
                                            <p className="text-sm text-gray-400 mt-2">
                                                Heure : {notif.heur}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </React.Fragment>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

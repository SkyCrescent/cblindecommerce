"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import NavBar from "../../../components/NavBar";

export default function UsersPage() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [users, setUsers] = useState([]);
    const [expandedUserId, setExpandedUserId] = useState(null); // utilisateur ouvert
    const [infosCommande, setInfosCommande] = useState([]); // commandes de l'utilisateur sélectionné
    const [popupOrder, setPopupOrder] = useState(false);
    const [selectedProduits, setSelectedProduits] = useState([]); // produits de la commande sélectionnée

    // fetch utilisateurs
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/AllUsers`);
            if (response.data?.data?.length) {
                setUsers(response.data.data);
            } else {
                console.log("Aucun utilisateur trouvé", response.data);
            }
        } catch (error) {
            console.error("Erreur fetch utilisateurs :", error);
        }
    };

    // fetch commandes d'un utilisateur
    const getInfos = async (userId) => {
        try {
            const response = await axios.post(`${apiUrl}/GetAllCommande`, { id: userId });
            setInfosCommande(response.data?.data || []);
        } catch (error) {
            console.error("Erreur récupération commandes :", error);
            setInfosCommande([]);
        }
    };

    // fetch produits d'une commande
    const getProduits = async (orderId) => {
        try {
            const response = await axios.post(`${apiUrl}/GetAllProduits`, { id: orderId });
            setSelectedProduits(response.data?.data || []);
            setPopupOrder(true);
        } catch (error) {
            console.error("Erreur récupération produits :", error);
            setSelectedProduits([]);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="relative min-h-screen bg-white p-6">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10"/>

            <div className="relative z-30">
                <NavBar/>
            </div>

            <h1 className="text-2xl font-bold mb-6">👥 Utilisateurs et Commandes</h1>

            <div className="relative z-20    overflow-hidden rounded-xl">
                <table className="w-full table-auto border-collapse">
                    <thead className="bg-blue-900 text-white text-sm uppercase tracking-wide">
                    <tr>
                        <th className="p-4 text-left">Utilisateur</th>
                        <th className="p-4 text-left">Nombre de commandes</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map((user) => (
                        <React.Fragment key={user.id}>
                            <tr
                                className="cursor-pointer hover:bg-blue-950/40 transition"
                                onClick={async () => {
                                    if (expandedUserId === user.id) {
                                        setExpandedUserId(null);
                                        setInfosCommande([]);
                                    } else {
                                        setExpandedUserId(user.id);
                                        await getInfos(user.id);
                                    }
                                }}
                            >
                                <td className="p-4 font-medium">{user.nom}</td>
                                <td className="p-4">{user.commande || 0}</td>
                            </tr>

                            {/* Liste commandes */}
                            <AnimatePresence>
                                {expandedUserId === user.id && infosCommande?.length > 0 && (
                                    <motion.tr
                                        initial={{opacity: 0, y: -6}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: -6}}
                                        transition={{duration: 0.2}}
                                    >
                                        <td colSpan={2} className=" p-4">
                                            <div className="space-y-2">
                                                {infosCommande.map((order) => (
                                                    <div
                                                        key={order.id}
                                                        className="bg-blue-400 p-3 rounded-lg flex justify-between items-center cursor-pointer hover:bg-[#27303B] transition"
                                                        onClick={() => getProduits(order.id)}
                                                    >
                                                        <div>
                                                            <p className="font-semibold">Commande #{order.id}</p>
                                                            <p className="text-sm text-gray-400">
                                                                Total: {order.total} FCFA • {order.Dat}
                                                            </p>
                                                        </div>
                                                        <span
                                                            className={`px-2 py-1 rounded text-sm font-semibold ${
                                                                order.status === "En attente"
                                                                    ? "bg-yellow-400 text-black"
                                                                    : order.status === "Valide"
                                                                        ? "bg-green-400 text-black"
                                                                        : "bg-red-500 text-white"
                                                            }`}
                                                        >
                                {order.status === "En attente"
                                    ? "En attente"
                                    : order.status === "Valide"
                                        ? "Validée"
                                        : "Annulée"}
                              </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </motion.tr>
                                )}
                            </AnimatePresence>
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* POPUP PRODUITS */}
            <AnimatePresence>
                {popupOrder && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-xl w-[90%] max-w-2xl overflow-y-auto max-h-[80%]"
                            initial={{scale: 0.9}}
                            animate={{scale: 1}}
                            exit={{scale: 0.9}}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-black">Produits de la commande / service</h2>
                                <button
                                    className="text-red-500 text-2xl font-bold"
                                    onClick={() => setPopupOrder(false)}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="space-y-3">
                                {selectedProduits?.map((p) => (
                                    <div
                                        key={p.id}
                                        className="flex items-center gap-4 bg-white rounded-lg border border-blue-400 p-3 shadow-md"
                                    >
                                        <img
                                            src={`/${p.photo}`}
                                            alt={p.nom}
                                            className="w-14 h-14 rounded object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium truncate">{p.nom || p.name}</p>
                                            <p className="text-sm text-gray-600">Quantité : {p.quantite || p.qty}</p>
                                        </div>
                                        <p className="w-28 text-right text-sm">{p.prix_base || p.price} FCFA</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

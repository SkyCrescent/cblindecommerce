"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
    LineChart, Line,
    BarChart, Bar,
    PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip,
    ResponsiveContainer, Legend
} from "recharts";
import NavBar from "../../../components/NavBar";
import axios from "axios";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

// Helper pour extraire juste le mois "MM" depuis "YYYY-MM-DD HH:MM:SS"
const getMonthFromDate = (dateStr) => dateStr?.slice(5, 7);

export default function DashboardStats() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // ===== Filters =====
    const [ville, setVille] = useState("ALL");
    const [mois, setMois] = useState("ALL");
    const [produitFilter, setProduitFilter] = useState("ALL");

    // ===== Data =====
    const [users, setUsers] = useState([]);
    const [commandes, setCommandes] = useState([]);
    const [itemsCommande, setItemsCommande] = useState([]);

    // ===== API =====
    useEffect(() => {
        Promise.all([
            axios.get(`${apiUrl}/AllUsers`),
            axios.get(`${apiUrl}/getAllCommandeForStat`),
            axios.get(`${apiUrl}/getAllCommandeItems`)
        ]).then(([usersRes, commandesRes, itemsRes]) => {
            setUsers(usersRes.data.data || []);
            setCommandes(commandesRes.data.data || []);
            setItemsCommande(itemsRes.data.data || []);
        }).catch(err => console.error(err));
    }, []);

    // ===== Users filtrés =====
    const filteredUsers = useMemo(() => {
        if (ville === "ALL") return users;
        return users.filter(u => u.ville === ville);
    }, [users, ville]);

    // ===== Top clients =====
    const topClients = useMemo(() => (
        filteredUsers.map(u => ({
            name: u.nom,
            commandes: u.commande || 0
        }))
    ), [filteredUsers]);

    // ===== Commandes par période =====
    const commandesParMois = useMemo(() => {
        const map = {};

        commandes.forEach(cmd => {
            if (cmd.status !== "Valide" || !cmd.Dat) return;

            const moisCmd = getMonthFromDate(cmd.Dat); // "01", "02", ...
            if (mois !== "ALL" && moisCmd !== mois) return;

            map[moisCmd] = (map[moisCmd] || 0) + 1;
        });

        return Object.entries(map)
            .map(([mois, commandes]) => ({ mois, commandes }))
            .sort((a, b) => a.mois.localeCompare(b.mois));
    }, [commandes, mois]);

    // ===== Produits vendus =====
    const produitsVendus = useMemo(() => {
        const map = {};

        itemsCommande.forEach(item => {
            if (!item.nom || !item.quantite) return;

            const moisItem = getMonthFromDate(item.Dat);
            if (mois !== "ALL" && moisItem !== mois) return;
            if (produitFilter !== "ALL" && item.nom !== produitFilter) return;

            map[item.nom] = (map[item.nom] || 0) + Number(item.quantite);
        });

        return Object.entries(map)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [itemsCommande, mois, produitFilter]);

    // ===== CA par produit =====
    const caParProduit = useMemo(() => {
        const map = {};

        itemsCommande.forEach(item => {
            if (!item.nom || !item.quantite) return;

            const moisItem = getMonthFromDate(item.Dat);
            if (mois !== "ALL" && moisItem !== mois) return;
            if (produitFilter !== "ALL" && item.nom !== produitFilter) return;

            if (!map[item.nom]) map[item.nom] = { nom: item.nom, CA: 0 };
            map[item.nom].CA += item.quantite * item.prix_base;
        });

        return Object.values(map);
    }, [itemsCommande, mois, produitFilter]);

    const totalCA = useMemo(() => caParProduit.reduce((s, p) => s + p.CA, 0), [caParProduit]);

    // ===== RENDER =====
    return (
        <div className="relative min-h-screen bg-white">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent" />
            <div className="relative p-4 md:p-6">
                <NavBar />
                <h1 className="text-2xl font-bold mb-4">📊 Dashboard e-commerce</h1>

                {/* ===== Filtres ===== */}
                <div className="flex flex-wrap gap-2 bg-white p-3 rounded shadow mb-6">
                    <select className="border px-3 py-1" onChange={e => setVille(e.target.value)}>
                        <option value="ALL">Toutes les villes</option>
                        <option>Brazzaville</option>
                        <option>Pointe-Noire</option>
                    </select>

                    <select className="border px-3 py-1" onChange={e => setMois(e.target.value)}>
                        <option value="ALL">Tous les mois</option>
                        {Array.from({ length: 12 }, (_, i) =>
                            <option key={i} value={String(i + 1).padStart(2, "0")}>
                                {new Date(0, i).toLocaleString("fr", { month: "long" })}
                            </option>
                        )}
                    </select>

                    <select className="border px-3 py-1" onChange={e => setProduitFilter(e.target.value)}>
                        <option value="ALL">Tous les produits</option>
                        {[...new Set(itemsCommande.map(i => i.nom))].map(p =>
                            <option key={p}>{p}</option>
                        )}
                    </select>
                </div>

                {/* ===== Graphiques ===== */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <ChartCard title="🏆 Top clients">
                        <BarChart data={topClients}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="commandes" fill="#2563eb" />
                        </BarChart>
                    </ChartCard>

                    <ChartCard title="📈 Commandes par période">
                        <LineChart data={commandesParMois}>
                            <XAxis dataKey="mois" />
                            <YAxis />
                            <Tooltip />
                            <Line dataKey="commandes" stroke="#16a34a" strokeWidth={3} />
                        </LineChart>
                    </ChartCard>

                    <ChartCard title="🥧 Produits ou services les + vendus">
                        {produitsVendus.length === 0 ? (
                            <p className="text-gray-500">Aucun produit vendu</p>
                        ) : (
                            <PieChart>
                                <Pie
                                    data={produitsVendus}
                                    dataKey="value"
                                    nameKey="name"
                                    label={entry => `${entry.name}: ${entry.value}`}
                                >
                                    {produitsVendus.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        )}
                    </ChartCard>

                    <ChartCard title="💰 CA par produit">
                        <>
                            <p className="font-bold text-green-600 mb-2 w-54">
                                Total CA : {totalCA.toLocaleString()} FCFA
                            </p>
                            <LineChart data={caParProduit}>
                                <XAxis dataKey="nom" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line dataKey="CA" stroke="#2563eb" strokeWidth={3} />
                            </LineChart>
                        </>
                    </ChartCard>

                </div>
            </div>
        </div>
    );
}

// ===== Chart Card =====
function ChartCard({ title, children }) {
    return (
        <div className="bg-white p-4 rounded shadow h-[350px]">
            <h2 className="font-semibold mb-3">{title}</h2>
            <ResponsiveContainer width="100%" height="85%">
                {children}
            </ResponsiveContainer>
        </div>
    );
}

"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import axios from "axios";

export default function Page() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ;
    const [users, setUsers] = useState([]);

    const fetchUsers2 = async () => {
        try {
            const res = await fetch(`${apiUrl}/AllUsers`);
            const data = await res.json();
            setUsers(data);
            console.log(users)
        } catch (error) {
            console.error("Erreur :", error);
        }
    };


    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/AllUsers`);
         //   console.log(response.data.data )
            if (response.data.data  && response.data.data.length > 0) {
                // Vérifiez que la réponse contient les données attendues
           //     console.log("la jointure",response.data)
                setUsers(response.data.data)

            } else {
                console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response.data);
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
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

            <h1 className="text-2xl font-bold mb-6 text-blue-900">
                Liste des utilisateurs
            </h1>

            {/* Wrapper responsive */}
            <div className="relative z-30 overflow-x-auto rounded-xl shadow-lg mx-20 ">
                <table className="relative w-full text-sm">
                    <thead className="bg-blue-900 text-white">
                    <tr>
                        <th className="px-4 py-3 text-left">Nom</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Ville</th>
                        <th className="px-4 py-3 text-left">Numéro</th>
                        <th className="px-4 py-3 text-center">Commandes</th>
                        <th className="px-4 py-3 text-left">Mot de passe</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map((item, index) => (
                        <tr
                            key={item.id}
                            className={`transition ${
                                index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-blue-50`}
                        >
                            <td className="px-4 py-3 font-medium">{item.nom}</td>
                            <td className="px-4 py-3">{item.mail}</td>
                            <td className="px-4 py-3">{item.ville}</td>
                            <td className="px-4 py-3">{item.numero}</td>
                            <td className="px-4 py-3 text-center font-semibold text-blue-900">
                                {item.commande}
                            </td>
                            <td className="px-4 py-3 text-gray-500">
                                {item.mdp}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>


    );
}

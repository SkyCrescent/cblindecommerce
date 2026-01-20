"use client";
import {useParams, usePathname, useRouter, useSearchParams} from "next/navigation";
import {FiShoppingCart, FiPlus, FiMinus, FiX} from "react-icons/fi";
import React, { useEffect, useState } from "react";
import Barre from "@/components/Barre";
import axios from "axios";
import { motion } from "framer-motion";

export default function ProductDetails() {
  //  const router = useRouter();
   // const { edit } = useParams();
    const router = useRouter();
//    const searchParams = useSearchParams();
    //const id = searchParams.get("id"); // ✅ ID récupéré correctement



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
    const [loaded, setLoaded] = useState(false);
    const [iduser, setIdUser] = useState(0);
    const [infosItems, setInfosItems] = useState([]);
    const [qty, setQty] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [showMMPopup, setShowMMPopup] = useState(false);
    const [selectedMM, setSelectedMM] = useState(""); // MTN ou Airtel
    const [mmNumber, setMmNumber] = useState(""); // Numéro Mobile Money
    const [catalogue, setcatalogue] = useState([]);

    // Récupération infos produit
    const getInfos = async (id) => {
        try {
            const response = await axios.post(`${apiUrl}/GetInfos`, { id });
            setInfosItems(response.data.data[0]);
            setLoaded(true);
        } catch (error) {
            console.error("Erreur récupération infos :", error);
        }
    };

    const getData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/getAllPartenaires`);
            console.log(response.data.data )
            if (response.data.data  && response.data.data.length > 0) {
                // Vérifiez que la réponse contient les données attendues
                console.log("la jointure",response.data)
                setcatalogue(response.data.data)

            } else {
                console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response.data);
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
        }
    };




    useEffect(() => {
        getInfos(id);
    }, [id]);

    // Récupération ID utilisateur
    useEffect(() => {
        const localId = JSON.parse(localStorage.getItem("authUser"));
        if (localId != null) setIdUser(localId.userId);
        else setIdUser(0);
    }, []);

    // Ouvre le popup Mobile Money
    const handleShowMMPopup = () => {
        setSelectedMM(""); // Reset opérateur
        setMmNumber("");
        setShowMMPopup(true);
        getData();
    };

    // Valide le paiement Mobile Money
    const handleConfirmMM = async () => {
        if (!selectedMM || !mmNumber) {
            alert("Veuillez choisir un opérateur et entrer votre numéro mobile.");
            return;
        }

        try {
            // Ici, tu peux appeler ton API de paiement Mobile Money
            await axios.post(`${apiUrl}/MobileMoneyPay`, {
                product_id: id,
                userId: iduser,
                quantite: qty,
                nom: infosItems.nom,
                prix_base: infosItems.prix,
                photo: infosItems.photo,
                operator: selectedMM,
                phone: mmNumber
            });

            setShowMMPopup(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            getInfos(id);
        } catch (error) {
            console.error("Erreur paiement Mobile Money :", error);
            alert("Erreur lors du paiement, veuillez réessayer.");
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center relative">
            {/* Gradient arrière-plan */}
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10" />

            {/* Barre */}
            <div className="w-full z-20">
                <Barre />
            </div>

            {/* Conteneur carte produit */}
            <div className="flex flex-col items-center w-full -mt-0 -md:mt-8 px-4">
                <motion.div
                    className={`bg-transparent z-20 shadow-2xl w-full max-w-4xl p-6 rounded-xl flex flex-col md:flex-row gap-8 transition-all duration-700
                        ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                >
                    {/* IMAGE */}
                    <div className="relative w-full h-96 md:w-1/2 rounded-xl overflow-hidden">
                        <img
                            src={`/${infosItems.photo}`}
                            alt={infosItems.nom}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* INFOS */}
                    <div className="flex flex-col justify-between w-full md:w-1/2">
                        <h1 className="text-2xl font-semibold text-gray-800">{infosItems.nom}</h1>
                        <p className="text-gray-600 mt-3">{infosItems.desc}</p>

                        <div className="mt-5">
                            <p className="text-xl font-bold text-blue-600">{infosItems.prix} FCFA</p>
                            <p className="text-sm text-gray-500 mt-1">
                                {infosItems.quantite > 0 ? `${infosItems.quantite} restants` : "Rupture de stock"}
                            </p>
                        </div>

                        {/* COMPTEUR */}
                        <div className="flex items-center gap-4 mt-6 h-12">
                            <button
                                onClick={() => qty > 1 && setQty(qty - 1)}
                                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200"
                            >
                                <FiMinus size={18} />
                            </button>

                            <span className="text-lg font-semibold w-10 text-center">{qty}</span>

                            <button
                                onClick={() => qty < infosItems.quantite && setQty(qty + 1)}
                                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200"
                            >
                                <FiPlus size={18} />
                            </button>
                        </div>

                        {/* BOUTON PANIER -> ouvre popup Mobile Money */}
                        <button
                            onClick={handleShowMMPopup}
                            disabled={qty > infosItems.quantite || infosItems.quantite === 0}
                            className={`-mt-6 h-12 text-white rounded-lg shadow-md flex items-center justify-center gap-3 transition hover:scale-105
                                ${qty >= infosItems.quantite || infosItems.quantite === 0
                                ? "bg-gray-400 cursor-not-allowed hover:scale-100"
                                : "bg-orange-500 hover:bg-orange-600"}`}
                        >
                            <FiShoppingCart size={20} /> Commander avec Mobile Money
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* POPUP MOBILE MONEY */}
            {showMMPopup && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.4 }}
                        className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-gray-200 flex flex-col gap-5 relative"
                    >
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">
                            Paiement Mobile Money
                        </h2>

                        {/* Select opérateur */}
                        <select
                            className="text-md sm:text-md w-full text-gray-700 bg-white/75 border rounded-lg border-gray-300 py-3 px-4 h-14 focus:outline-none focus:border-blue-500"
                            value={selectedMM}
                            onChange={(e) => setSelectedMM(e.target.value)}
                        >
                            <option value="">Sélectionnez opérateur</option>
                            <option value="MTN">MTN Mobile Money</option>
                            <option value="Airtel">Airtel Money</option>
                        </select>

                        {/* Select partenaire livraison */}
                        <select
                            className="text-md sm:text-md w-full text-gray-700 bg-white/75 border rounded-lg border-gray-300 py-3 px-4 h-14 focus:outline-none focus:border-blue-500"
                            value={selectedMM}
                            onChange={(e) => setSelectedMM(e.target.value)}
                        >
                            <option value="">Sélectionnez votre partenaire pour la livraison</option>
                            <option value="C BLIND">C BLIND</option>
                            {catalogue.map((partenaire) => (
                                <option key={partenaire.id} value={partenaire.nom}>
                                    {partenaire.nom}
                                </option>
                            ))}

                        </select>

                        {/* Input numéro */}
                        <input
                            type="text"
                            placeholder="Numéro Mobile Money"
                            className="text-md sm:text-lg w-full text-gray-700 bg-white/75 border rounded-lg border-gray-300 py-3 px-4 h-14 focus:outline-none focus:border-blue-500"
                            value={mmNumber}
                            onChange={(e) => {
                                const onlyNumbers = e.target.value.replace(/\D/g, "");
                                setMmNumber(onlyNumbers);
                            }}
                        />

                        <p className="text-sm sm:text-base text-gray-500 text-center">
                            Montant :{" "}
                            <span className="font-semibold">{qty * infosItems.prix} FCFA</span>
                        </p>

                        <button
                            onClick={handleConfirmMM}
                            className="mt-2 h-14 sm:h-16 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition hover:scale-105 text-md sm:text-lg w-full"
                        >
                            Valider le paiement
                        </button>

                        <button
                            onClick={() => setShowMMPopup(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold transition hover:scale-105"
                        >
                            <FiX size={28} />
                        </button>
                    </motion.div>
                </motion.div>
            )}




            {/* TOAST */}
            {showToast && (
                <div className="fixed bottom-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    {qty} article(s) ajouté(s) au panier !
                </div>
            )}
        </div>
    );
}

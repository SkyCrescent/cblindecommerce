"use client";
import React, {useEffect, useState} from "react";
import { motion } from "framer-motion";
import Barre from "../../../components/Barre";
import logo from "../../../public/media/amazon.jpg";
import Pied2 from "../../../components/Pied 2";
import axios from "axios";
export default function Page() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ;
    const [orders, setOrders] = useState([
        {
            id: 1,
            date: "2025-12-09",
            status: "En attente",
            total: 12000,
            items: [
                { id: 1, name: "Produit A", qty: 2, image: "/products/prodA.jpg" },
                { id: 2, name: "Produit B", qty: 1, image: "/products/prodB.jpg" }
            ]
        },
        {
            id: 2,
            date: "2025-12-08",
            status: "Validée",
            total: 8500,
            items: [
                { id: 3, name: "Produit C", qty: 1, image: "/products/prodC.jpg" }
            ]
        },{
            id: 3,
            date: "2025-12-09",
            status: "En attente",
            total: 12000,
            items: [
                { id: 1, name: "Produit A", qty: 2, image: "/products/prodA.jpg" },
                { id: 2, name: "Produit B", qty: 1, image: "/products/prodB.jpg" }
            ]
        },
        {
            id: 4,
            date: "2025-12-08",
            status: "Validée",
            total: 8500,
            items: [
                { id: 3, name: "Produit C", qty: 1, image: "/products/prodC.jpg" }
            ]
        },{
            id: 5,
            date: "2025-12-09",
            status: "En attente",
            total: 12000,
            items: [
                { id: 1, name: "Produit A", qty: 2, image: "/products/prodA.jpg" },
                { id: 2, name: "Produit B", qty: 1, image: "/products/prodB.jpg" }
            ]
        },
        {
            id: 6,
            date: "2025-12-08",
            status: "Validée",
            total: 8500,
            items: [
                { id: 3, name: "Produit C", qty: 1, image: "/products/prodC.jpg" }
            ]
        }
    ]);
    const [iduser,SetIdUser] = useState(0);
    const [infosCommande, setInfosCommande] = useState([]);
    const [ loaded ,setLoaded ] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedStatus, setselectedStatus] = useState("");
    const [selectedOgProduits, setselectedOgProduits] = useState(""); //edit du produits (product_id)
    const [selectedQuantite, setselectedQuantite] = useState(""); //Quantite du produits
    const [selectedId, setselectedId] = useState("");
    const [selectedProduits, setSelectedProduits] = useState(null);
    const [infosProduits, SetinfosSousProduits] = useState([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

        const handleRemoveItem = async (itemId, productId, quantite) => {
            //deleteProduitsCommandes
    
            try {
    
                // console.log(itemId);
                // console.log(selectedOgProduits);
                // console.log(selectedQuantite);
                //

                const response = await axios.post(`${apiUrl}/deleteProduitsCommandes`, {
                    id: itemId,
                    IdOriginal: productId,
                    Quantite: quantite
                });
            //  //   console.log(response.data.data);
                await getProduits(selectedId) ;
             } catch (error) {
                console.error("Erreur récupération infos :", error);
            }
        };

    const handleValidate = async (selectedId) => {
        try {
            await axios.post(`${apiUrl}/ValiderCommande`, {
               id: selectedId
            });

            // Refresh des commandes
            getInfos(iduser);

            // Fermer le popup
            setSelectedProduits(false);

        } catch (error) {
            console.error("Erreur annulation commande :", error);
        }
    };

    const handleCancel = async (idCommande) => {
        try {
            await axios.post(`${apiUrl}/AnnulerCommande`, {
                idCommande
            });

            // Refresh des commandes
            getInfos(iduser);

            // Fermer le popup
            setSelectedProduits(false);

        } catch (error) {
            console.error("Erreur annulation commande :", error);
        }
    };


    const getInfos = async (id) => {
        try {
            const response = await axios.post(`${apiUrl}/GetAllCommande`, { id: id });
            console.log(response.data.data);
            setInfosCommande(response.data.data);
            setLoaded(false);
        } catch (error) {
            console.error("Erreur récupération infos :", error);
        }
    };
    const getProduits = async (id) => {
        try {
            const response = await axios.post(`${apiUrl}/GetAllProduits`, { id: id });
            console.log(response.data.data);
            SetinfosSousProduits(response.data.data);
            setSelectedProduits(true);
        } catch (error) {
            console.error("Erreur récupération infos :", error);
        }
    };

    const askConfirmation = (id) => {
        setItemToDelete(id);
        setConfirmOpen(true);
    };
    const UpdateCommandeCount = async (id) => {
        try {
            const response = await axios.post(`${apiUrl}/UpdateCommandeCount`, { clientId: id });

        } catch (error) {
            console.error("Erreur récupération infos :", error);
        }
    };

    useEffect(() => {
        const localId = JSON.parse(localStorage.getItem("authUser")) ;
        if (localId != null){
            console.log(localId.userId)
            SetIdUser(localId.userId)
            getInfos(localId.userId)
        }else{
            //SetIscompteExisting(false);
            console.log("local Storage vide ")
        }
    }, []);


    return (
        <div className="relative min-h-screen bg-white">
            {/* Fond gradient */}
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10"/>

            {/* Barre en haut */}
            <div className="relative z-20">
                <Barre/>
            </div>

            {/* Section texte + image */}
            <div className="relative z-20 max-w-6xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-10">
                {/* Texte à gauche */}
                <div className="md:w-1/2 flex flex-col justify-center">
                    <h6 className="text-blue-600 text-lg font-semibold tracking-wide mb-2">
                        VOS COMMANDES
                    </h6>
                    <h1 className="text-3xl font-extrabold leading-snug text-gray-900">
                        Suivez l’état de vos commandes passées
                    </h1>
                    <p className="text-md mt-4 text-gray-700">
                        Retrouvez ici toutes vos commandes récentes, qu’elles soient en attente de validation ou déjà
                        validées.
                        Cliquez sur chaque commande pour voir les produits inclus et gérer vos articles : retirer un
                        produit ou valider l’ensemble de la commande.
                    </p>
                    <motion.p
                        animate={{y: [0, -4, 0]}}
                        transition={{repeat: Infinity, duration: 2}}
                        className="text-sm mt-4 font-semibold text-gray-600"
                    >
                        Assurez-vous de vérifier vos commandes régulièrement pour ne rien manquer !
                    </motion.p>
                </div>

                {/* Image à droite */}
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 1}}
                    className="md:w-1/2 flex justify-end"
                >
                    <img
                        src={logo.src}
                        alt="Illustration"
                        className="rounded-3xl w-full max-w-md h-auto object-cover shadow-lg"
                    />
                </motion.div>
            </div>

            {/* Grille des commandes */}
            <div
                className="relative z-20 max-w-6xl mx-auto px-4 mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">


                {

                loaded  ? (
                    <div className="absolute inset-0 flex items-center justify-center z-50">
                        {/* Spinner externe */}
                        <motion.div
                            animate={{
                                rotate: 360,
                                borderColor: ["#000000", "#007BFF", "#000000"],
                            }}
                            transition={{
                                rotate: {repeat: Infinity, duration: 2.8, ease: "linear"},
                                borderColor: {repeat: Infinity, duration: 3, ease: "easeInOut"},
                            }}
                            className="absolute w-32 h-32 rounded-full border-t-4 border-gray-200"
                        />

                        {/* Spinner interne */}
                        <motion.div
                            animate={{rotate: -360}}
                            transition={{repeat: Infinity, duration: 2, ease: "linear"}}
                            className="absolute w-24 h-24 rounded-full border-b-4 border-yellow-500"
                        />
                    </div>

                )   : (

                    <>

                        {/*{infosCommande.map((item, index) => {*/}
                        {/*   */}
                        {/*})}*/}


                        {
                            infosCommande.map((item,index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    whileHover={{scale: 1.03}}
                                    className="bg-blue-700 text-white rounded-lg p-4 shadow cursor-pointer"
                                    onClick={() =>
                                       {
                                           getProduits(item.id) ;
                                           setselectedStatus(item.status);
                                           setselectedId(item.id);
                                       }
                                }
                                >
                                    <p className="font-semibold">Commande #{item.id}</p>
                                    <p className="text-sm mt-1 opacity-80">Passée le {item.Dat}</p>
                                    <p className={`mt-2 px-2 py-1 rounded inline-block ${
                                        item.status === "Validée" ? "bg-green-600" : "bg-yellow-500 text-gray-900 font-semibold"
                                    }`}>
                                        {item.status}
                                    </p>
                                    <p className="mt-2 font-bold">{item.total} FCFA</p>
                                </motion.div>
                            ))
                        }



                    </>
                    )

                }




            </div>

            {/* Popup commande */}
            {selectedProduits && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-2">

                    {
                        // infosProduits((item,index)=> (

                            <motion.div

                                initial={{scale: 0.85, opacity: 0}}
                                animate={{scale: 1, opacity: 1}}
                                transition={{type: "spring", duration: 0.4}}
                                className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-gray-200"
                            >





                                     <div

                                         className="flex justify-between items-center mb-5">
                                         <h2 className="text-xl font-bold text-gray-900">
                                             Commande #{selectedId}
                                         </h2>
                                         <button
                                             onClick={() => setSelectedProduits(false)}
                                             className="text-gray-500 hover:text-red-600 text-xl hover:scale-110 transition"
                                         >
                                             ✖
                                         </button>
                                     </div>

                                     <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 mt-2">



                                         {  infosProduits.map((item,index) =>(

                                         <motion.div
                                             key={item.id}

                                             initial={{x: -20, opacity: 0}}
                                             animate={{x: 0, opacity: 1}}
                                             className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
                                         >
                                             <div  key={item.id}  className="flex items-center gap-3">
                                                 <img

                                                     src={`/${item.photo}`}
                                                     alt={item.nom}
                                                     className="w-16 h-16 object-cover rounded-md border border-gray-300"/>
                                                 <div>
                                                     <p className="font-semibold text-gray-900">{item.nom}</p>
                                                     <p className="text-xs text-gray-600">Qté : {item.quantite}</p>
                                                 </div>
                                             </div>

                                             {selectedStatus === "En attente" && (
                                                 <button
                                                     onClick={() =>{

                                                         handleRemoveItem(item.id, item.product_id, item.quantite)
                                                     }   }
                                                     className="text-red-600 hover:text-white hover:bg-red-600 hover:scale-105 transition border border-red-500 px-3 py-1 rounded-lg text-xs"
                                                 >
                                                     Retirer
                                                 </button>
                                             )}
                                         </motion.div>


                                         )) }

                                     </div>

                                     {selectedStatus === "En attente" && (
                                         <div className="flex gap-3 mt-5 justify-end">
                                             <button
                                                 onClick={() =>{
                                                     setSelectedProduits(false);
                                                     askConfirmation(selectedId)
                                                 }}
                                                 className="bg-red-600 hover:bg-red-700 hover:scale-105 transition text-white px-4 py-2 rounded-lg text-sm shadow-md"
                                             >
                                                 Annuler
                                             </button>
                                             <button
                                                 onClick={() =>{
                                                     setSelectedProduits(false);
                                                     handleValidate(selectedId);
                                                     UpdateCommandeCount(iduser);
                                                 } }
                                                 className="bg-green-600 hover:bg-green-700 hover:scale-105 transition text-white px-4 py-2 rounded-lg text-sm shadow-md"
                                             >
                                                 Valider
                                             </button>
                                         </div>
                                     )}

                            </motion.div>


                    }


                </div>
            )}


            {confirmOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", duration: 0.4 }}
                        className="bg-white rounded-2xl p-7 w-[90%] max-w-md shadow-2xl border border-gray-200"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            Confirmer l’annulation
                        </h3>

                        <p className="text-gray-700 mb-6">
                            Voulez-vous vraiment annuler cette commande ?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setConfirmOpen(false)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition font-semibold hover:scale-105 transition cursor-pointer"
                            >
                                Non
                            </button>

                            <button
                                onClick={() => {
                                    setConfirmOpen(false);
                                    handleCancel(itemToDelete); // ← Remplace handleRemoveItem par handleCancel
                                }}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-semibold shadow-md hover:scale-105 transition cursor-pointer"
                            >
                                Oui, annuler
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}



            <br></br>
            <div
                className="relative  h-auto  z-30">

                <Pied2/>
            </div>
        </div>
    );
}

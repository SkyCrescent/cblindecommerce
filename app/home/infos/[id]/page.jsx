"use client";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiShoppingCart, FiPlus, FiMinus } from "react-icons/fi";
import { useEffect, useState } from "react";
import Barre from "@/components/Barre";

const itemList = [
    { id: 1, nom: "Ordinateurs de bureau", photo: "/media/img/burautique.jpg", prix: 250, stock: 15, desc: "Ordinateurs de bureau performants adaptés au travail et aux jeux." },
    { id: 2, nom: "Accessoires auto", photo: "/media/img/auto.png", prix: 80, stock: 32, desc: "Pneus, volants et articles automobiles pour tout type de véhicule." },
    { id: 3, nom: "Chaussures classiques", photo: "/media/img/chaussure-cuir-homme-bout-fleuri.jpg", prix: 45, stock: 21, desc: "Chaussures élégantes en cuir pour hommes." },
    { id: 4, nom: "Articles de sport", photo: "/media/img/do7193-007__chaussure-jordan-one-take-4-pour-homme-do7193-007_01_2.jpg", prix: 70, stock: 10, desc: "Équipements de sport Nike, Adidas et bien d’autres." },
    { id: 5, nom: "Vêtements homme/femme", photo: "/media/img/ensemble-2-pieces-veste-pantalon-noir2.jpg", prix: 35, stock: 40, desc: "Pulls, chemises, pantalons et ensembles tendance." },
    { id: 6, nom: "Équipement sportif", photo: "/media/img/Equipement-sportif-m.jpg", prix: 30, stock: 27, desc: "Ballons, sifflets, filets et accessoires pour le sport." },
    { id: 7, nom: "Smartphones", photo: "/media/img/Galaxy-S9-920x613.jpg", prix: 200, stock: 18, desc: "Smartphones Wikoo, Tecno, Samsung et autres marques." },
    { id: 8, nom: "Jouets", photo: "/media/img/jouet.JPG", prix: 15, stock: 50, desc: "Jouets éducatifs et ludiques pour enfants de tout âge." },
    { id: 9, nom: "Autres articles", photo: "/media/img/more-106.PNG", prix: 0, stock: 0, desc: "Divers articles disponibles en magasin." }
];

export default function ProductDetails() {
    const router = useRouter();
    const { id } = useParams();
  //  const [product, setProduct] = useState(null);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);

    // compteur d’items
    const [qty, setQty] = useState(1);

    // animation apparition
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!id) return;
        const found = itemList.find((p) => p.id === Number(id));
        setProduct(found);

        // animation d'entrée
        setTimeout(() => setLoaded(true), 50);
    }, [id]);

    const handleAddToCart = () => {
        // Ici tu pourrais ajouter au panier réel
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // disparaît après 3 secondes
    };


    if (!product) {
        return (
            <div className="w-full h-screen flex justify-center items-center text-gray-600 text-lg">
                Chargement du produit...
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10"/>
                    <div className="w-full -mt-8 z-20">
                        <Barre/>
                    </div>

            {/* RETOUR */}
            {/*<button*/}
            {/*    onClick={() => router.back()}*/}
            {/*    className="flex items-center gap-2 text-gray-700 z-20 hover:text-black mb-5 transition"*/}
            {/*>*/}
            {/*    <FiArrowLeft size={20}/>*/}
            {/*    Retour*/}
            {/*</button>*/}

            {/* CARTE PRODUIT */}
            <div
                className={`bg-transparent rounded-xl z-20 shadow-2xl mt-6 w-full max-w-4xl p-6 flex flex-col md:flex-row gap-8 
                transform transition-all duration-700
                ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

                {/* IMAGE */}
                <div className="w-full md:w-1/2 rounded-xl overflow-hidden">
                    <img
                        src={product.photo}
                        alt={product.nom}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* INFOS */}
                <div className="flex flex-col justify-between w-full md:w-1/2">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        {product.nom}
                    </h1>

                    <p className="text-gray-600 mt-3">{product.desc}</p>

                    <div className="mt-5">
                        <p className="text-xl font-bold text-blue-600">
                            {product.prix} $ USD
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                            {product.stock > 0 ? `${product.stock} articles restants` : "Rupture de stock"}
                        </p>
                    </div>

                    {/* COMPTEUR */}
                    <div className="flex items-center gap-4 mt-6">
                        <button
                            onClick={() => qty > 1 && setQty(qty - 1)}
                            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200 transition"
                        >
                            <FiMinus size={18}/>
                        </button>

                        <span className="text-lg font-semibold w-10 text-center">
                            {qty}
                        </span>

                        <button
                            onClick={() => qty < product.stock && setQty(qty + 1)}
                            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200 transition"
                        >
                            <FiPlus size={18}/>
                        </button>
                    </div>

                    {/* AJOUTER AU PANIER */}
                    <button
                        className="mt-6 h-12 bg-orange-500 hover:bg-orange-600 text-white
                        rounded-lg shadow-md flex items-center justify-center gap-3
                        transition transform hover:scale-105"
                        onClick={handleAddToCart}
                    >
                        <FiShoppingCart size={20}/>
                        Ajouter au panier ({qty})
                    </button>

                    {/* COMMANDER */}
                    <button
                        className="mt-3 h-12 bg-blue-600 hover:bg-blue-700 text-white
                        rounded-lg shadow-md flex items-center justify-center gap-3
                        transition transform hover:scale-105"
                    >
                        <FiShoppingCart size={20}/>
                        Commander maintenant
                    </button>
                </div>

                {/* Toast notification */}
                {showToast && (
                    <div className="fixed bottom-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
                        {quantity} article(s) ajouté(s) au panier !
                    </div>
                )}
            </div>
        </div>
    );
}

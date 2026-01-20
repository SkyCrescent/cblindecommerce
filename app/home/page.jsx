"use client"

import React, {useEffect} from 'react';
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import Pied2 from  "../../components/Pied 2"
import Barre from "../../components/Barre"
import {useRouter} from "next/navigation";

import logo from "../../public/media/sites.jpg";
import axios from "axios";
export default function Home() {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ;
    const [produits, setproduits] = useState([]);
    const [filteredProduits, setFilteredProduits] = useState([]);
    const [ IscompteExisting, SetIscompteExisting] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState("");
    const item2 = [
        {
            "id": 1,
            "nom": "Nous mettons a votre disposition des ordinateurs de bureaux,des PC a des prix défiants toute concurences de marque : hp,DELL,Acer ... ",
            "photo": "media/img/burautique.jpg",
            "details" : ""

        },
        {
            "id": 2,
            "nom": "Des pneus,volants et articles automoniles sont egalement disponibles sur notre boutiques.Qu'importe le modele vous serez servi",
            "photo": "media/img/auto.png",
            "details" : ""

        },
        {
            "id": 3,
            "nom": "Des chaussures classiques de toute tailles pour hommes sont disponibles,a des prix défiant toute concurrence ...",
            "photo": "media/img/chaussure-cuir-homme-bout-fleuri.jpg",
            "details" : ""

        },
        {
            "id": 4,
            "nom": "Pour vos séances de sport,des marques comme : Nike,Adidas sont mises en vente sur le site ....",
            "photo": "media/img/do7193-007__chaussure-jordan-one-take-4-pour-homme-do7193-007_01_2.jpg",
            "details" : ""

        },
        {
            "id": 5,
            "nom": "Des pulls,chemises,pantalons :homme/femme sont également pret pour votre plaisir",
            "photo": "media/img/ensemble-2-pieces-veste-pantalon-noir2.jpg",
            "details" : ""
        },
        {
            "id": 6,
            "nom": "MOSALA CG vous propose une large gamme d'équipement sportif :ballons,sifflet ....",
            "photo": "media/img/Equipement-sportif-m.jpg",
            "details" : "",

        },
        {
            "id": 7,
            "nom": "Les dernieres marques de smartphones sont egalement mise en vente :Wikoo,Techno,Samsung ....",
            "photo": "media/img/Galaxy-S9-920x613.jpg",
            "details" : ""      },
        {
            "id": 8,
            "nom": "Vos enfants aussi trouveront des jouets a leur guise ...",
            "photo": "media/img/jouet.JPG",
            "details" : "",

        }, {
            "id": 9,
            "nom": "Et bien d'autre",
            "photo": "media/img/more-106.PNG",
            "details" : "",

        },
    ]
    const item = [
        {
            id: 1,
            nom: "Nous mettons a votre disposition des ordinateurs de bureaux...",
            photo: "media/img/burautique.jpg",
            prix: 250,
            stock: 15
        },
        {
            id: 2,
            nom: "Des pneus, volants et articles automobiles...",
            photo: "media/img/auto.png",
            prix: 80,
            stock: 32
        },
        {
            id: 3,
            nom: "Des chaussures classiques pour hommes...",
            photo: "media/img/chaussure-cuir-homme-bout-fleuri.jpg",
            prix: 45,
            stock: 21
        },
        {
            id: 4,
            nom: "Articles de sport Nike, Adidas...",
            photo: "media/img/do7193-007__chaussure-jordan-one-take-4-pour-homme-do7193-007_01_2.jpg",
            prix: 70,
            stock: 10
        },
        {
            id: 5,
            nom: "Des pulls, chemises, pantalons homme/femme...",
            photo: "media/img/ensemble-2-pieces-veste-pantalon-noir2.jpg",
            prix: 35,
            stock: 40
        },
        {
            id: 6,
            nom: "Équipement sportif : ballons, sifflet...",
            photo: "media/img/Equipement-sportif-m.jpg",
            prix: 30,
            stock: 27
        },
        {
            id: 7,
            nom: "Smartphones Wikoo, Tecno, Samsung...",
            photo: "media/img/Galaxy-S9-920x613.jpg",
            prix: 200,
            stock: 18
        },
        {
            id: 8,
            nom: "Jouets pour enfants...",
            photo: "media/img/jouet.JPG",
            prix: 15,
            stock: 50
        },
        {
            id: 9,
            nom: "Et bien d'autre",
            photo: "media/img/more-106.PNG",
            prix: 0,
            stock: 0
        }
    ]
    const imagesCarousel = [
        "/media/sites.jpg",
        "/media/Explained.jpg",
        "/media/business.JPG",
        "/media/1729658511260.JPG",
    ];
    const encryptedData = "";
    useEffect(() => {
        if (paused) return; // ⛔ Stopper si souris dessus

        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % imagesCarousel.length);
        }, 15000);

        return () => clearInterval(interval);
    }, [paused]);



    const colors = [
        "bg-red-500/40",
        "bg-blue-500/40",
        "bg-purple-500/40",
        "bg-green-500/40",
        "bg-pink-500/40",
        "bg-orange-500/40",
        "bg-teal-500/40"
    ];

    const [loading2 , SetLoading2 ] = useState(true)

    const [isSubmit,SetIsSubmit] = useState(false)
    const [scrollIndex2, setScrollIndex2] = useState(0);
    const itemWidth2 = 18; // Adjust this value based on your item width and gap

    useEffect(() => {
        const interval2 = setInterval(() => {
            setScrollIndex2((prevIndex) => (prevIndex + 1) % item.length);
        }, 2000); // Change the delay to suit your needs
        // ca fait bouger les element avec un distance de 21 et une intervalle de 3000 donc 3 secondes
        //le styles fait bouge les image via animate scrool
        return () => clearInterval(interval2);
    }, [item.length]);



    const [focus , SetFocus] = useState(false)
    const [values, setValues] = useState({
        username: "",
    });
    const input = [
        { id: 1, name: "username", type: "text", placeholder: "Nom",value: values.username   ,label: "Entrez votre le nom du produits", className: `text-xl w-[90%] text-gray-700 bg-white/75 border rounded-lg border-gray-300 py-2 px-10 h-14 focus:outline-none focus:border-blue-500 `,
            img: `media/icons/search_filled_127px.png`,
        }
    ]

    const handleChange = (e) => {
        const { name, value } = e.target;
        let cleanedAddress = '';
        cleanedAddress = value.replace(/[^\w\s]/gi, '');
        // 3) Title Case : première lettre de chaque mot en majuscule
        cleanedAddress = cleanedAddress.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
        setValues({ ...values, [name]: cleanedAddress });
    };

    useEffect(() => {

        SetLoading2(true)


    }, []);



        const getData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/AllProduits`);
                console.log(response.data.data )
                if (response.data.data  && response.data.data.length > 0) {
                    // Vérifiez que la réponse contient les données attendues
                    console.log("la jointure",response.data)
                    setproduits(response.data.data)

                    SetLoading2(false)
                } else {
                    console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response.data);
                }
            } catch (error) {
                console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
            }
        };

    useEffect(()=>{
        getData();
    },[])
    // Filtrer à chaque changement de input
    useEffect(() => {
        if (values.username === "") {
            setFilteredProduits(produits); // si vide, afficher tout
        } else {
            const filtered = produits.filter(p =>
                p.nom.toLowerCase().includes(values.username.toLowerCase())
            );
            setFilteredProduits(filtered);
        }
    }, [values.username, produits]); // déclenche quand input ou produits change

    useEffect(() => {
        const authUser = JSON.parse(localStorage.getItem("authUser"));

        if (authUser) {
            SetIscompteExisting(true);
            setUserId(authUser.id || null);     // récupère l'edit
            setUserName(authUser.nom || "");    // récupère le nom
        } else {
            SetIscompteExisting(false);
            setUserId(null);
            setUserName("");
        }
    }, []);


    return (
        <>
            <div className="relative min-h-screen bg-white">

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10"/>

                {/* Navbar */}
                <div className="relative z-30">
                    <Barre/>
                </div>

                {/* Hero section */}
                <div
                    className="relative flex flex-col md:flex-row justify-between items-center py-6 px-4 md:py-8 md:px-10 z-30">

                    {/* LEFT TEXT BLOCK */}
                    <div className="w-full md:w-2/5 leading-snug mb-8 md:mb-0">

                        <h6 className="text-blue-600 text-lg font-semibold tracking-wide mb-3 md:mb-5">
                            BIENVENU SUR
                        </h6>

                        <h1 className="text-3xl sm:text-4xl md:text-4xl font-extrabold leading-tight text-gray-900">
                            La plateforme<br/>
                            e-commerce de
                        </h1>

                        <h1 className="text-4xl sm:text-5xl md:text-5xl font-black text-blue-600 mt-2 tracking-wide">
                            C-BLIND
                        </h1>

                        <motion.div
                            animate={{y: [0, -8, 0]}}
                            transition={{repeat: Infinity, duration: 2}}
                            className="text-sm py-6 md:py-10 font-bold"
                        >
                            + des millions de produits disponibles dans plusieurs catégories.
                        </motion.div>

                        {/* Input zone */}
                        <div className="relative w-full mt-4">
                            {input.map((inputs) => (
                                <div
                                    className="rounded-md h-16 sm:h-20 w-full mx-auto flex flex-col items-center justify-center mb-4"
                                    key={inputs.id}>
                                    <div className="absolute w-full">
                                        <input
                                            onFocus={() => SetFocus(true)}
                                            onBlur={() => SetFocus(false)}
                                            type={inputs.type}
                                            name={inputs.name}
                                            className={inputs.className}
                                            onChange={(e) => handleChange(e)}
                                            value={inputs.value}
                                            defaultValue={inputs.defaultValue}
                                        />
                                        {inputs.img && (
                                            <img
                                                src={inputs.img}
                                                alt=""
                                                className="absolute hidden md:flex right-3 sm:right-16 top-[26%] cursor-pointer transition duration-300 transform hover:scale-125"
                                                width={30}
                                                height={30}
                                                //onClick={() => showChar(inputs.edit)}
                                            />
                                        )}
                                        <span
                                            className={(focus || values.username)
                                                ? "absolute left-3 p-1 w-auto top-7 text-xs font-bold text-blue-900 -translate-y-12 duration-300"
                                                : "absolute tracking-wide pointer-events-none duration-300 left-0 top-[17px] px-10 text-sky-900"}>
                {inputs.label}
              </span>
                                    </div>
                                    <div>
                                        {isSubmit && inputs.error && (
                                            <div className="text-[70%] text-red-600">{inputs.error}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT IMAGE BLOCK */}
                    <motion.div
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 1.2}}
                        className="w-full md:w-3/5 flex justify-center md:justify-end"
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeIndex}
                                src={imagesCarousel[activeIndex]}
                                className="rounded-3xl w-full sm:w-[450px] md:w-[620px] h-[250px] sm:h-[350px] md:h-[350px] object-cover shadow-lg"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 1.2}}
                            />
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Products / Grid section */}
                <div className="relative w-full py-6 px-4 sm:px-6 z-30 min-h-[400px]">
                    {loading2 ? (
                        // Spinner centré
                        <div className="absolute inset-0 flex items-center justify-center z-50">
                            <motion.div
                                animate={{rotate: 360, borderColor: ["#000000", "#007BFF", "#000000"]}}
                                transition={{
                                    rotate: {repeat: Infinity, duration: 2, ease: "linear"},
                                    borderColor: {repeat: Infinity, duration: 3, ease: "easeInOut"},
                                }}
                                className="absolute w-24 sm:w-32 h-24 sm:h-32 rounded-full border-t-4 border-gray-200"
                            />
                            <motion.div
                                animate={{rotate: -360}}
                                transition={{repeat: Infinity, duration: 2, ease: "linear"}}
                                className="absolute w-16 sm:w-24 h-16 sm:h-24 rounded-full border-b-4 border-yellow-500"
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {filteredProduits.map((item, index) => {
                                const overlayColor = colors[Math.floor(Math.random() * colors.length)];
                                return (
                                    <div
                                        key={index}
                                        onClick={() => router.push(`/home/infos?id=${encodeURIComponent(btoa(item.id))}`)}
                                        className="relative group bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
                                    >
                                        {/* IMAGE */}
                                        <div className="w-full h-48 sm:h-56 overflow-hidden rounded-t-xl">
                                            <img
                                                src={`/${item.photo}`}
                                                alt={item.nom}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* NOM */}
                                        <div className="p-4 text-center">
                                            <h2 className="text-sm sm:text-base text-gray-800 font-medium">{item.nom}</h2>
                                        </div>

                                        {/* OVERLAY AU HOVER */}
                                        <div
                                            className={`absolute inset-0 bg-black/50 ${overlayColor} flex flex-col justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300`}
                                        >
                                            <p className="text-white text-lg font-bold">
                                                {item.prix ? item.prix + " FCFA" : "—"}
                                            </p>
                                            <p className="text-white text-sm">
                                                {item.quantite > 0 ? `${item.quantite} restants` : "Rupture de stock"}
                                            </p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    IscompteExisting
                                                        ? router.push(`/home/infos?id=${encodeURIComponent(btoa(item.id))}`)
                                                        : router.push("/home/login");
                                                }}
                                                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 hover:scale-105 transition"
                                            >
                                                Commander
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="relative h-auto z-30">
                    <Pied2/>
                </div>
            </div>

        </>
    )
}

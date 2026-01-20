"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import ImageSrc from "../public/media/logo.png";
import Theshop from "../public/media/icons/shopping_cart_127px.png";
import house from "../public/media/icons/gender_neutral_user_filled_127px.png";
import shutdown from "../public/media/icons/shutdown_127px.png"
import { motion } from "framer-motion";
import {useEffect, useState} from "react";
import axios from "axios";

// ICONES
import {
    FiHome,
    FiGrid,
    FiTool,
    FiUser,
    FiShoppingCart,
    FiArrowLeft
} from "react-icons/fi";

export default function Barre() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ;
    const router = useRouter();
    const pathname = usePathname();
    const [ IscompteExisting, SetIscompteExisting] = useState(false);
    const [ idUser, setIdUsers] = useState("");
    // Vérifie si l'URL contient "/infos"
    const isInfosPage = pathname.includes("/infos")  ;
    //const isInfosPage = pathname.includes("/infos")  || pathname.includes("/login");
    const isInfosPage2 =  pathname.includes("/login");
    const [values, setValues] = useState({
        username: "",
        mail :""
    });

    useEffect(() => {
        //   let userId = 1 ;
        // let username = "Crescent";
        // const authUser = { userId, username };
        //
        // localStorage.setItem("authUser", JSON.stringify(authUser));

        const localId = JSON.parse(localStorage.getItem("authUser")) ;

        if (localId != null){
            SetIscompteExisting (true);
            console.log(localId.userId)
            getData(localId.userId)
        }else{
            SetIscompteExisting(false);
            console.log("local Storage vide ")
        }
        //   let userId = 0 ;
        // let username = "Crescent";
        // const authUser = { userId, username };

        // localStorage.setItem("authUser", JSON.stringify(authUser));
        //
        //  console.log( local.username  )


    }, []);


    const getData = async (id) => {
        try {
            const response = await axios.post(`${apiUrl}/GetInfosUsers`, { id: id });
            console.log(response.data.data )
            if (response.data.data  && response.data.data.length > 0) {
                console.log(response)
                setValues({
                    ...values,
                    username:response.data.data[0].nom ,
                    mail: response.data.data[0].mail,
                });
            } else {
                console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response.data);
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
        }
    };


    return (
        <nav className="relative w-full flex items-center justify-between py-4 px-2 md:-px-4 md:py-8 text-md">

            {/* Logo : centré en hauteur, fixe à gauche */}
            {/*<div className="relative flex items-center justify-center w-48 h-24">*/}

            <div
                className="
       relative flex items-center justify-center
        w-48 h-24
        md:w-44 md:h-20

        absolute -left-10
        md:-left-2
    "
            >

                {/* Spinner externe */}
                <motion.div
                    animate={{rotate: 360, borderColor: ["#000000", "#007BFF", "#000000"]}}
                    transition={{
                        rotate: {repeat: Infinity, duration: 2.8, ease: "linear"},
                        borderColor: {repeat: Infinity, duration: 3, ease: "easeInOut"}
                    }}
                    className="absolute  w-22 h-22     /* MOBILE */
            md:w-30 md:h-30    rounded-full border-t-2"
                />

                {/* Spinner interne */}
                <motion.div
                    animate={{rotate: -360}}
                    transition={{repeat: Infinity, duration: 2, ease: "linear"}}
                    className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full border-b-2 border-yellow-500"
                />

                {/* IMAGE CENTRÉE */}
                <Image
                    src={ImageSrc}
                    height={60}
                    width={120}
                    alt="Logo"
                    className="relative z-10   w-16 md:w-28
            h-auto "
                />
            </div>

            {/* MENU Desktop */}
            <ul className="hidden md:flex items-center text-[15px] gap-5 font-bold ml-auto">

                {!isInfosPage ? (
                        <>
                            <li className="text-blue-900 hover:scale-105 transition">
                                <Link href="/home">Accueil</Link>
                            </li>
                            <li className="text-blue-900 hover:scale-105 transition">
                                <Link href="/home/list">Nos Catalogues</Link>
                            </li>
                            <li className="text-blue-900 hover:scale-105 transition">
                                <Link href="/home/service">Nos Services</Link>
                            </li>
                        </>

                    ) :
                    <>
                        <li className="relative ml-55 text-blue-900 hover:scale-105 transition ">
                            <Link href="/home">Retour</Link>
                        </li>
                    </>
                }

                {!isInfosPage2 && (
                    <>
                        {/* Panier */}
                        <div
                            className="hover:scale-125 cursor-pointer transition"
                            onClick={() => router.push("/home/reservation")}
                        >
                            <Image src={Theshop} width={28} height={28} alt="Panier"/>
                        </div>

                        {/* User infos */}
                        <div
                            className={`flex items-center gap-2 px-3 py-2 transition ${!IscompteExisting ? "hidden" : ""}`}
                        >
                            <Image
                                src={shutdown.src}
                                width={25}
                                height={25}
                                alt="Profil"
                                className="cursor-pointer hover:scale-105" onClick={() => router.push("/home/login")}/>
                            <div className="leading-tight">
                                <p className="text-gray-900 text-[14px] font-semibold">{values.username.length > 15 ? values.username.slice(0, 15) + "..." : values.username}</p>
                                <p className="text-gray-600 text-[11px]">{values.mail}</p>
                            </div>
                        </div>

                        {/* Si pas connecté */}
                        <button
                            className={`bg-blue-900 text-white px-4 py-2 text-[13px] rounded-3xl
            hover:bg-blue-800 hover:scale-105 transition ${IscompteExisting ? "hidden" : ""}`}
                            onClick={() => router.push("/home/login")}
                        >
                            Mon compte
                        </button>
                    </>
                )}

            </ul>

            {/* MENU Mobile */}
            {/*<div className="md:hidden flex items-center gap-6 ml-auto text-blue-900">*/}

            <div className="md:hidden flex items-center gap-4 text-blue-900 pl-6">
                {!isInfosPage ? (
                    <>
                        <FiHome size={22} onClick={() => router.push("/home")} className="cursor-pointer"/>
                        <FiGrid size={22} onClick={() => router.push("/home/list")} className="cursor-pointer"/>
                        <FiTool size={22} onClick={() => router.push("/home/service")} className="cursor-pointer"/>
                    </>
                ) : (
                    <FiArrowLeft
                        size={22}
                        onClick={() => router.push("/home")}
                        className="cursor-pointer"
                    />
                )}

                {!isInfosPage2 && (
                    <>
                        <FiShoppingCart
                            size={22}
                            onClick={() => router.push("/home/reservation")}
                            className="cursor-pointer"
                        />
                        <FiUser
                            size={22}
                            onClick={() => router.push("/home/login")}
                            className="cursor-pointer"
                        />
                    </>
                )}
            </div>

        </nav>

    );

}
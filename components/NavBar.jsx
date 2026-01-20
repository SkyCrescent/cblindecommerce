"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    FiHome,
    FiUser,
    FiSettings,
    FiBriefcase,
    FiBookOpen,
    FiCalendar,
    FiBarChart,
    FiBell,
    FiUserCheck
} from "react-icons/fi";
import ImageSrc from "../public/media/logo.png";
import Theshop from "../public/media/icons/shopping_cart_127px.png";
import house from "../public/media/icons/gender_neutral_user_filled_127px.png";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Barre() {
    const router = useRouter();
    const [totalCommande, setTotalCommande] = useState(0);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const mobileLinks = [
        { name: "Produits", icon: <FiHome size={22} />, href: "/admin/home" },
        { name: "Utilisateurs", icon: <FiUser size={22} />, href: "/admin/Users" },
        { name: "Service", icon: <FiSettings size={22} />, href: "/admin/service" },
        { name: "Compte", icon: <FiBriefcase size={22} />, href: "/admin/compte" },
        { name: "Catalogues", icon: <FiBookOpen size={22} />, href: "/admin/List" },
        { name: "Réservations", icon: <FiCalendar size={22} />, href: "/admin/reservation" },
        { name: "Statistiques", icon: <FiBarChart size={22} />, href: "/admin/stat" },
        { name: "Notifications", icon: <FiBell size={22} />, href: "/admin/notifications" }, // <-- nouveau lien
        { name: "Partenaire", icon: <FiUserCheck  size={22} />, href: "/admin/notifications" }, // <-- nouveau lien
    ];

    const getInfos = async () => {
        try {
            const response = await axios.get(
                `${apiUrl}/getAllCommandeValide`,
            );

         //   setInfosCommande(response.data?.data || []);
            setTotalCommande(response.data.total || 0); // ✅ nombre de commandes
console.log(response.data.total)
        } catch (error) {
            console.error("Erreur récupération commandes :", error);
          //  setInfosCommande([]);
            setTotalCommande(0);
        }
    };

    useEffect(() => {
        getInfos()
    }, []);

    return (
        <nav className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-4 relative z-50 ">

            {/* Logo */}
            <div className="flex-shrink-0">
                <Image
                    src={ImageSrc}
                    height={60}
                    width={120}
                    alt="Logo"
                    className="object-contain"
                />
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex flex-wrap justify-end items-center gap-4 lg:gap-6 flex-1">
                <Link href="/admin/home" className="text-blue-900 font-semibold transition transform hover:scale-105">Produits</Link>
                <Link href="/admin/Users" className="text-blue-900 font-semibold transition transform hover:scale-105">Utilisateurs</Link>
                <Link href="/admin/service" className="text-blue-900 font-semibold transition transform hover:scale-105">Service</Link>
                <Link href="/admin/compte" className="text-blue-900 font-semibold transition transform hover:scale-105">Compte</Link>
                <Link href="/admin/List" className="text-blue-900 font-semibold transition transform hover:scale-105">Catalogues</Link>
                <Link  href="/admin/notifications"  className="text-blue-900 font-semibold transition transform hover:scale-105">Notifications </Link>
                <Link href="/admin/stat" className="text-blue-900 font-semibold transition transform hover:scale-105">Statistiques</Link>
                <Link
                    href="/admin/reservation"

                    className={`font-semibold transition transform hover:scale-105 ${
                        totalCommande > 0
                            ? "text-red-500"
                            : "text-blue-200"
                    }`}
                >Réservations

                </Link>

                <Link href="/admin/parteners" className="text-blue-900 font-semibold transition transform hover:scale-105">Partenaires</Link>

            </div>

            {/* Mobile Menu */}
            <div className="flex md:hidden justify-between items-center gap-2 w-full mt-2 overflow-x-auto px-2">
                {/*{mobileLinks.map((link) => (*/}
                {/*    <div*/}
                {/*        key={link.name}*/}
                {/*        className="flex flex-col items-center text-blue-900 cursor-pointer min-w-[60px] hover:text-blue-600 transition transform hover:scale-105"*/}
                {/*        onClick={() => router.push(link.href)}*/}
                {/*    >*/}
                {/*        {link.icon}*/}
                {/*        <span className="text-xs mt-1 text-center">{link.name}</span>*/}
                {/*    </div>*/}
                {/*))}*/}

                {mobileLinks.map((link) => {
                    const isNotification = link.name === "Réservations";
                    const isActiveNotif = isNotification && totalCommande > 0;

                    return (
                        <div
                            key={link.name}
                            className={`flex flex-col items-center cursor-pointer min-w-[60px] transition transform hover:scale-105 ${
                                isActiveNotif ? "text-yellow-500" : "text-blue-900 hover:text-blue-600"
                            }`}
                            onClick={() => router.push(link.href)}
                        >
                            {link.icon}
                            <span className="text-xs mt-1 text-center">{link.name}</span>

                            {/* Badge nombre */}
                            {isActiveNotif && (
                                <span className="mt-1 text-[10px] bg-yellow-500 text-white px-2 rounded-full">
                    {totalCommande}
                </span>
                            )}
                        </div>
                    );
                })}


                {/* Compte et Panier séparés */}
                {/*<div*/}
                {/*    className="flex flex-col items-center text-blue-900 cursor-pointer min-w-[60px] hover:text-blue-600 transition transform hover:scale-105"*/}
                {/*    onClick={() => router.push("#")}*/}
                {/*>*/}
                {/*    <Image src={house} width={24} height={24} alt="Se connecter" />*/}
                {/*    <span className="text-xs mt-1">Compte</span>*/}
                {/*</div>*/}
                {/*<div*/}
                {/*    className="flex flex-col items-center text-blue-900 cursor-pointer min-w-[60px] hover:text-blue-600 transition transform hover:scale-105"*/}
                {/*    onClick={() => router.push("/cart")}*/}
                {/*>*/}
                {/*    <Image src={Theshop} width={24} height={24} alt="Panier" />*/}
                {/*    <span className="text-xs mt-1">Panier</span>*/}
                {/*</div>*/}
            </div>
        </nav>
    );
}

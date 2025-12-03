"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import ImageSrc from "../public/media/logo.png";
import Theshop from "@/public/media/icons/shopping_cart_127px.png";
import house from "@/public/media/icons/gender_neutral_user_filled_127px.png";

export default function Barre() {
    const router = useRouter();
    const pathname = usePathname();

    // Vérifie si l'URL contient "/infos"
    const isInfosPage = pathname.includes("/infos")  || pathname.includes("/login");

    return (
        <nav className="w-full flex flex-row text-md justify-between gap-3 items-center">
            {/* Logo */}
            <div className="w-52 items-center">
                <Image
                    src={ImageSrc}
                    height={150}
                    width={290}
                    alt="Logo"
                    className="mx-4 my-4"
                />
            </div>

            {/* Menu */}
            <div className="relative w-[60%] my-9 -mx-9 md:w-[100%] lg:w-[50%] flex flex-col font-bold md:mx-1">
                <div className="hidden md:block">
                    <ul className="lg:px-1 m-8 md:m-3 lg:m-1 flex justify-between items-center flex-row gap-6 md:gap-6 lg:gap-3">


                        {/* Affiche le lien "Retour" si on est sur infos */}
                        {isInfosPage ? (
                            <li
                                className="text-blue-900 cursor-pointer transition duration-300 transform hover:scale-105"
                                onClick={() => router.back()}
                            >
                                Retour
                            </li>
                        ) :(
                                <>
                            <li className="text-blue-900 transition duration-300 transform hover:scale-105">
                                <Link href="/home">Accueil</Link>
                                </li>
                                <li className="text-blue-900 transition duration-300 transform hover:scale-105">
                                <Link href="/home/list">Nos Catalogues</Link>
                                </li>
                                </>
                            )}

                        {/* Bouton Voir le panier */}
                        <div
                            className="hover:text-blue-500 cursor-pointer transition duration-300 transform hover:scale-125"
                            onClick={() => router.push("/cart")}
                        >
                            <Image src={Theshop} width={28} height={28} alt="Voir le panier"/>
                        </div>

                        {/* Bouton Se connecter */}
                        {/*<div className="hover:text-blue-500 cursor-pointer flex items-center gap-1 transition duration-300 transform hover:scale-110"*/}
                        {/*     onClick={() => router.push(`/home/login`)}*/}

                        {/*>*/}
                        {/*    <Image src={house} width={28} height={28} alt="Se connecter" />*/}
                        {/*    <div className="text-xs text-blue-900">Se connecter</div>*/}
                        {/*</div>*/}

                        {/* Bouton Créer un compte */}
                        <button
                            className="bg-blue-900 text-white px-5 py-3 text-[13px] mx-3 rounded-3xl hover:bg-blue-800 transition duration-300 transform hover:scale-105"
                            onClick={() => router.push(`/home/login`)}
                        >
                            Créer un compte
                        </button>
                    </ul>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden relative h-24 w-[100%] mx-auto flex justify-between items-center text-blue-900 flex-row gap-6">
                    <Image
                        src={house}
                        width={28}
                        height={28}
                        alt="Se connecter"
                        className="object-center"
                        onClick={() => router.push("#")}
                    />
                    <Image
                        src={Theshop}
                        width={28}
                        height={28}
                        alt="Panier"
                        className="object-center"
                        onClick={() => router.push("/cart")}
                    />
                </div>
            </div>
        </nav>
    );
}

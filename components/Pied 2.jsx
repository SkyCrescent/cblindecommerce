import Link from "next/link"
import Image from "next/image"
import ImageSrc from "../public/media/logo.png"
// import Tele from "../public/Telegram.png"
// import Face from "../public/Facebook Old_125px.png"
// import What from "../public/whatsapp_125px.png"
// import Insta from "../public/instagram_new_125px.png"
import { useState } from "react";
import {useRouter} from "next/navigation";

export default function Barre() {
    const [email, setEmail] = useState("");
    const [emailFocus, setEmailFocus] = useState(false);
    const router = useRouter()
    return (
        <div
            className="bg-[url('../public/media/A-548.jpg')]
            bg-cover bg-no-repeat py-5 px-10 text-black"
        >

            {/* GRID PRINCIPALE */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* ─────────────── 1) LOGO + DESCRIPTION */}
                <div className="flex flex-col items-center text-center">
                    <img
                        src={ImageSrc.src}
                        className="h-36 w-60 mb-6 object-cover"
                    />

                    <h1 className="text-3xl font-black mb-4 tracking-wide ">C BLIND</h1>
                </div>

                {/* ─────────────── 2) MENU */}
                <div>
                    <h1 className="font-black text-lg mb-6 cursor-default">Menu</h1>

                    <div className="flex flex-col text-xs space-y-3">
                        {[
                            {name: "Home", link: "/home"},
                            {name: "Catalogue", link: "/home/list"},
                        ].map((item, i) => (
                            <p
                                key={i}
                                onClick={() => router.push(item.link)}
                                className="
                        cursor-pointer w-fit relative font-normal
                        after:absolute after:left-0 after:bottom-0 after:h-[1px]
                        after:w-0 after:bg-black after:transition-all after:duration-300
                        hover:after:w-full
                    "
                            >
                                {item.name}
                            </p>
                        ))}
                    </div>
                </div>

                {/* ─────────────── 3) USEFUL LINKS */}
                {/*<div>*/}
                {/*    <h1 className="font-black text-lg mb-6 cursor-default">Useful Links</h1>*/}

                {/*    <div className="flex flex-col text-xs space-y-3">*/}
                {/*        {[*/}
                {/*            "Privacy Policy",*/}
                {/*            "Controle starding",*/}
                {/*            "Purchasing Policy",*/}
                {/*            "Terms & Conditions",*/}
                {/*            "Contact",*/}
                {/*        ].map((item, i) => (*/}
                {/*            <p*/}
                {/*                key={i}*/}
                {/*                className="*/}
                {/*                    cursor-pointer w-fit relative*/}
                {/*                    after:absolute after:left-0 after:bottom-0 after:h-[1px]*/}
                {/*                    after:w-0 after:bg-black after:transition-all after:duration-300*/}
                {/*                    hover:after:w-full*/}
                {/*                "*/}
                {/*            >*/}
                {/*                {item}*/}
                {/*            </p>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/* ─────────────── 4) CONTACT */}
                <div>
                    <h1 className="font-black text-lg  mb-6 cursor-default">Contact</h1>

                    <p className="text-xs opacity-90">Lorem ipsum dolor sit amet.</p>

                    <p className="text-xs opacity-90 mt-3 w-60 leading-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        blandit feugiat viverra.
                    </p>
                </div>
            </div>

            {/* ─────────────── ICÔNES + COPYRIGHT — DÉPLACÉ EN BAS */}
            <div className="flex flex-col items-center mt-10 md:mt-1 mb-6">

                {/* ICONES */}
                {/*<div className="flex space-x-3">*/}
                {/*    {[Tele, Face, What, Insta].map((icon, i) => (*/}
                {/*        <img*/}
                {/*            key={i}*/}
                {/*            src={icon.src}*/}
                {/*            className="*/}
                {/*                h-7 w-7 opacity-80*/}
                {/*                transition duration-300*/}
                {/*                hover:opacity-100 hover:scale-110*/}
                {/*            "*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</div>*/}

                {/* COPYRIGHT */}
                <p className="text-[13px] mt-6 text-center">
                    © Copyright 2025 Sky Technologies. All Rights Reserved.
                </p>
            </div>

        </div>
    );
}

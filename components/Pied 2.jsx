import Link from "next/link"
import Image from "next/image"
import ImageSrc from "../public/media/logo.png"
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Barre() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ;
    const [reclamation, setReclamation] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const router = useRouter();
    const [ IscompteExisting, setIsCompteExisting] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        let cleanedAddress = value.replace(/[^\w\s]/gi, '');
        cleanedAddress = cleanedAddress.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
        setReclamation(cleanedAddress);
    };

    const handleSubmit = async (data) => {
        // data = { content, date, heure, userName, userId }
        try {
            await axios.post(`${apiUrl}/sendNotifications`, data);
            // Message de succès
            setFeedbackMessage("✅ Réclamation envoyée avec succès !");
            setReclamation(""); // reset textarea

            // Optionnel : faire disparaître le message après 5s
            setTimeout(() => setFeedbackMessage(""), 5000);
        } catch (error) {
            console.error(error);
            setFeedbackMessage("❌ Erreur lors de l'envoi de la réclamation");
            setTimeout(() => setFeedbackMessage(""), 5000);
        }
    };
    const handleSend = () => {
        if (!reclamation.trim()) return; // si vide, ne fait rien

        const now = new Date();
        const date = now.toLocaleDateString(); // ex: 09/01/2026
        const heur = now.toLocaleTimeString(); // ex: 15:30:45
       // contenu,dat,userName,userId
        handleSubmit({
            contenu: reclamation ,
         dat:   date,
            heur,
              userName,
             userId
        });
    };



    useEffect(() => {
        const authUser = JSON.parse(localStorage.getItem("authUser"));
        if (authUser) {
            setIsCompteExisting(true);
            setUserId(authUser.userId || null);
            setUserName(authUser.username || "");
        } else {
            setIsCompteExisting(false);
            setUserId(null);
            setUserName("");
        }
    }, []);


    return (
        <div
            className="relative bg-cover bg-center bg-no-repeat text-white py-10 px-10"
            style={{ backgroundImage: "url('/media/A-548.jpg')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            {/* Contenu */}
            <div className="relative z-20 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Logo + Description */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <img
                        src={ImageSrc.src}
                        className="h-36 w-auto -mb-12 object-contain"
                    />
                    <h1 className="text-2xl font-bold tracking-wide">C BLIND</h1>
                    <p className="text-sm opacity-90 mt-2 max-w-[180px]">
                        L'avenir est entre vos mains
                    </p>
                </div>

                {/* Menu */}
                <div>
                    <h1 className="font-black text-lg mb-6 cursor-default">Menu</h1>

                    <div className="flex flex-col text-sm space-y-3">
                        {[
                            { name: "Home", link: "/home" },
                            { name: "Catalogue", link: "/home/list" },
                            { name: "Service", link: "/home/Service" },
                        ].map((item, i) => (
                            <p
                                key={i}
                                onClick={() => router.push(item.link)}
                                className="
                                    cursor-pointer w-fit relative font-light
                                    after:absolute after:left-0 after:bottom-0 after:h-[1px]
                                    after:w-0 after:bg-white after:transition-all after:duration-300
                                    hover:after:w-full hover:text-white
                                "
                            >
                                {item.name}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Contact + Réclamation */}
                <div className="md:col-span-2">
                    <h1 className="font-black text-lg mb-6 cursor-default">Contact</h1>

                    <p className="text-sm opacity-90">
                        Lorem ipsum dolor sit amet.
                    </p>

                    <p className="text-sm opacity-90 mt-3 leading-6 max-w-[280px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        blandit feugiat viverra.
                    </p>

                    {/* Champ Réclamation */}
                    <div className="mt-6">
                        <label className="text-sm font-medium opacity-90">
                            Réclamation
                        </label>

                        <div className="relative mt-2">
        <textarea
            value={reclamation}
          //  onChange={(e) => handleChange(e.target.value)}
            onChange={(e) => handleChange(e)}
            placeholder="Écrivez votre réclamation ici..."
            className="
                w-full h-12 pr-14
                bg-white/10 border border-white/20
                rounded-lg p-3 text-sm text-white
                placeholder-white/60
                focus:outline-none focus:border-white
                resize-none
            "
            rows={4}
        />

                            {/* Bouton à droite */}
                            <button
                                type="button"
                                className="
    absolute right-2 top-1/2 -translate-y-1/2
    h-9 w-9 rounded-full
    bg-white/20 hover:bg-white/30
    flex items-center justify-center
    transition transform cursor-pointer
    hover:scale-105
"
                                onClick={handleSend}
                                title="Envoyer la réclamation"
                            >
                                ➤
                            </button>
                            {/* Message de feedback */}
                            {feedbackMessage && (
                                <p className="mt-2 text-sm text-green-400 font-medium">{feedbackMessage}</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <div className="relative z-20 flex flex-col items-center mt-12">
                <p className="text-xs opacity-80 text-center">
                    © Copyright 2025 Sky Technologies. All Rights Reserved.
                </p>
            </div>
        </div>
    );
}

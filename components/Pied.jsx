import Link from "next/link"
// import whar from '../public/media/icons/whatsapp_127px.png'
// import inst from'../public/media/icons/instagram_127px.png'
// import fb from '../public/media/icons/Facebook_127px.png'
// import  affiche from '../public/media/MOSALA CG LOGO FOND 2024.png'
// import  Qr from '../public/media/MOSALA CG QR.jpg'

// import  mail from "../public/media/icons/youtube_play_filled_127px.png"

import {usePathname, useRouter} from 'next/navigation'
import Image from "next/image";

export default function Barre() {
   const router = useRouter();

   return (
       <>
          <div className="relative h-full w-full z-30 flex flex-col items-center justify-between bg-black/60 py-4">
             {/* LIGNE PRINCIPALE */}
             <div className="w-full max-w-7xl flex flex-row items-center justify-between px-6 gap-4">

                {/* Image affichée à gauche */}
                <div className="hidden lg:flex w-[15%] justify-center items-center">
                   <img
                       src={affiche.src}
                       alt="Affiche"
                       className="w-full h-auto object-contain"
                   />
                </div>

                {/* Icônes centrées */}
                <div className="flex-1 flex flex-row justify-center items-center gap-12  z-30">
                   <img src={whar.src} alt="WhatsApp" className="h-6 w-6 md:h-10 md:w-10"/>
                   <a href="https://www.instagram.com/festival_dimages_dafrique">
                      <img src={inst.src} alt="Instagram" className="h-6 w-6 md:h-10 md:w-10"/>
                   </a>
                   <img src={mail.src} alt="Mail" className="h-6 w-6 md:h-10 md:w-10"/>
                   <a href="https://www.facebook.com/festimbrazza?mibextid=ZbWKwL">
                      <img src={fb.src} alt="Facebook" className="h-6 w-6 md:h-10 md:w-10"/>
                   </a>

                </div>

                {/* QR Code à droite */}
                <div className="hidden lg:flex w-[8%] justify-center items-center">
                   <img
                       src={Qr.src}
                       alt="QR"
                       className="w-full h-auto object-contain"
                   />
                </div>
             </div>

             {/* COPYRIGHT */}
             <div className="w-full text-center mt-3">
                <h1 className="text-sm font-semibold text-white font-[Poppins]">
                   <Link href="/admin">© 2025 MOSALA CG. All Rights Reserved.</Link>
                </h1>
             </div>
          </div>

       </>


   )
}
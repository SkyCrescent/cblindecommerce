//import logo2 from "@/public/media/MOSALA CG LOGO FOND 2024.png";
import Link from "next/link";
import house from "@/public/media/icons/gender_neutral_user_filled_127px.png";

import Theshop from "../public/media/icons/shopping_cart_127px.png"
import {useRouter} from "next/navigation";

export default function NavBar(){

    const router = useRouter();

    return(
        <nav
            className="relative w-[100%] md:w-full h-[8%] md:h-[10%] lg:h-[16%] flex items-center    justify-evenly    text-sm    ">
            <div
                className="hidden  relative w-[30%] md:w-[10%]  lg:w-[50%] h-[100%] lg:flex  md:mx-12 lg:-mx-4">
                <div className="relative h-[100%] bg-green-900  top-0 w-[4%] md:w-[8%] lg:w-[6%] ">

                </div>
                <div
                    className="relative h-[100%]   mx-8 md:mx-6 lg:mx-0  -top-6 md:-top-0 lg:top-0 lg:p-0.5 w-[50%] md:w-[800%] lg:w-[50%] ">
                    <img
                        src={logo2.src}
                        alt={`Logo `}
                        width="510"
                        height="540"
                        className=" object-center  relative w-24 h-24  "
                    />
                </div>

            </div>

            <div
                className=" relative w-[60%] mx-auto  md:w-[100%] lg:w-[50%] flex flex-col font-normal md:font-medium font-[Poppins]   md:mx-1  ">
                <div className="hidden md:block">
                    <ul
                        className="   lg:px-1 m-8 md:m-3 lg:m-1 flex justify-between items-center text-[rgb(170,102,199)] flex-row gap-6 md:gap-6 lg:gap-2">
                        <li className="hover:text-blue-500 " id="barAnime"><Link href="#"> Acceuil</Link></li>
                        <li className="hover:text-blue-500 " id="barAnime"><Link href="/presentation/festim">Nos
                            catalogues
                        </Link></li>
                        {/* Icônes */}
                        <li className="hover:text-blue-500 cursor-pointer">
                            <img
                                src={Theshop.src}
                                alt={`Logo `}
                                width="28"
                                height="28"
                                className=" object-center   "
                                onClick={() => {
                                    router.push(`#`);
                                }}
                            />
                        </li>
                        <li className="hover:text-blue-500 cursor-pointer flex items-center gap-1">
                            <img
                                src={house.src}
                                alt="Logo"
                                width="28"
                                height="28"
                                className="object-center"
                                onClick={() => {
                                    router.push(`#`);
                                }}
                            />
                            <div className="text-xs">Se connecter</div>
                        </li>


                        {/* Bouton */}
                        <li>
                            <button
                                className="bg-[rgb(170,102,199)]  text-white px-5 py-3  rounded-3xl hover:bg-purple-900 transition duration-300 transform hover:scale-105"
                            onClick={()=>{
                                router.push(`/addCompte`);
                            }}
                            >

                                Créer un compte
                            </button>
                        </li>


                    </ul>
                </div>
                <div
                    className=" md:hidden   relative h-24 w-[100%] mx-auto  flex justify-between items-center text-blue-900 flex-row gap-6">
                    <img
                        src={house.src}
                        alt={`Logo `}
                        width="28"
                        height="28"
                        className=" object-center   "
                        onClick={() => {
                            router.push(`#`);
                        }}
                    />



                </div>

            </div>

        </nav>

    )
}
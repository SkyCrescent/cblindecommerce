"use client";

import { useRouter } from "next/navigation";
import Barre from "@/components/Barre";
import Pied2 from "@/components/Pied 2";

export default function CataloguesPage() {
    const router = useRouter();

    // --- Exemples de catalogues ---
    const catalogues = [
        {
            id: 1,
            title: "Électronique & Gadgets",
            description: "Téléphones, écouteurs, accessoires et innovations high-tech.",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        },
        {
            id: 2,
            title: "Maison & Cuisine",
            description: "Matériel de cuisine, décorations, ustensiles et rangements.",
            image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
        },
        {
            id: 3,
            title: "Beauté & Soin",
            description: "Produits de beauté, parfums, maquillage et soins corporels.",
            image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
        },
        {
            id: 4,
            title: "Mode & Vêtements",
            description: "T-shirts, jeans, chaussures, accessoires de mode.",
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
        },
    ];

    return (
        <div className="relative min-h-screen bg-white ">
            <div className="absolute h-full inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10"/>

            {/* Navbar visible en haut */}
            <div className="relative z-30">
                <Barre/>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-30 mb-6 px-6 h-[576px]">
                {catalogues.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => router.push(`/home/list/${item.id}`)}
                        className="
                group bg-white rounded-xl shadow-md overflow-hidden cursor-pointer
                transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeIn
            "
                    >
                        {/* IMAGE */}
                        <div className="h-[100%] w-full overflow-hidden relative">
                            <img
                                src={item.image}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />

                            {/* 🔥 OVERLAY HOVER */}
                            <div
                                className="
                        absolute inset-0 bg-black/50 flex flex-col justify-center items-center gap-2
                        opacity-0 group-hover:opacity-100 transition-all duration-300
                    "
                            >
                                <h2 className="text-white text-xl font-semibold">{item.title}</h2>
                                <p className="text-white text-sm p-1 text-center">{item.description}</p>
                                <p className="text-sky-300 text-sm p-1 text-center">Cliquez pour voir le catalogue</p>

                        {/*        <button*/}
                        {/*            className="*/}
                        {/*    mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg*/}
                        {/*    font-medium hover:bg-blue-700 transition*/}
                        {/*"*/}
                        {/*        >*/}
                        {/*            Voir le catalogue*/}
                        {/*        </button>*/}
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <br></br>
            <div
                className="relative  h-auto  z-30">

                <Pied2/>
            </div>
        </div>
    );
}

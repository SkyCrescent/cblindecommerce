"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Barre from "@/components/Barre";
import f from "../../../../public/media/icons/search_filled_127px.png"
import Pied2 from "@/components/Pied 2";
export default function CatalogueDetail() {
    const { id } = useParams();
    const [isSubmit,SetIsSubmit] = useState(false)
    const router = useRouter();
    const [values, setValues] = useState({
        username: "",
        password: "",
        date:""
    });
    const input = [
        { id: 1, name: "username", type: "text", placeholder: "Nom",value: values.username   ,label: "Entrez votre le nom du produits", className: `text-xl w-[90%] text-gray-700 bg-white/75 border rounded-lg border-gray-300 py-2 px-10 h-14 focus:outline-none focus:border-blue-500 `,
            img:f.src,
        }
    ]
    const [focus , SetFocus] = useState(false)
    const [catalogue, setCatalogue] = useState(null);
    const [products, setProducts] = useState([]);

    // --- Catalogues + produits (exemples) ---
    const cataloguesData = [
        {
            id: "1",
            title: "Électronique & Gadgets",
            description: "Tous nos appareils, smartphones, écouteurs et accessoires tech.",
            cover: "https://images.unsplash.com/photo-1510552776732-03e61cf4b144",
            products: [
                { id: 2, name: "iPhone 14 Pro", price: 1200, stock: 12, img: "https://images.unsplash.com/photo-1672588624781-c403c3c2fd09" },
                { id: 102, name: "Écouteurs Bluetooth", price: 45, stock: 32, img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad" },
                { id: 103, name: "Montre connectée", price: 79, stock: 8, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
            ]
        },
        {
            id: "2",
            title: "Maison & Cuisine",
            description: "Ustensiles, décorations, matériel de cuisine et gadgets ménagers.",
            cover: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
            products: [
                { id: 201, name: "Mixeur Professionnel", price: 89, stock: 6, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0" },
                { id: 202, name: "Assiettes en céramique (x6)", price: 30, stock: 18, img: "https://images.unsplash.com/photo-1556911220-bff31c812dba" },
                { id: 203, name: "Lampadaire LED", price: 55, stock: 11, img: "https://images.unsplash.com/photo-1598300053650-e4c5a1f3a52e" },
            ]
        },
        {
            id: "3",
            title: "Beauté & Soin",
            description: "Découvrez nos produits de beauté et soins du corps.",
            cover: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
            products: [
                { id: 301, name: "Parfum Homme", price: 70, stock: 9, img: "https://images.unsplash.com/photo-1600185365483-26d7a1c3b9db" },
                { id: 302, name: "Crème visage", price: 25, stock: 15, img: "https://images.unsplash.com/photo-1590468301207-7d7d5cb75d63" },
                { id: 303, name: "Palette maquillage", price: 40, stock: 21, img: "https://images.unsplash.com/photo-1512499617640-c2f999098c01" },
            ]
        }
    ];

    // Charger le catalogue selon l’ID
    useEffect(() => {
        const cat = cataloguesData.find(c => c.id === id);
        if (cat) {
            setCatalogue(cat);
            setProducts(cat.products);
        }
    }, [id]);

    if (!catalogue) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-gray-500 text-xl">
                Catalogue introuvable ❌
            </div>
        );
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Expression régulière pour lettres avec accents et chiffres
        const regex = /^[\p{L}\p{N}\s'-]*$/u;

        // Teste si la nouvelle valeur est autorisée
        if (regex.test(value)) {
            setValues({ ...values, [name]: value });
            console.log(values);
        }
    };

    const colors = [
        "bg-red-500/60",
        "bg-blue-500/60",
        "bg-purple-500/60",
        "bg-green-500/60",
        "bg-pink-500/60",
        "bg-orange-500/60",
        "bg-teal-500/60"
    ];

    return (
        <div className="relative min-h-screen bg-white ">
            <div className="absolute h-full inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10"/>

            {/* Navbar visible en haut */}
            <div className="relative z-30">
                <Barre/>
            </div>
            {/* Image de couverture */}
            <div className="max-w-6xl mx-auto mt-12 flex flex-col md:flex-row items-center gap-10">

                {/* --- COLONNE GAUCHE (texte + input) --- */}
                <div className="w-full md:w-1/2 font-[Segoe UI] leading-snug relative z-30">

                    <h6 className="text-blue-600 text-lg font-semibold tracking-wide mb-3">
                        CATALOGUE :
                    </h6>

                    <h1 className="text-4xl font-extrabold leading-tight text-gray-900">
                        {catalogue.title}
                    </h1>

                    <p className="text-gray-700 text-lg mt-3">
                        {catalogue.description}
                    </p>

                    {/* Animation */}
                    <div className="text-sm py-6 font-bold text-blue-700 animate-pulse">
                        Explorez les produits disponibles ↓
                    </div>

                    {/* -- INPUT STYLE C-BLIND -- */}
                    <div className="relative w-[110%] mt-1 -ml-2">
                        {/* ton code input ici */}
                        {input.map((inputs) => (
                            <div
                                className="rounded-md h-20 w-full  mx-auto flex flex-col items-center justify-center"
                                key={inputs.id}>
                                <div className="absolute w-full  ">
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
                                    {inputs.img ? (
                                        <img src={inputs.img} alt=""
                                             className="absolute right-20 top-[26%] cursor-pointer   transition duration-300 transform hover:scale-125"
                                             width={30}
                                             height={30} onClick={() => showChar(inputs.id)}/>
                                    ) : null}
                                    <span
                                        className={(focus || values.username) ? "absolute left-3 p-1  w-auto top-7 text-xs font-bold text-blue-900 -translate-y-12 duration-300" : "absolute tracking-wide  pointer-events-none duration-300 left-0 top-[17px] px-10 text-sky-900"}>
                    {inputs.label}
                          </span>


                                </div>
                                <div>
                                    {/*{ Errors[inputs.name]  ? (<> <div className="text-[75%] text-red-600"> {inputs.error} </div> </> ): null  }*/}
                                    {isSubmit && inputs.error ? (
                                        <div className=" text-[70%] text-red-600">{inputs.error}</div>
                                    ) : null}
                                </div>


                            </div>

                        ))}

                    </div>
                </div>

                {/* --- COLONNE DROITE (image) --- */}
                <div className="w-full md:w-1/2 relative">

                    <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={catalogue.cover}
                            className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
                        />
                    </div>

                </div>

            </div>


            {/* Liste des produits */}
            <div className="relative w-full py-6 p-6 z-30 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((item) => {
                        const overlayColor = colors[Math.floor(Math.random() * colors.length)];

                        return (
                            <div
                                key={item.id}
                                className="
                group bg-transparent rounded-xl shadow-lg overflow-hidden cursor-pointer
                transform transition-all duration-300 hover:scale-105 hover:shadow-xl
            "
                            >
                                {/* IMAGE */}
                                <div className="h-48 w-full overflow-hidden relative">
                                    <img
                                        src={item.img}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                    />

                                    {/* OVERLAY FIXE */}
                                    <div
                                        className={`
                        absolute inset-0 flex flex-col justify-center items-center gap-2
                        opacity-0 group-hover:opacity-100 transition-all duration-300
                        ${overlayColor}
                    `}
                                    >
                                        <p className="text-white text-lg font-bold">{item.price} €</p>
                                        <p className="text-white text-sm">
                                            {item.stock > 0 ? `${item.stock} en stock` : "Rupture de stock"}
                                        </p>

                                        <button
                                            onClick={() => router.push(`../infos/${item.id}`)}
                                            className="
                            mt-2 bg-white text-black px-4 py-2 rounded-lg
                            font-medium hover:bg-gray-200 hover:scale-105 transition
                        "
                                        >
                                            Commander
                                        </button>
                                    </div>
                                </div>

                                {/* INFOS */}
                                <div className="p-4 bg-white">
                                    <h3 className="text-sm md:text-base text-gray-800 font-medium">{item.name}</h3>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>

            <br></br>
            <div
                className="relative  h-auto mt-6 z-30">

                <Pied2/>
            </div>
        </div>
    );
}

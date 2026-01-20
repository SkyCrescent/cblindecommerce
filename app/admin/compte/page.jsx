
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import NavBar from "../../../components/NavBar";
import axios from "axios";

export default function AdminCatalogue() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ;
    const router = useRouter();
    const [catalogue, setcatalogue] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setselectedItems] = useState("");
    const [dialog, setDialog] = useState(false);
    const [focus , SetFocus] = useState(false)
    const [isSubmit,SetIsSubmit] = useState(false)
    const [values, setValues] = useState({
        username: "",
    });
    const input = [
        { id: 1, name: "username", type: "text", placeholder: "Nom",value: values.username   ,label: "Entrez votre le nom du compte", className: `text-xl w-[90%] text-gray-700 bg-white/75 border rounded-lg border-gray-300 py-2 px-10 h-14 focus:outline-none focus:border-blue-500 `,
            img: `../../../public/media/icons/search_filled_127px.png`,
        }
    ]
    const [items, setItems] = useState([
        { id: 1, nom: "Ordinateurs de bureaux", photo: "media/img/burautique.jpg", prix: 250, stock: 15 },
        { id: 2, nom: "Articles automobiles", photo: "media/img/auto.png", prix: 80, stock: 32 },
        { id: 3, nom: "Chaussures hommes", photo: "media/img/chaussure-cuir-homme-bout-fleuri.jpg", prix: 45, stock: 21 },
        { id: 4, nom: "Ordinateurs de bureaux", photo: "media/img/burautique.jpg", prix: 250, stock: 15 },
        { id: 5, nom: "Articles automobiles", photo: "media/img/auto.png", prix: 80, stock: 32 },
        { id: 6, nom: "Chaussures hommes", photo: "media/img/chaussure-cuir-homme-bout-fleuri.jpg", prix: 45, stock: 21 },


    ]);


//createNewCompte//getAllCompte//updateCompte//deleteCompte//getInfosCompte


    const getData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/getAllCompte`);
            console.log(response.data.data )
            if (response.data.data  && response.data.data.length > 0) {
                // Vérifiez que la réponse contient les données attendues
                console.log("la jointure",response.data)
                setcatalogue(response.data.data)

            } else {
                console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response.data);
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
        }
    };



    const supprimerProduit = async (id) => {

        try {

            const response = await axios.post(`${apiUrl}/DeleteCatalogue`, {id});
            // on suppose backend renvoie { catalogue: [...], infosCatalogue: [...] }
            console.log(response)
            await getData();
        } catch (error) {
            console.error("Erreur récupération infos :", error);
            // Setinfosfoods([])
        }

        setDialog(false)

    };

    const modifierProduit = (id) => {
        router.push(`/admin/compte/updatecatalogue?id=${encodeURIComponent(btoa(id))}`);
    };

    const ajouterProduit = () => {
        router.push("/admin/compte/new");
    };

    useEffect(()=>{
        getData();
    })

    return (
        <div className="relative min-h-screen bg-white p-6">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10"/>

            <div className="relative z-30">
                <NavBar/>
            </div>


            <div className="relative z-20 flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-blue-700">Gestion de compte  </h1>


                <div className="relative w-[50%] mt-1 -ml-2">
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
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    value={searchTerm}
                                />

                                {/*{inputs.img ? (*/}
                                {/*    <img src={inputs.img} alt=""*/}
                                {/*         className="absolute right-16 top-[26%] cursor-pointer   transition duration-300 transform hover:scale-125"*/}
                                {/*         width={30}*/}
                                {/*         height={30}*/}
                                {/*        //onClick={() => showChar(inputs.edit)}*/}
                                {/*    />*/}
                                {/*) : null}*/}
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


                <button
                    onClick={ajouterProduit}
                    className="bg-green-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transition"
                >
                    Nouveau Compte
                </button>
            </div>

            <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                {catalogue .filter((p) =>
                    p.nom.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((item) => (
                    <div
                        key={item.id}
                        className="relative group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                    >
                        {/* IMAGE */}
                        <div className="w-full h-48 relative overflow-hidden rounded-t-xl">
                            <img
                                src={`/${item.photo}`} // Assurez-vous que item.Photo = "media/foods/xxx.jpg"
                                alt={item.nom}
                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* CONTENU DE BASE */}
                        <div className="p-4">
                            <h2 className="font-semibold text-gray-800 text-lg truncate">{item.nom}</h2>
                            <p className="text-sm text-gray-500 truncate">Partenaires : {item.partenaires}</p>
                        </div>

                        {/* OVERLAY AU HOVER */}
                        <div
                            className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button
                                onClick={(e) => {
                                  //  e.stopPropagation();
                                    modifierProduit(item.id);
                                }}
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition transform duration-300"
                            >
                                Modifier
                            </button>

                            <button
                                onClick={(e) => {
                                    setselectedItems(item.id);
                                    setDialog(true)
                                }}
                                className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 hover:scale-105 transition transform duration-300"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>





            {dialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[350px] text-center">
                        <h2 className={`text-lg font-semibold mb-3 text-red-600` }>
                            En attente de validation
                        </h2>

                        <p className="text-gray-700 mb-4">Voulez vous supprimer ce compte  ??</p>


                        <div className=" relative flex justify-between " >
                            <button
                                onClick={
                                    () => {
                                        supprimerProduit(selectedItems)
                                    }
                                }
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition duration-300 transform cursor-pointer w-32"
                            >
                                OK
                            </button>
                            <button
                                onClick={
                                    () => {
                                        setDialog( false);
                                        //    router.back();
                                    }
                                }
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 hover:scale-105 transition duration-300 transform cursor-pointer w-32"
                            >
                                Non
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

"use client";

import React, { useState } from "react";

export default function AdminLogin() {
    const [focus, SetFocus] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const [values, setValues] = useState({
        nom: "",
        prenom: "",
    });

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

    // tes champs sous forme d'array
    const input = [
        {
            id: 1,
            name: "nom",
            label: "Nom",
            type: "text",
            value: values.nom,
            error: "Veuillez entrer votre nom",
            className:
                "border border-gray-300 rounded-lg h-12 w-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-600",
        },
        {
            id: 2,
            name: "prenom",
            label: "Prénom",
            type: "text",
            value: values.prenom,
            error: "Veuillez entrer votre prénom",
            className:
                "border border-gray-300 rounded-lg h-12 w-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-600",
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);

        if (values.nom === "" || values.prenom === "") return;

        console.log("Admin connecté :", values);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10"/>

            <div className="relative z-20  w-[45%] bg-white shadow-2xl rounded-md p-8 space-y-8">

                {/* TITRE */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Connexion Admin</h1>
                    <p className="text-gray-500 text-sm mt-2">
                        Accédez à l’espace d’administration pour gérer les produits et commandes.
                    </p>
                </div>

                {/* FORMULAIRE */}
                <div onSubmit={handleSubmit} className="space-y-8">
                    <div className="relative w-[100%]  space-y-6">
                        {input.map((inputs) => (
                            <div
                                className="relative rounded-md h-20 w-[80%]  mx-auto flex flex-col items-center justify-center"
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
                                             className="absolute right-16 top-[26%] cursor-pointer   transition duration-300 transform hover:scale-125"
                                             width={30}
                                             height={30} onClick={() => showChar(inputs.id)}/>
                                    ) : null}
                                    <span
                                        className={(focus || input.value) ? "absolute left-3 p-1  w-auto top-7 text-xs font-bold text-blue-900 -translate-y-12 duration-300" : "absolute tracking-wide  pointer-events-none duration-300 left-0 top-2 px-10 text-sky-900"}>
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

                    {/* BOUTON */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Se connecter
                    </button>
                </div>

            </div>

        </div>

    );
}

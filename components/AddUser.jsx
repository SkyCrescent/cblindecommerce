"use client"
import {useState} from "react";

export default function AddUser(){
    const [imposeMail ,setimposeMail] = useState(false);
    const [isSubmit,SetIsSubmit] = useState(false)
    const [Focus ,SetFocus ] = useState(false)
    const [values, setValues] = useState({
        nom: "",
        prenom:"",
        phone:"",
        password:"",
    });
    const [icon, setIcon] = useState({
        4: "blind",
        5: "blind"
    });
    const [Errors,SetErrors] = useState({})

    const input2 = [
        { id: 4, name: "password",type: icon[4] === "blind" ? "password" : "text",value: values.password  , placeholder: "password", label: "Entrez le mot de Passe", className: "text-large relative w-[100%] text-gray-700 border rounded-[10px] border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500",
            error:values.password ?  /[^\w\d]+/.test(values.password) ? 'Ce champ ne doit pas contenir de caractères spéciaux' :  values.password !== filteredData ? 'Mot de Passe Incorrect' :null :'Saisissez votre Mot de Passe ', img: `/media/icons/${icon[4] || "blind"}.png` }
    ]
    const showChar = (id) => {
        setIcon(prevState => ({
            ...prevState,
            [id]: prevState[id] === "blind" ? "Eye" : "blind",

        }));
    };
    const input1 = [
        {
            id: 1,
            name: "nom",
            type: "text",
            placeholder: "Nom",
            value: values.nom,
            label: "Votre Nom ",

            className:
                "text-large relative w-[55%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-14 focus:outline-none focus:border-blue-500",

            error: values.nom === "" ? 'Veuillez indiquer le nom de votre école' : null
        },
        {
            id: 2,
            name: "prenom",
            type: "text",
            placeholder: "Prenom ",
            value: values.prenom,
            label: "Votre Prenom",
            className:
                "text-large relative w-[40%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-14 focus:outline-none focus:border-blue-500",

            error: values.prenom === "" ? 'Veuillez indiquer l\'adresse de votre école' : null
        },
        {
            id: 3,
            name: "phone",
            value: values.phone,
            type: "text",
            placeholder: "Contact",
            label: "Vos contact",
            className:
                "text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-16 focus:outline-none focus:border-blue-500",

            error: values.phone === "" ? 'Veuillez renseigner votre numéro de téléphone' : null
        }

    ];
    const handleSummit = () => {
        SetIsSubmit(true);
        const valuesNotEmpty = Object.values(values).every(value => value !== "");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ ;
        //verification de la presence de @ et dun nom de domainde valide
        //   if (values.email &&  !values.email.includes("@")) {
        if (values.email && ! emailRegex.test(values.email)){
            setimposeMail(true)

            console.log("Veuillez .");
        } else if (valuesNotEmpty) {
            setimposeMail(false)

        } else {
            setimposeMail(false)
            console.log("Veuillez remplir tous les champs avant de soumettre le formulaire.");
        }
    };


    return(
        <>

            <div className="relative bg-white w-full max-w-2xl h-fit rounded-xl shadow-lg py-10 px-6 z-50 ml-auto mr-4">
                {/* FORMULAIRE */}
                <div className="flex flex-row  gap-1 w-full">


                    {input1.slice(0,2).map((item) => (
                        <div key={item.id} className="relative w-full h-20">
                            <input
                                name={item.name}
                                onFocus={() => SetFocus(true)}
                                onBlur={() => SetFocus(false)}
                                onChange={(e) => handleChange(e)}
                                value={item.value}
                                type={item.type}
                                className={
                                    isSubmit && item.error
                                        ? "text-sm md:text-base w-full px-2 py-4 border border-red-500 rounded-md bg-transparent text-black focus:outline-none focus:border-sky-500"
                                        : item.className
                                }
                            />
                            <label
                                className={
                                    (Focus || values[item.name])
                                        ? "absolute left-3 top-0 text-xs text-green-800 transform -translate-y-3 bg-white px-1 transition-all"
                                        : "absolute left-4 top-2 text-sm text-gray-500 transition-all"
                                }
                            >
                                {item.label}
                            </label>
                        </div>
                    ))}
                </div>

                {/* BOUTON */}
                <div className="w-full flex justify-center mt-8">
                    <button
                        onClick={handleSummit}
                        className="w-full md:w-4/5 lg:w-3/4 h-12 bg-sky-700 hover:bg-green-800 text-white rounded-md transition duration-300 transform hover:scale-105"
                    >
                        Confirmer ma réservation
                    </button>
                </div>
            </div>


        </>
    )
}
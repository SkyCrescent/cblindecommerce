"use client";

import React, {useEffect, useState} from "react";
import {useParams, usePathname, useRouter, useSearchParams} from "next/navigation";
import NavBar from "../../../../components/NavBar";
import Image from "next/image";
import axios from "axios";

export default function Page() {
   // const { id } = useParams();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ;
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);
    const [values, setValues] = useState({
        nom: "",
        details: "",
        photo: "",
    });
    const [infosCatalogue, setCatalogue] = useState(null);
    const [loading, setLoading] = useState(true);
    let selectedFile1 = "";
    const [errors, setErrors] = useState({});
    const [focus, setFocus] = useState(false);
    const [preview, setPreview] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    let url1 ="";
    const [dialog, setDialog] = useState({
        open: false,
        message: "",
        type: "" // "error" ou "success"
    });
    const inputFields = [
        { id: 1, name: "nom", type: "text", label: "Nom de la catalogue", value: values.nom }
      //  { edit: 2, name: "details", type: "text", label: "Description", value: values.details },
        // { edit: 3, name: "quantite", type: "text", label: "Quantité", value: values.quantite },
    ];


    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.get("id");
    //fonction pour rechercher data dans l'url
    let id = null;

    if (query) {
        id = atob(decodeURIComponent(query));
        //decryptage des data present dans l"URL
    }
    const dat = JSON.parse(id)
    console.log(dat);

    useEffect(() => {
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;


        if( name === "nom" || name === "details" ){
            let cleanedAddress = '';
            cleanedAddress = value.replace(/[^\w\s]/gi, '');
            // 3) Title Case : première lettre de chaque mot en majuscule
            cleanedAddress = cleanedAddress.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

            //  newValues.nom = cleanedAddress;
            //setValues(newValues);



            setValues({ ...values, [name]: cleanedAddress });
            console.log(values);
        }
    };

    const handlePhoto = async (event) => {
        const fileInput = event.target;
         selectedFile1 = fileInput.files[0];
        // const nomValue = nom
        console.log("LE sélectionné :",selectedFile1);
        if (selectedFile1) {
            //setFile(event.target.files[0]);
            // Vérifier si le fichier est une image en vérifiant l'extension
            const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
            const fileNameParts = selectedFile1.name.split(".");
            const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

            if (allowedExtensions.includes(fileExtension)) {
                // Si c'est une image, mettre à jour les valeurs avec le fichier sélectionné
                setSelectedFile(selectedFile1);
                // SetselectedImage(true);
                const url ='/pages/parteners'
                console.log("Fichier sélectionné :", selectedFile1);
                try {
                    const formData = new FormData();
                    formData.append('file',selectedFile1);
                    // Envoi de la requête POST avec Axios vers le serveur
                    const response = await axios.post(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log('File uploaded successfully:', response.data);
                    // Mise à jour de la valeur media avec le chemin du fichier

                    url1 =`/pages/parteners/${selectedFile1.name}`
                    console.log(url1)
                    //   setSelectedImage2(`./public/Users/${selectedFile1.name}`);
                    console.log(`media/foods/${selectedFile1.name}`)

                    setValues((prevValues) => ({
                        ...prevValues,
                        photo: `media/parteners/${selectedFile1.name}`,
                    }));

                    console.log(values)
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            } else {
                // Si ce n'est pas une image, ne rien faire
                console.log("Le fichier sélectionné n'est pas une image");
            }
        } else {
            // Si aucun fichier n'est sélectionné, réinitialiser les valeurs
            setSelectedFile(null);
            url1 =''
            //  SetselectedImage(false);
            setValues((prevValues) => ({
                ...prevValues,
                photo:"",
            }));
            console.log("Aucun fichier sélectionné");
        }
    };

    const handleSubmit = async () => {
        let newErrors = {};
        console.log(values)

        // Vérifications individuelles
        if (!values.nom.trim() ) {
            newErrors.nom = "Nom invalide";
        }

        if (!values.photo.trim()) {
            newErrors.photo = "Photo requis";
        }



        // S’il y a des erreurs = affichage du message + bordures rouges
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setDialog({
                open: true,
                message: "Veuillez remplir correctement tous les champs.",
                type: "error"
            });
            return;
        }

        // Sinon → pas d'erreurs
        setErrors({});

        try {

            const response = await axios.post(`${apiUrl}/updatePartenaires`, {
                id:id,
                nom: values.nom,
                photo: values.photo,
            });


           // console.log("✔ Produit ajouté :", response.data);

            setDialog({
                open: true,
                message: "Partenaires Modifie avec succès 🎉",
                type: "success"
            });

            // Reinitialisation du formulaire
            setValues({
                nom: "",
                details: "",
                photo: "",
            });
            setSelectedFile(null);

        } catch (error) {
            console.error("Erreur API:", error);

            setDialog({
                open: true,
                message: "Erreur lors de l'ajout du produit !",
                type: "error"
            });
        }
    };

    const getInfos = async (id) => {
        try {
            setLoading(true);
            const response = await axios.post(`${apiUrl}/getInfosPartenaires`, { id });
            // on suppose backend renvoie { catalogue: [...], infosCatalogue: [...] }
            setCatalogue(response.data.data)
            // console.log(response.data.data)

            setValues({
                ...values,
                nom:response.data.data[0].nom ,
                //details: response.data.data[0].details,
                photo: response.data.data[0].photo,
            });
            selectedFile1 = values.photo ;
            setSelectedFile(selectedFile1)
            setLoading(true);
        } catch (error) {
            console.error("Erreur récupération infos :", error);
           // setCatalogue([]);
            //setFilteredItems([]);
            setCatalogue(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) getInfos(id);
    }, [id]);





    return (
        <div className="min-h-screen  bg-gray-100 relative">
            {/* Dégradé derrière le formulaire */}
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-0"/>

            {/* Navbar */}
            <div className="relative z-30 w-[80%] mx-auto">
                <NavBar/>
            </div>

            {/* Formulaire centré */}
            <div className="relative z-30 w-[50%]  mx-auto mt-2 bg-white p-8 rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold text-blue-700 mb-8 text-center">
                    Modification du catalogue
                </h1>

                <div onSubmit={handleSubmit} className="space-y-6">
                    {/* Ligne avec photo à gauche et inputs à droite */}
                    <div
                        className="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-6 space-y-6 md:space-y-0">
                        {/* Photo */}
                        <div className="w-60 h-60 rounded-full overflow-hidden shadow-xl shadow-gray-400/60
                    ring-4 ring-white hover:scale-105 transition-all duration-300">
                            <label htmlFor="imageInput2" className="w-full h-full cursor-pointer">
                                <input
                                    type="file"
                                    id="imageInput2"
                                    accept=".jpg,.jpeg,.png"
                                    className="sr-only"
                                    onChange={handlePhoto}
                                />
                                {values.photo ? (
                                        <img
                                            src={`/${values.photo}`}
                                        alt="Image sélectionnée"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-gray-300 rounded-full
                                flex items-center justify-center">
                                        <Image src="/picture.png" alt="Placeholder" width={40} height={40}/>
                                    </div>
                                )}
                            </label>
                        </div>


                        {/* Inputs */}
                        <div className=" space-y-4 relative w-[60%]">
                            {inputFields.map((input) => (
                                <div key={input.id} className="relative w-full h-16">
                                    <input
                                        type={input.type}
                                        name={input.name}
                                        value={input.value}
                                        onChange={handleChange}
                                        onFocus={() => setFocus(true)}
                                        onBlur={() => setFocus(false)}
                                        className={`text-gray-700 bg-white/75 border rounded-lg py-3 px-4 w-full focus:outline-none
                                            ${errors[input.name] ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
                                        `}

                                    />
                                    <span
                                        className={
                                            focus || input.value
                                                ? "absolute left-3 top-0 text-xs text-blue-900 font-bold -translate-y-5 duration-300"
                                                : "absolute left-3 top-3 text-sky-900 text-sm duration-300 pointer-events-none"
                                        }
                                    >
                {input.label}
              </span>
                                </div>
                            ))}


                        </div>
                    </div>

                    {/* Bouton */}
                    <div className="relative flex justify-bettwen gap-4 w-[100%]">

                        <button
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 hover:scale-105 transition"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Modifier le catalogue
                        </button>
                        <button
                            className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 hover:scale-105 transition"
                            onClick={() => {
                                router.back();
                            }}
                        >
                            Annuler
                        </button>
                    </div>

                </div>


            </div>


            {dialog.open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[350px] text-center">
                        <h2 className={`text-lg font-semibold mb-3 
                ${dialog.type === "error" ? "text-red-600" : "text-green-600"}`}>
                            {dialog.type === "error" ? "Des informations sont manquant" : "Bienvenu a vous !!"}
                        </h2>

                        <p className="text-gray-700 mb-4">{dialog.message}</p>

                        <button
                            onClick={() => setDialog({...dialog, open: false})}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition duration-300 transform cursor-pointer w-32"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>

    );
}

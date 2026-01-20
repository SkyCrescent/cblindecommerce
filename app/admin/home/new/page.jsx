'use client'

import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../../../components/NavBar";
import axios from "axios";
import Image from "next/image";

export default function NouveauProduit() {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ;
    const [catalogue, setcatalogue] = useState([]);
    const [values, setValues] = useState({
        nom: "",
        prix: "",
        quantite: "",
        catalogue: "",
        photo: "",
    });
    let selectedFile1 = "";
    let url1 ="";
    const [focus, setFocus] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [dialog, setDialog] = useState({
        open: false,
        message: "",
        type: "" // "error" ou "success"
    });

    const inputFields = [
        { id: 1, name: "nom", type: "text", label: "Nom du produit", value: values.nom },
        { id: 2, name: "prix", type: "text", label: "Prix (USD)", value: values.prix },
        { id: 3, name: "quantite", type: "text", label: "Quantité", value: values.quantite },
    ];

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        let newValues = { ...values };

        if (name === "nom") {
            let cleanedAddress = value.replace(/[^\w\s]/gi, '');
            cleanedAddress = cleanedAddress.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
            newValues.nom = cleanedAddress;
        } else if (name === "prix" || name === "quantite") {
            const cleaned = value.replace(/\D/g, "");
            newValues[name] = cleaned;
        } else if (name === "photo") {
            if (files && files[0]) {
                newValues.photo = files[0];
                setSelectedFile(files[0]);
            }
        } else {
            newValues[name] = value;
        }

        setValues(newValues);
    };

    // const handlePhoto = async (event) => {
    //     const file = event.target.files[0];
    //     if (!file) return setSelectedFile(null);
    //
    //     const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    //     const ext = file.name.split(".").pop().toLowerCase();
    //
    //     if (!allowedExtensions.includes(ext)) {
    //         console.log("Fichier non autorisé");
    //         return;
    //     }
    //
    //     setSelectedFile(file);
    //     setValues(prev => ({ ...prev, photo: file }));
    // };
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
                const url ='/pages/api'
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

                    url1 =`/pages/api/${selectedFile1.name}`
                    console.log(url1)
                    //   setSelectedImage2(`./public/Users/${selectedFile1.name}`);
                    console.log(`media/foods/${selectedFile1.name}`)

                    setValues((prevValues) => ({
                        ...prevValues,
                        photo: `media/foods/${selectedFile1.name}`,
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


    const getData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/AllCatalogue`);
            if (response.data.data) setcatalogue(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSelectCatalogue = (e) => {
        const selectedValue = e.target.value;
        setValues({ ...values, catalogue: selectedValue });
        if (errors.catalogue && selectedValue) setErrors({ ...errors, catalogue: "" });
    };

    const handleSubmit = async () => {
        let newErrors = {};
        if (!values.nom.trim()) newErrors.nom = "Nom invalide";
        if (!values.prix.trim()) newErrors.prix = "Prix requis";
        if (!values.quantite.trim()) newErrors.quantite = "Quantité requise";
        if (!values.catalogue.trim()) newErrors.catalogue = "Catalogue requis";
        if (!values.photo) newErrors.photo = "Photo requise";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return setDialog({ open: true, message: "Veuillez remplir correctement tous les champs.", type: "error" });
        }

        try {
            await axios.post(`${apiUrl}/NewProduits`, values);
            setDialog({ open: true, message: "Produit ajouté avec succès 🎉", type: "success" });
            setValues({ nom: "", prix: "", quantite: "", catalogue: "", photo: "" });
            setSelectedFile(null);
        } catch (error) {
            setDialog({ open: true, message: "Erreur lors de l'ajout du produit !", type: "error" });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 relative">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-0"/>
            <div className="relative z-30 w-full md:w-[80%] mx-auto">
                <NavBar/>
            </div>

            {/* Formulaire */}
            <div className="relative z-30 w-full md:w-[50%] mx-auto mt-4 bg-white p-6 md:p-8 rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
                    Ajouter un nouveau produit
                </h1>

                <div className="space-y-6">
                    {/* Photo + Inputs */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Photo */}
                        <div className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden shadow-xl ring-4 ring-white hover:scale-105 transition-all duration-300 flex-shrink-0">
                            <label htmlFor="imageInput" className="w-full h-full cursor-pointer">
                                <input
                                    type="file"
                                    id="imageInput"
                                    accept=".jpg,.jpeg,.png"
                                    className="sr-only"
                                    onChange={handlePhoto}
                                />
                                {selectedFile ? (
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Image sélectionnée"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-gray-300 rounded-full flex items-center justify-center">
                                        <Image src="/picture.png" alt="Placeholder" width={60} height={60}/>
                                    </div>
                                )}
                            </label>
                        </div>

                        {/* Inputs */}
                        <div className="flex-1 space-y-4 w-full">
                            {inputFields.map((input) => (
                                <div key={input.id} className="relative w-full h-16">
                                    <input
                                        type={input.type}
                                        name={input.name}
                                        value={input.value}
                                        onFocus={() => setFocus(true)}
                                        onBlur={() => setFocus(false)}
                                        onChange={handleChange}
                                        className={`text-gray-700 bg-white/75 border rounded-lg py-3 px-4 w-full focus:outline-none
                                            ${errors[input.name] ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                                    />
                                    <span className={
                                        focus || input.value
                                            ? "absolute left-3 top-0 text-xs text-blue-900 font-bold -translate-y-5 duration-300"
                                            : "absolute left-3 top-3 text-sky-900 text-sm duration-300 pointer-events-none"
                                    }>{input.label}</span>
                                </div>
                            ))}

                            {/* Catalogue */}
                            <div className="relative w-full h-16">
                                <select
                                    value={values.catalogue}
                                    onChange={handleSelectCatalogue}
                                    className={`text-gray-700 bg-white/75 border rounded-lg py-3 px-4 w-full focus:outline-none
                                        ${errors.catalogue ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}>
                                    <option value="">Choisissez un catalogue</option>
                                    {catalogue.map(item => (
                                        <option key={item.id} value={item.id}>{item.nom}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Boutons */}
                    <div className="flex flex-col md:flex-row justify-between  w-[100%] ">
                        <button
                            onClick={handleSubmit}
                            className="relative w-full md:w-[40%] bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 hover:scale-105 transition"
                        >
                            Ajouter le produit
                        </button>
                        <button
                            onClick={() => router.back()}
                            className="relative w-full md:w-[40%] bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 hover:scale-105 transition"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </div>

            {/* Dialog */}
            {dialog.open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
                        <h2 className={`text-lg font-semibold mb-3 ${dialog.type === "error" ? "text-red-600" : "text-green-600"}`}>
                            {dialog.type === "error" ? "Des informations sont manquantes" : "Bienvenu a vous !!"}
                        </h2>
                        <p className="text-gray-700 mb-4">{dialog.message}</p>
                        <button
                            onClick={() => setDialog({...dialog, open: false})}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition w-32 mx-auto"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

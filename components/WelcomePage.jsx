'use client'
import React, {useEffect} from 'react';
import {useState} from "react";

//import Barre from "../components/Barre"
import Image from "next/image";

export default function WelcomePage(){
   const [openSubMenuId, setOpenSubMenuId] = useState(false);
   const apiUrl = process.env.NEXT_PUBLIC_API_URL ;
   const [openSubMenu, setOpenSubMenu] = useState(false);
   const [loading , SetLoading ] = useState(false)
   const [filteredData, setFilteredData] = useState([]); // Initialize with all dat
   const [number , SetNumber] = useState(0)
   const [move ,SetMove] = useState(false)
   const baseUrl = process.env.BASE_URL;
   const router = useRouter();
   useEffect(() => {
      const intervalId = setInterval(() => {
         SetMove(prevMove => !prevMove);
      }, 5000);

      return () => clearInterval(intervalId);
   }, []);

   useEffect(() => {

      const getData = async () => {
         try {
            // Remplacez l'URL par la bonne URL de votre API

            const response = await axios.get(`${apiUrl}/evenements/get_allEvent.php`);
            // const response = await axios.get(`${apiUrl}/evenements/get_allEvent.php`);

             console.log(response.data && response.data.recu && response.data.recu.length > 0)
            if (response.data && response.data.recu && response.data.recu.length > 0) {
               // Vérifiez que la réponse contient les données attendues
               console.log("la jointure",response.data.recu)
               setFilteredData(response.data.recu)
               SetNumber(response.data.recu.length)
               console.log(number)
               SetLoading(true)
            } else {
               console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
            }
         } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
         }
      };

      getData()

      //  console.log("ddd",MyId)
   }, []);


   function formatDate(apiDate) {
      // Séparer la date en année, mois et jour
      const [year, month, day] = apiDate.split('-').map(Number);

      // Utiliser new Date(year, monthIndex, day) pour construire une date
      const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      const monthName = months[month - 1]; // Les mois commencent à 0 dans Date

      // Formater la date selon le format souhaité
      const formattedDate = `${day} ${monthName} ${year}`;

      return formattedDate;
   }
   const GoToUpdate = async (id,nom,photo) => {
      const encryptedData = btoa(id);
      const encryptedData2 = btoa(nom);


      router.push(`seeEvents?utytrcd=${encodeURIComponent(encryptedData)}&utyy=${encodeURIComponent(encryptedData2)} `);

   }


   return(


      <>
         <div className="relative h-screen w-[100%] md:w-[100%] bg-transparent overflow-y-auto scrollbar-hidden   "
         >
            {/*md:overflow-y-auto  scrollbar-hidden*/}




            <div className=" ">
               <div className="relative w-[100%]  lg:w-[95%] h-auto   lg:flex lg:flex-row ">
                  <div className="relative w-[98%] mx-1 md:mx-8  md:w-[90%] lg:w-[40%] leading-4 ">


                     <div className="mt-10 ">
                        <h1
                           className="  text-2xl md:text-4xl font-black relative w-[100%] md:w-1/127  py-0 leading-tight  md:-my-6">Le
                           Festival d’Images
                           d’Afrique
                           <span
                              className="font-bold md:text-3xl text-green-900  shadow-black">(FESTIM AFRIQUE)</span>
                        </h1>
                        <div
                           className="bg-red-900 bg-cover    h-8 w-80 rounded-tr-full justify-center">

                           <h1 id="presentation"
                               className="text-xl md:text-sm py-2 px-2  text-white bg-clip-text  font-semibold my-9 leading-4 uppercase">
                              Mission </h1>
                        </div>
                        <div
                           className=" text-sm relative w-[100%] md:w-full md:py-6 leading-tight mt-2  text-justify font-[Poppins]">
                           <br></br>
                           <span
                              className="font-bold text-[14px] ">Promouvoir
                           les Métiers de la Diplomatie et l'Entrepreneuriat des
                           Jeunes en Afrique.</span> <br></br>
                           <br></br> <span className="font-black"> Forme juridique :</span> Association à caractère économique et
                           socio-culturel, d'utulité publique nationale et internationale, crée et enregistrée en
                           République du Congo sous le numéro <span
                           className="font-black">N°0398/22/MIDDL/DBZ/SG/DDAT/SR</span>. <br></br> <span
                           className="font-bold">Siege Social :</span> N° 10
                           rue Ngamboué Bilolo Arrondissement N° 09 DJIRI Brazzaville République du Congo.

                           <br></br>

                           <br></br>
                           Adresse de proximité Centre ville : Hôtel Olympic Palace Brazzaville.
                           <br></br>
                           <strong>E-mail</strong> : festimafrique@gmail.com
                           <br></br>
                          <strong>Téléphones</strong> : +242 06 440 08 81

                           {/*//Forme juridique : Organisation Non Gouvernementale (O.N.G) à caractère économique et socio-culturel,*/}

                        </div>
                     </div>
                  </div>
                  <div className="relative w-[100%] md:w-auto lg:w-[40%] h-96 md:bottom-20 lg:bottom-0 mx-auto p-3 md:p-0 md:mx-52 lg:mx-36 md:-top-4  lg:top-4 lg:left-40     ">
                     <img
                        className=" object-center "
                        src={logo.src}
                        height={500}
                        width={450}
                        alt="Nfc"
                     />
                  </div>
               </div>


            </div>


            <span
               className="absolute hidden lg:block  w-3 h-[830%] mx-[800px] rounded border border-l-0  border-t-0 border-b-0  border-r-4  border-black ">

            </span>


            <br></br>
            {/*Rendez vous important*/}
            <div className="relative  h-auto   ">
               <div
                  className="bg-red-900 bg-cover   relative  h-[50%] mx-4  w-[80%] md:w-[50%]  lg:w-[55%]  rounded-tr-full justify-center  ">

                  <h1 id="presentation"
                      className="text-[15px]  px-2 py-2 text-white bg-clip-text  font-semibold my-2 leading-4 uppercase">
                     Rendez vous important : </h1>
               </div>
               {/*<span>Soumission d’articles et publication dans les conférences internationales de la Research Foundation :</span>*/}


               <div className="flex justify-between ">

                  <div className="relative w-[90%] md:w-[90%]  lg:w-[50%] mx-6 top-2.5 ">
                     <div className="grid   md:grid grid-cols-2 text-center ">

                        <div className="col-span-1">

                           <div className="border border-black p-2 md:p-4">Inscription anticipée</div>
                           <div className="border border-black p-1 md:p-4">Date limite de soumission des articles</div>
                           <div className="border border-black p-1 md:p-4">Date limite d'inscription</div>
                           <div className="border border-black p-1 md:p-4">Date de la conférence</div>
                        </div>

                        <div className="col-span-1">
                           <div className="border border-black p-2 md:p-4">30 avril 2024</div>

                           <div className="border border-black p-7 md:p-4">10 mai 2024</div>
                           <div className="border border-black p-4">20 mai 2024</div>
                           <div className="border border-black p-4">30 - 31 mai 2024</div>
                        </div>
                     </div>

                  </div>


                  <div className="hidden lg:block  relative md:w-[23%]  w-6 h-72 mx-28   ">
                     <img
                        className=" object-center  relative w-full h-full  "
                        src={date.src}
                        height={650}
                        width={650}
                        alt="Nfc"
                     />
                  </div>

               </div>

            </div>



            {/* Règles et Règlements */}
            <div className="relative  h-auto top-6 md:top-6 lg:top-0 ">
               <div
                  className="bg-red-900 bg-cover   relative  h-[50%] mx-4  w-[80%] md:w-[50%] lg:w-[55%] rounded-tr-full justify-center  ">

                  <h1 id="presentation"
                      className="text-[15px]  px-2 py-2 text-white bg-clip-text  font-semibold my-2 leading-4 uppercase">
                     Règles et Règlements </h1>
               </div>


               <div className="flex flex-wrap ">
                   <div className="relative w-full md:w-[98%]  lg:w-[60%]  ">
                  <span className="relative w-[50%] md:w-[80%] lg:w-[55%]  mx-6 text-sm ">Soumission d’articles et publication dans les conférences internationales de l'association <strong>FESTIM Afrique</strong> :</span>

                  <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[80%] lg:w-[93%] mx-8    list-disc list-inside  ">
                     <li
                        className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                        <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                        Tous les articles soumis doivent être originaux et ne peuvent être publiés ailleurs avant ou
                        après
                        la conférence.
                     </li>
                  </ul>
                  <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                     <li
                        className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                        <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                        Tous les auteurs et co-auteurs doivent inclure les affiliations correctes dans leurs articles.
                     </li>
                  </ul>
                  <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                     <li
                        className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                        <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                        Le comité d'organisation ne pourra pas accepter les communications soumises après la date limite
                        d'inscription.
                     </li>
                  </ul>
                  <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                     <li
                        className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                        <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                        FESTIM Afrique examinera chaque article avant de l’accepter pour la conférence avec l’aide de
                        trois
                        évaluateurs.
                     </li>
                  </ul>
                  <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                     <li
                        className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                        <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                        FESTIM Afrique ne publiera pas les e-mails des auteurs ou co-auteurs en ligne.
                     </li>
                  </ul>
                  <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                     <li
                        className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                        <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                        FESTIM Afrique ne peut pas ajouter, modifier ou supprimer le nom d'un auteur ou d'un co-auteur
                        dans
                        l'article sans l'autorisation de tous les auteurs et co-auteurs répertoriés dans l'article.
                     </li>
                  </ul>
                  <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                     <li
                        className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                        <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                        Seuls les articles enregistrés seront publiés par FESTIM Afrique.
                     </li>
                  </ul>
                  <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                     <li
                        className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                        <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                        La personne qui soumet l'article sera considérée comme l'auteur original de l'article, et FESTIM
                        Afrique n'est pas responsable de l'identification de l'auteur original ou du co-auteur.
                     </li>
                  </ul>
                  <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                     <li
                        className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                        <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                        Dans le cas où FESTIM Afrique reçoit une plainte concernant l'originalité de l'auteur et que
                        celle-ci s'avère vraie, l'article sera immédiatement suspendu de publication.
                     </li>
                  </ul>
                  <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                     <li
                        className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                        <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                        Les articles suspendus ne peuvent pas être republiés ou distribués par FESTIM Afrique à partir
                        de
                        la date de suspension.
                     </li>
                  </ul>

               </div>


                     <div className="hidden lg:block   relative md:w-[33%] p-2 top-12 w-6 h-auto -right-8 ">
                        {/* Contenu de la bulle */}
                        <div className=" text-white   shadow-lg">
                           <img
                              src={regle.src}
                              alt={`Logo `}
                              width="450"
                              height="450"
                              className=" object-center  relative w-full h-full  "
                           />
                        </div>
                     </div>

               </div>
            </div>

            <br></br>
            {/* Directives de soumission */}
            <div className="relative  h-auto  ">
               <div
                  className="bg-red-900 bg-cover   relative  h-[50%] mx-4  w-[80%] md:w-[50%] lg:w-[55%] rounded-tr-full justify-center  ">

                  <h1 id="presentation"
                      className="text-[15px]  px-2 py-2 text-white bg-clip-text  font-semibold my-2 leading-4 uppercase">
                     Directives de soumission </h1>
               </div>

               <div className="flex flex-wrap ">

                  <div className="relative w-full md:w-[98%]  lg:w-[60%]  ">
                     <span className="relative w-[80%] md:w-[80%] lg:w-[55%] mx-6 text-sm ">Format du résumé :</span>

                     <ul className="relative h-auto w-[80%] md:w-[80%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Le résumé doit être rédigé en anglais et ne pas dépasser 500 mots.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Soumettez le résumé et l'article complet en ligne ou par courrier électronique à
                           festimafrique@gmail.com .
                           Vous recevrez un accusé de réception dans un délai de deux jours ouvrés
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Le résumé doit être concis et énoncer le but, les résultats et les conclusions de la
                           recherche.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Il ne doit pas inclure de références ou d’abréviations inhabituelles.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Le résumé doit comporter 350 mots maximum, en police Times New Roman 11 points, à interligne
                           simple
                           et justifié.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les mots clés doivent être au nombre de 5 ou moins, en police Times New Roman de 10 points,
                           à simple interligne et justifiés.
                        </li>
                     </ul>

                     <br></br>
                     <span
                        className="relative w-[80%] md:w-[80%] lg:w-[55%] mx-6 text-sm ">Format papier complet :</span>

                     <ul className="relative h-auto w-[80%] md:w-[80%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Le document complet doit être rédigé en anglais et soumis au format Microsoft Office
                           (.doc/.docx).
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Le manuscrit doit comprendre entre 4 000 et 12 000 mots, figures et tableaux compris.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Le papier doit être formaté pour le papier A4, avec une marge intérieure de 2,5 cm et des
                           marges
                           supérieure, inférieure et extérieure de 2 cm.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Le titre doit contenir 15 mots maximum, en casse du titre, en petites majuscules, centré,
                           gras, en
                           police Times New Roman de taille 16, à interligne simple.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Le texte principal doit être constitué d'une colonne, justifiée, en police Times New Roman de
                           12
                           points,
                           avec un retrait de première ligne de 5 mm et un espacement de 1,5.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Le manuscrit doit commencer par le titre, le résumé et les mots-clés, et comprendre les
                           sections
                           suivantes : introduction, revue de la littérature, méthodologie de recherche, résultats et
                           discussion,
                           conclusion et recherches complémentaires, et références.
                        </li>
                     </ul>

                  </div>


                  <div className=" hidden lg:block  relative md:w-[38%] p-2 top-32 w-6 h-auto -right-2 ">
                     {/* Contenu de la bulle */}
                     <div className=" text-white   shadow-lg">
                        <img
                           src={instructions.src}
                           alt={`Logo `}
                           width="450"
                           height="450"
                           className=" object-center  relative w-full h-full  "
                        />
                     </div>
                  </div>


               </div>


            </div>


            <br></br>
            {/*Directives d'inscription */}
            <div className="relative  h-auto   ">
               <div
                  className="bg-red-900 bg-cover   relative  h-[50%] mx-4  w-[80%] md:w-[50%] lg:w-[55%] rounded-tr-full justify-center  ">

                  <h1 id="presentation"
                      className="text-[15px]  px-2 py-2 text-white bg-clip-text  font-semibold my-2 leading-4 uppercase">
                     Directives d'inscription : </h1>
               </div>
               {/*<span>Soumission d’articles et publication dans les conférences internationales de la Research Foundation :</span>*/}

               <div className="flex flex-wrap ">

                  <div className="relative w-full md:w-[98%]  lg:w-[60%]  ">
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Tous les participants doivent s'inscrire à la conférence afin d'assister à l'événement.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Pour vous inscrire, veuillez visiter le site officiel de la conférence et cliquer sur l'
                           onglet
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Vous serez invité à remplir le formulaire d’inscription, qui comprend vos informations
                           personnelles
                           et professionnelles.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Après avoir soumis le formulaire, vous recevrez un e-mail de confirmation contenant des
                           instructions supplémentaires
                           sur la manière de procéder au processus d'inscription.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les participants sont tenus de payer les frais d'inscription à la conférence afin de terminer
                           le
                           processus d'inscription. Les frais peuvent être payés en ligne
                           par carte de crédit ou par virement bancaire.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Une fois les frais d'inscription payés, les participants recevront un e-mail de confirmation
                           final
                           avec des détails sur la façon
                           d'accéder aux documents de la conférence, y compris le calendrier du programme et les
                           directives de
                           présentation.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Veuillez noter que les frais d'inscription ne sont pas remboursables mais peuvent être
                           transférés à
                           un autre événement dans l'organisation de son choix.
                        </li>
                     </ul>

                  </div>


                  <div className=" hidden lg:block  relative md:w-[38%] p-2 top-3 w-6 h-auto -right-2 ">
                     {/* Contenu de la bulle */}
                     <div className=" text-white   shadow-lg">
                        <img
                           src={inscription.src}
                           alt={`Logo `}
                           width="520"
                           height="520"
                           className=" object-center  relative w-full h-full  "
                        />
                     </div>
                  </div>


               </div>


            </div>


            <br></br>
            {/*Conférence virtuelle  */}
            <div className="relative  h-auto  ">
               <div
                  className="bg-red-900 bg-cover   relative  h-[50%] mx-4  w-[80%] md:w-[50%] lg:w-[55%] rounded-tr-full justify-center  ">

                  <h1 id="presentation"
                      className="text-[15px]  px-2 py-2 text-white bg-clip-text  font-semibold my-2 leading-4 uppercase">
                  Conférence virtuelle </h1>
               </div>

               <div className="flex flex-wrap ">

                  <div className="relative w-full md:w-[98%]  lg:w-[60%]  ">
                     <div className="relative w-[80%] md:w-[93%] lg:w-[93%] mx-6 text-sm ">Une conférence virtuelle est
                        un
                        événement numérique qui permet aux participants du monde entier de se connecter
                        et de s'engager en temps réel dans le confort de leur propre emplacement. Il offre une
                        plate-forme
                        unique permettant
                        aux participants de partager leurs connaissances,
                        d'échanger des idées et de se connecter avec des personnes partageant les mêmes idées.
                     </div>
                     <br></br>
                     <span className="mx-8">Caractéristiques:</span>

                     <ul className="relative h-auto w-[80%] md:w-[80%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Interaction en temps réel avec les participants.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Partage d'écran et de présentation.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Élimination des frais de déplacement et d’hébergement.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Séances de questions et réponses en direct.
                        </li>
                     </ul>

                     <br></br>
                     <span className="mx-8 text-sm">Le nécessaire requis:</span>

                     <ul className="relative h-auto w-[80%] md:w-[80%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Pour les participants, une connexion Internet stable et un appareil adapté pour accéder à la
                           plateforme virtuelle sont essentiels.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Pour les présentateurs, une connexion Internet fiable, une webcam et un casque sont
                           nécessaires
                           pour offrir une présentation virtuelle fluide.
                        </li>
                     </ul>

                     <br></br>
                     <span className="mx-8 text-sm">Autres détails clés :</span>

                     <ul className="relative h-auto w-[80%] md:w-[80%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les participants recevront les actes de la conférence numérique et un certificat de
                           participation.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les biographies des meilleurs présentateurs seront présentées sur notre site Web très visité.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           La possibilité de publier des articles complets dans des revues Scopus, Web of Science et
                           indexées
                           UGC avec un coût de publication variable.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les présentations et les points forts de la conférence pourront être visionnés sur des forums
                           publics tels que YouTube,
                           Instagram, Facebook et d'autres plateformes de médias sociaux.
                        </li>
                     </ul>


                  </div>


                  <div className=" hidden lg:block  relative md:w-[38%] p-2 top-32 w-6 h-auto shadow-black -right-2 ">
                     {/* Contenu de la bulle */}
                     <div className=" text-white   shadow-lg">
                        <img
                           src={reunion.src}
                           alt={`Logo `}
                           width="520"
                           height="520"
                           className=" object-center  relative w-full h-full  "
                        />
                     </div>
                  </div>


               </div>


            </div>


            <br></br>
            {/*Politique de plagiat */}
            <div className="relative  h-auto  ">
               <div
                  className="bg-red-900 bg-cover   relative  h-[50%] mx-4  w-[80%] md:w-[50%] lg:w-[55%] rounded-tr-full justify-center  ">

                  <h1 id="presentation"
                      className="text-[15px]  px-2 py-2 text-white bg-clip-text  font-semibold my-2 leading-4 uppercase">
                     Politique de plagiat </h1>
               </div>

               <div className="flex flex-wrap ">
                  <div className="relative w-full md:w-[98%]  lg:w-[60%]  ">
                     <div className="relative w-[80%] md:w-[93%] lg:w-[93%] mx-6 text-sm ">
                        La politique relative au plagiat contribue à garantir que les auteurs reconnaissent correctement
                        le travail d'autres auteurs lorsqu'ils font référence et à maintenir l'intégrité scientifique de
                        la
                        communauté de recherche.
                     </div>
                        <ul className="relative h-auto w-[80%] md:w-[93%]  lg:w-[94%] mx-8   list-disc list-inside  ">
                           <li
                              className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                              <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                              Les articles de recherche soumis pour publication seront examinés à l'aide d'un logiciel de
                              détection de plagiat afin de déterminer leur originalité et leur pourcentage de similitude
                              avec
                              d'autres sources.
                              Les articles ne répondant pas à ces critères seront renvoyés aux auteurs pour révision.
                           </li>
                        </ul>
                        <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[94%] mx-8   list-disc list-inside  ">
                           <li
                              className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                              <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                              Dans le cas où un plagiat est détecté avant la publication, l'auteur aura la possibilité de
                              soumettre à nouveau l'article après avoir apporté les modifications nécessaires conseillées
                              par
                              l'éditeur.
                              Si l’éditeur détermine que le problème du plagiat est important, l’article ne sera pas pris
                              en
                              compte pour publication.
                           </li>
                        </ul>
                        <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[94%] mx-8   list-disc list-inside  ">
                           <li
                              className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                              <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                              Si un plagiat ou une fausse identité est suspecté ou découvert après la publication d'un
                              article,
                              l'article sera temporairement supprimé du site Web jusqu'à ce que la vérification soit
                              terminée.
                              Dans le cas où seulement quelques paragraphes sont plagiés,
                              l'auteur aura la possibilité de modifier l'article publié et celui-ci sera restauré sur le
                              site Web
                              une fois approuvé par l'éditeur.
                           </li>
                        </ul>
                        <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[94%] mx-8   list-disc list-inside  ">
                           <li
                              className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                              <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                              Cependant, si Festim Afrique détermine que le plagiat ou une fausse identité constitue
                              un
                              problème majeur dans l'article publié et viole les droits d'auteur d'autrui, l'article sera
                              définitivement retiré de la publication et l'auteur sera pénalisé et banni de Festim Afrique
                              et des autres organisateurs de conférences pour vie.
                              La suppression sera notifiée sur le site Internet de la revue et les services d'indexation en
                              seront informés.
                           </li>
                        </ul>
                        <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[94%] mx-8   list-disc list-inside  ">
                           <li
                              className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                              <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                              Les auteurs qui republient leur ouvrage déjà publié (auto-plagiat) seront également soumis à
                              la
                              procédure décrite ci-dessus.
                           </li>
                        </ul>
                  </div>
                     <div className=" hidden lg:block  relative md:w-[38%] p-2 top-8 w-6 h-auto shadow-black -right-2 ">
                        <div className=" text-white   shadow-lg">
                           <img
                              src={plagat.src}
                              alt={`Logo `}
                              width="520"
                              height="520"
                              className=" object-center  relative w-full h-full  "
                           />
                        </div>
                  </div>
               </div>


            </div>


            <br></br>
            {/*Directives de présentation  */}
            <div className="relative  h-auto  ">
               <div
                  className="bg-red-900 bg-cover    relative  h-[50%] mx-4  w-[80%] md:w-[50%] lg:w-[55%] rounded-tr-full justify-center  ">

                  <h1 id="presentation"
                      className="text-[15px]  px-2 py-2 text-white bg-clip-text  font-semibold my-2 leading-4 uppercase">
                     Directives de présentation </h1>
               </div>

               <div className="flex flex-wrap ">
                  <div className="relative w-full md:w-[98%]  lg:w-[60%]  ">

                     <span className="relative w-[80%] md:w-[80%] lg:w-[55%] mx-6 text-sm ">Présentation orale:</span>

                     <ul className="relative h-auto w-[80%] md:w-[80%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les présentations doivent être limitées à 15 minutes, avec 5 minutes supplémentaires allouées
                           à la
                           discussion et aux questions-réponses.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           L'auteur ou un co-auteur doit être présent pour faire la présentation.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les présentations peuvent être faites à l'aide d'un ordinateur portable personnel ou de
                           l'équipement fourni sur le lieu de la conférence.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les présentateurs sont encouragés à utiliser le système d'exploitation Windows et MS
                           PowerPoint
                           pour leurs présentations.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Des bénévoles de la conférence seront disponibles pour aider les présentateurs avec tout
                           besoin
                           technique.
                        </li>
                     </ul>


                     <span
                        className="relative w-[80%] md:w-[80%] lg:w-[55%] mx-6 text-sm ">Présentation par affiche:</span>

                     <ul className="relative h-auto w-[80%] md:w-[80%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les affiches doivent mesurer 36 pouces de largeur et 48 pouces de hauteur.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les participants sont responsables d’apporter leurs propres affiches imprimées.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les affiches doivent être installées avant la cérémonie d'ouverture et retirées après la
                           présentation.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Au moins un présentateur doit être disponible pendant l’heure désignée pour visionner les
                           affiches
                           pour discuter avec les participants.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Des affiches seront exposées dans la salle principale de l'événement sur le site.
                        </li>
                     </ul>


                     <span
                        className="relative w-[80%] md:w-[80%] lg:w-[55%] mx-6 text-sm ">Présentation virtuelle :</span>

                     <ul className="relative h-auto w-[80%] md:w-[80%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les présentateurs qui ne peuvent pas assister à l'événement en personne peuvent toujours
                           participer
                           via une présentation virtuelle.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           La durée des présentations virtuelles ne doit pas dépasser 15 minutes, avec 5 minutes
                           supplémentaires pour les discussions et les questions-réponses
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les organisateurs de la conférence fourniront des liens de réunion Zoom aux présentateurs
                           virtuels
                           avant la présentation.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les présentateurs sont encouragés à tester leur équipement vidéo et audio sur la plateforme
                           de test
                           Zoom pour éviter tout problème technique.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les présentateurs virtuels doivent partager tous les documents ou présentations pertinents
                           pour
                           améliorer la compréhension de leurs conclusions pour les participants en ligne.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les présentateurs virtuels sont priés de se connecter à leur plateforme Zoom au moins 30
                           minutes
                           avant leur présentation prévue.
                        </li>
                     </ul>


                  </div>

                  <div className=" hidden lg:block  relative md:w-[38%] p-2 top-24 w-6 h-auto shadow-black -right-2 ">
                     <div className=" text-white   shadow-lg">
                        <img
                           src={getty.src}
                           alt={`Logo `}
                           width="540"
                           height="540"
                           className=" object-center  relative w-full h-full  "
                        />
                        <br></br>

                        <img
                           src={getty2.src}
                           alt={`Logo `}
                           width="540"
                           height="540"
                           className=" object-center  relative w-full h-full  "
                        />
                     </div>
                  </div>

               </div>


            </div>


            <br></br>
            {/*Participation aux conférences*/}
            <div className="relative  h-auto   ">
               <div
                  className="bg-red-900 bg-cover    relative  h-[50%] mx-4  w-[80%] md:w-[50%] lg:w-[55%] rounded-tr-full justify-center  ">

                  <h1 id="presentation"
                      className="text-[15px]  px-2 py-2 text-white bg-clip-text  font-semibold my-2 leading-4 uppercase">
                     Participation aux conférences : </h1>
               </div>
               {/*<span>Soumission d’articles et publication dans les conférences internationales de la Research Foundation :</span>*/}


               <div className="flex flex-wrap ">
                  <div className="relative w-full md:w-[98%]  lg:w-[60%]  ">

                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les participants doivent s'inscrire et payer les frais spécifiés avant d'assister à la
                           conférence.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Consultez régulièrement la page officielle de la conférence pour les mises à jour.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Le lieu et la date de la conférence peuvent changer, et les participants inscrits seront
                           informés
                           par e-mail et par téléphone.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Ne vous engagez dans aucun comportement violent avant ou après l’événement.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Apportez une pièce d'identité valide émise par le gouvernement à la conférence.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les kits de conférence peuvent ne pas être disponibles lors de l'événement et peuvent être
                           envoyés
                           plus tard par la poste.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les arrivées tardives pourraient ne pas être autorisées à participer à la conférence.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Les militants ne sont pas autorisés à y assister.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           FESTIM Afrique se réserve le droit de publier des imgges de la conférence.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           FESTIM Afrique n'est pas responsable des pertes monétaires ou des remboursements de billets
                           si la
                           conférence est annulée ou reportée.
                        </li>
                     </ul>
                  </div>

               <div className=" hidden lg:block  relative md:w-[38%] p-2 top-6 w-6 h-auto shadow-black -right-2 ">
                  <div className=" text-white   shadow-lg">
                     <img
                        src={getty2.src}
                        alt={`Logo `}
                        width="940"
                        height="940"
                        className=" object-center  relative w-full h-full  "
                     />
                  </div>
               </div>
               </div>

            </div>

            <br></br>
            {/*À faire */}
            <div className="relative  h-auto   ">
               <div
                  className="bg-red-900 bg-cover    relative  h-[50%] mx-4  w-[80%] md:w-[50%] lg:w-[55%]  rounded-tr-full justify-center  ">

                  <h1 id="presentation"
                      className="text-[15px]  px-2 py-2 text-white bg-clip-text  font-semibold my-2 leading-4 uppercase">
                     À faire : </h1>
               </div>
               {/*<span>Soumission d’articles et publication dans les conférences internationales de la Research Foundation :</span>*/}


               <div className="flex flex-wrap ">
                  <div className="relative w-full md:w-[98%]  lg:w-[60%]  ">


                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Faites des recherches approfondies sur votre sujet et assurez-vous de bien le connaître avant
                           d'assister à la conférence.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Arrivez tôt sur le lieu de la conférence pour éviter toute précipitation de dernière minute.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Habillez-vous convenablement pour la conférence, car une tenue professionnelle est attendue.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Participez activement aux discussions et aux sessions, posez des questions pertinentes et
                           dialoguez
                           avec les autres participants.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Réseautez avec d'autres participants et professionnels, échangez des cartes de visite et
                           établissez
                           des liens significatifs.

                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Prenez de bonnes notes pendant la conférence pour revoir plus tard et mettre en œuvre toutes
                           les
                           nouvelles connaissances ou idées que vous avez acquises.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Assistez à toutes les sessions, y compris les discours d'ouverture et les tables rondes, pour
                           tirer
                           le meilleur parti de la conférence.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Suivez les directives pour présenter vos travaux de recherche et assurez-vous que votre
                           présentation est bien préparée et visuellement attrayante.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Restez au courant du calendrier de la conférence et soyez à l'heure pour tous les événements.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Accordez-vous suffisamment de temps pour vous détendre et vous ressourcer pendant la
                           conférence,
                           ainsi que pour explorer la ville ou ses environs.
                        </li>
                     </ul>


                  </div>


                  <div className=" hidden lg:block  relative md:w-[38%] p-2 top-20 w-6 h-36 shadow-black -right-2 ">
                     <div className=" text-white   shadow-lg">
                        <img
                           src={faire.src}
                           alt={`Logo `}
                           width="940"
                           height="940"
                           className=" object-center  relative w-full h-full  "
                        />
                     </div>
                  </div>

               </div>
            </div>

            <br></br>

            {/*À ne pas faire*/}
            <div className="relative  h-auto   ">
               <div
                  className="bg-red-900 bg-cover   relative  h-[50%] mx-4  w-[80%] md:w-[50%]  lg:w-[55%]  rounded-tr-full justify-center  ">

                  <h1 id="presentation"
                      className="text-[15px]  px-2 py-2 text-white bg-clip-text  font-semibold my-2 leading-4 uppercase">
                     À ne pas faire : </h1>
               </div>
               {/*<span>Soumission d’articles et publication dans les conférences internationales de la Research Foundation :</span>*/}


               <div className="flex flex-wrap ">
                  <div className="relative w-full md:w-[98%]  lg:w-[60%]  ">
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Ne soyez pas pris au dépourvu pour votre présentation, assurez-vous de faire des recherches
                           approfondies et de répéter au préalable.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           N'oubliez pas d'éteindre votre téléphone ou tout autre appareil électronique pendant les
                           sessions
                           ou les présentations.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Ne vous engagez pas dans un comportement perturbateur et ne faites pas de commentaires
                           inappropriés
                           pendant la conférence.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Ne négligez pas de prendre soin de vos besoins personnels tels que manger, dormir et rester
                           hydraté.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Ne négligez pas les directives de présentation des travaux de recherche, telles que les
                           restrictions de durée, de format et de contenu.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           N'ignorez aucune instruction donnée par les organisateurs de la conférence, y compris les
                           directives de sécurité incendie ou les protocoles d'urgence.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Ne négligez pas le réseautage et l'établissement de liens avec les autres participants, car
                           il
                           s'agit d'une opportunité précieuse d'évolution professionnelle.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Ne soyez pas en retard aux sessions, aux discours d'ouverture ou à d'autres événements, car
                           cela
                           montre un manque de respect envers les conférenciers et les autres participants.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           N'oubliez pas d'apporter tout le matériel nécessaire, comme des cartes de visite, du matériel
                           de
                           présentation et d'autres documents importants.
                        </li>
                     </ul>
                     <ul className="relative h-auto w-[80%] md:w-[90%]  lg:w-[93%] mx-8   list-disc list-inside  ">
                        <li
                           className="text-xs md:text-sm  leading-tight mt-2 text-justify gap-2 font-medium flex items-center font-[Poppins] ">
                           <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-1"></span>
                           Ne négligez pas l’importance de la relaxation et des soins personnels, car ils sont
                           essentiels au
                           maintien d’un équilibre sain entre vie professionnelle et vie privée.
                        </li>
                     </ul>
                  </div>


               <div className=" hidden lg:block  relative md:w-[38%] p-2 -top-4 w-6 h-auto shadow-black -right-2 ">
                  <div className=" text-white   shadow-lg">
                     <img
                        src={pasfaire.src}
                        alt={`Logo `}
                        width="150"
                        height="150"
                        className=" object-center  relative w-full h-full  "
                     />
                  </div>
               </div>

               </div>
            </div>

            <br></br>

            <div className="fixed bottom-6 right-8 w-8 z-50">
               {/* Contenu de la bulle */}
               <div className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
                  <img
                     src={discours.src}
                     alt={`Logo `}
                     width="15"
                     height="20"
                     className=" object-center  relative w-full h-full  "
                  />
               </div>
            </div>




            <Pied/>
         </div>


      </>
   )
}
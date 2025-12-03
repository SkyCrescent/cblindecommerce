const pool = require("../database/index.jsx")
const postsController = {

   getUserById: async (req, res) => {
      try {
         const { id } = req.params;
         const [rows] = await pool.query("SELECT * FROM user_settings where Num = ?", [id]);
         res.json({ data: rows });
      } catch (error) {
         console.error(error);
         res.status(500).json({ state: "error", message: error.message });
      }
   },


   getInfosUser: async (req, res) => {
      try {
         const { id } = req.params;
         const [rows] = await pool.query("SELECT * FROM all_users where id = ?", [id]);
         res.json({ data: rows });
      } catch (error) {
         console.error(error);
         res.status(500).json({ state: "error", message: error.message });
      }
   },




   getPublicationById: async (req, res) => {
      try {
         const { id } = req.params;
         const [rows] = await pool.query("SELECT * FROM publication where Auteur_id <> ?", [id]);
         res.json({ data: rows });
      } catch (error) {
         console.error(error);
         res.status(500).json({ state: "error", message: error.message });
      }
   },


   getAllConversations : async (req , res) =>{

      try {

         const [rows] = await pool.query("SELECT * FROM conversations");
         res.json({ data: rows });
      } catch (error) {
         console.error(error);
         res.status(500).json({ state: "error", message: error.message });
      }

   }  ,

   getAllConversationsById : async (req , res) =>{

      try {

         const { id } = req.params;
         const [rows] = await pool.query("SELECT * FROM tchat where destinataire = ?", [id]);
         res.json({ data: rows });
      } catch (error) {
         console.error(error);
         res.status(500).json({ state: "error", message: error.message });
      }

   }  ,

   getAllCommentaireById : async (req , res) =>{

      try {

         const { id } = req.params;
         const [rows] = await pool.query("SELECT * FROM commentaires where publication_id = ?", [id]);
         res.json({ data: rows });
      } catch (error) {
         console.error(error);
         res.status(500).json({ state: "error", message: error.message });
      }

   }  ,

   getPicutreId : async (req , res) =>{

      try {

         const { id } = req.params;
         const [rows] = await pool.query("SELECT photo FROM all_users where id = ?", [id]);
         res.json({ data: rows });
      } catch (error) {
         console.error(error);
         res.status(500).json({ state: "error", message: error.message });
      }

   }  ,



// Enregistrer un profil utilisateur
   createUserProfile: async (req, res) => {
      try {
         // Destructuration des champs reçus du frontend
         const {
            nom,
            prenom,
            ville,
            localite,
            pays,
            num,
            mail,
            domaine,
            date_naissance, // correspond au frontend
            mdp,            // correspond au frontend
            photo
         } = req.body;

         // Validation minimale
         if (!nom || !prenom || !num || !mdp) {
            return res.status(400).json({
               state: "error",
               message: "Nom, prénom, numéro et mot de passe sont obligatoires"
            });
         }

         // Insertion dans la table "all_users"
         const [result] = await pool.query(
             `INSERT INTO all_users 
            (nom, prenom, ville, localite, pays, num, mail, domaine, date_naissance, mdp, photo)
            VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
             [nom, prenom, ville, localite, pays, num, mail, domaine, date_naissance, mdp, photo]
         );

         // Réponse au frontend
         res.status(201).json({
            state: "success",
            message: "Profil enregistré avec succès",
            userId: result.insertId,
            body: {
               nom,
               prenom,
               ville,
               localite,
               pays,
               num,
               mail,
               domaine,
               date_naissance,
               mdp,
               photo
            }
         });

      } catch (error) {
         console.error("Erreur lors de l’enregistrement du profil :", error);
         res.status(500).json({ state: "error", message: error.message });
      }
   },


   loginUser: async (req, res) => {
      try {
         // Récupération des champs du frontend
         const { nom, mdp } = req.body;

         // Requête SQL sécurisée avec paramètres
         const [rows] = await pool.query(
             "SELECT * FROM all_users WHERE nom = ? AND mdp = ?",
             [nom, mdp]
         );

         res.json({ data: rows });
      } catch (error) {
         console.error(error);
         res.status(500).json({ state: "error", message: error.message });
      }
   },


}

module.exports = postsController
const express = require("express")
const router = express.Router()

const postsController = require("../controller/posts.controller")



router.get("AllUser/:id",postsController.getUserById)
router.get("/AllConversations",postsController.getAllConversations)
router.get("/Conversations/:id",postsController.getAllConversationsById)
router.get("/Publication/:id",postsController.getPublicationById)
router.get("/Picture/:id",postsController.getPicutreId)
router.get("/Commentaires/:id",postsController.getAllCommentaireById)
router.post("/UserProfile", postsController.createUserProfile);
router.get("/AllInfos/:id",postsController.getInfosUser)
router.get("/GetInfosUser",postsController.loginUser)
module.exports= router
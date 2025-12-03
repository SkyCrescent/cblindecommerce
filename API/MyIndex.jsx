// const express = require("express");
// const cors = require("cors");
// require('dotenv').config();
//
// const app = express();
//
// // Enable CORS for all routes
// app.use(cors({
//    origin: "http://localhost:3000" // Replace this with your front end URL
// }));
//
// // Middleware to parse URL-encoded data and JSON payloads
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
//
// // Direct route definition (from the first snippet)
// app.get('/api/v1/posts', (req, res) => {
//    res.json({ message: 'Hello from API' });
// });
//
// // Importing and using a separate router (from the second snippet)
// const postsRouter = require('./routes/posts.router');
// app.use("/api/v1/posts", postsRouter);
//
// const PORT = process.env.PORT || 8000;
//
// app.listen(PORT, () => {
//    console.log(`Server is running on port ${PORT}`);
// });


const express = require("express")
const cors = require("cors");
// import bodyParser from 'body-parser';
const app = express()

// Enable CORS for all routes
app.use(cors({
   origin: "http://localhost:8888" // Replace this with your front end URL
}));


require('dotenv').config()

const postsRouter = require('./routes/posts.router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())


// app.use(bodyParser.json())

app.use("/",postsRouter)

const PORT = process.env. PORT || 8000

app.listen(PORT, ()=>{
   console.log("Serveur en marche")

})


// localhost/:1 Access to XMLHttpRequest at 'http://localhost:8000/api/v1/posts/' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
// Port par defaut http://localhost:8000
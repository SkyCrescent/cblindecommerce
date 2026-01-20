import { writeFile } from 'fs/promises'
import  { NextResponse } from "next/server";
import axios from "axios";

import { Buffer } from "buffer";


export async function POST(req){
   const data = await  req.formData()
   const file = data.get('file');
   if(!file){
      return NextResponse.json ({"msg":"pas de image",success:false})
   }
   const byteData = await file.arrayBuffer();
   const buffers =Buffer.from (byteData)

  const path = `./public/media/parteners/${file.name}`
 //  const path2 = `../../backup/UsersPicture/${file.name}`

   // ce qui est haut est  au cas ou on revient dans public
 //  const path = `../../ressources/UsersPicture/${file.name}`
   await  writeFile(path,buffers)
 //  await writeFile(path2,buffers)
   return NextResponse.json({"msg":"c bn ",success:true})
}
//const path = `../../ressources/UsersPicture/${file.name}`


// import { writeFile } from 'fs/promises'
// import  { NextResponse } from "next/server";
// import axios from "axios";
// import AdmZip from 'adm-zip'; // Pour manipuler les fichiers ZIP
//
//
//
// export async function POST(req){
//    const data = await  req.formData()
//    const file = data.get('file');
//    if(!file){
//       return NextResponse.json ({"msg":"pas de image",success:false})
//    }
//    const byteData = await file.arrayBuffer();
//    const buffers =Buffer.from (byteData)
//    const path = `../../ressources/UsersPicture/${file.name}`
//
//    await  writeFile(path,buffers)
//    return NextResponse.json({"msg":"c bn ",success:true})
// }
//
// // const path = `../../${file.name}`



//  const outputPath = `./public/NFC/${file.name}`
//
// import { createReadStream, createWriteStream } from 'fs';
// import { NextResponse } from "next/server";
// import { extname } from 'path';
// import archiver from 'archiver';
//
// export async function POST(req) {
//    const data = await req.formData();
//    const file = data.get('file');
//
//    if (!file) {
//       return NextResponse.json({"msg": "Pas de fichier", "success": false});
//    }
//
//    // Récupérer l'extension du fichier
//    const ext = extname(file.name);
//
//    // Définir le chemin du fichier de sortie
//    const outputPath = `./public/NFC`;
//
//    // Créer un flux de sortie vers le fichier ZIP
//    const outputZipStream = createWriteStream(outputPath);
//
//    // Créer un objet archiver
//    const archive = archiver('zip', {
//       zlib: { level: 9 } // Niveau de compression maximal
//    });
//
//    // Lier l'archive au flux de sortie
//    archive.pipe(outputZipStream);
//
//    // Ajouter le fichier téléchargé à l'archive en le lisant et en l'écrivant
//    archive.append(createReadStream(file.path), { name: file.name });
//
//    // Gérer l'événement de progression
//    archive.on('progress', ({ entries }) => {
//       const progress = Math.round((entries.processedBytes / entries.totalBytes) * 100);
//       console.log(`Progression de l'archivage : ${progress}%`);
//       // Envoyer un message avec le pourcentage de progression
//       // Vous pouvez utiliser ici une fonction pour envoyer des messages à l'utilisateur
//    });
//
//    // Gérer l'événement de fin d'archivage
//    archive.on('finish', () => {
//       console.log('Archivage terminé.');
//       // Envoyer un message indiquant que l'archivage est terminé
//       // Vous pouvez utiliser ici une fonction pour envoyer des messages à l'utilisateur
//    });
//
//    // Finaliser l'archive
//    archive.finalize();
//
//    // Attendre la fin de l'archivage
//    await new Promise((resolve, reject) => {
//       outputZipStream.on('close', resolve);
//       outputZipStream.on('error', reject);
//    });
//
//    return NextResponse.json({"msg": "Fichier ajouté à l'archive ZIP avec succès", "success": true});
// }

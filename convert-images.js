import sharp from "sharp";
import { glob } from "glob";
import fs from "fs";

// Récupérer toutes les images à convertir
const images = await glob("./app/assets/images/**/*.{png,jpg,jpeg}");

console.log(`📸 ${images.length} images trouvées`);

let converted = 0;
let deleted = 0;
let errors = 0;

for (const file of images) {
  try {
    // Générer le nom du fichier WebP
    const output = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");
    
    // Vérifier si le fichier source existe
    if (!fs.existsSync(file)) {
      console.log(`⚠️ Fichier introuvable: ${file}`);
      continue;
    }

    // Convertir en WebP
    await sharp(file)
      .webp({ quality: 80 })
      .toFile(output);
    
    console.log(`✅ Converti : ${output}`);
    converted++;

    // SUPPRIMER LE FICHIER ORIGINAL (jpg, jpeg, png)
    fs.unlinkSync(file);
    console.log(`🗑️ Supprimé : ${file}`);
    deleted++;

  } catch (error) {
    console.error(`❌ Erreur sur ${file}:`, error.message);
    errors++;
  }
}

// Résumé
console.log("\n📊 RÉSUMÉ :");
console.log(`   ✅ Converties : ${converted}`);
console.log(`   🗑️ Supprimées : ${deleted}`);
console.log(`   ❌ Erreurs : ${errors}`);
console.log("🏁 Terminé !");
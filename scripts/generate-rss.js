import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin vers vos fichiers JSON de traduction
const FR_ARTICLES_PATH = path.join(__dirname, '../app/assets/locales/fr/articles-details.json');
const EN_ARTICLES_PATH = path.join(__dirname, '../app/assets/locales/en/articles-details.json');

// Fonction pour transformer un titre en slug
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Fonction pour échapper les caractères XML
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch(c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

// Vérifier si les fichiers existent
if (!fs.existsSync(FR_ARTICLES_PATH)) {
  console.error(`❌ Fichier introuvable : ${FR_ARTICLES_PATH}`);
  process.exit(1);
}

// Lecture du fichier français
let rawData;
try {
  rawData = fs.readFileSync(FR_ARTICLES_PATH, 'utf8');
} catch (err) {
  console.error('❌ Erreur de lecture du fichier');
  console.error(err);
  process.exit(1);
}

let articlesData;
try {
  articlesData = JSON.parse(rawData);
} catch (err) {
  console.error('❌ Erreur de parsing JSON');
  console.error(err);
  process.exit(1);
}

// Convertir l'objet en tableau
const articlesArray = Object.keys(articlesData).map(key => ({
  id: key.replace('article', ''),
  ...articlesData[key]
}));

// Trier par ID
articlesArray.sort((a, b) => parseInt(a.id) - parseInt(b.id));

// Date du jour pour tous les articles
const today = new Date();
const pubDate = today.toUTCString();

// Construction du flux RSS
let rssItems = '';
articlesArray.forEach(article => {
  const title = escapeXml(article.title);
  const slug = slugify(article.title);
  const link = `https://patawala-v2-nry6.vercel.app/blog/${slug}`; // Remplacez par votre domaine
  const description = escapeXml(article.excerpt);
  const category = escapeXml(article.category);

  rssItems += `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <description>${description}</description>
      <category>${category}</category>
      <guid isPermaLink="false">${slug}-${article.id}</guid>
      <pubDate>${pubDate}</pubDate>
    </item>`;
});

const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Le Blog d'Abdoulaye Patawala</title>
    <link>https://https://patawala-v2-nry6.vercel.app</link>
    <description>Articles sur le développement web, mobile, IA et entrepreneuriat</description>
    <atom:link href="https://patawala-v2-nry6.vercel.app/rss.xml" rel="self" type="application/rss+xml"/>
    <language>fr</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    ${rssItems}
  </channel>
</rss>`;

// Créer le dossier public s'il n'existe pas
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Écriture du fichier
const outputPath = path.join(publicDir, 'rss.xml');
fs.writeFileSync(outputPath, rssFeed, 'utf8');
console.log(`✅ Flux RSS généré avec succès : ${outputPath}`);
console.log(`📊 ${articlesArray.length} articles exportés`);
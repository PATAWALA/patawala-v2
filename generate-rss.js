const fs = require('fs');
const path = require('path');

// Chemin vers votre fichier JSON contenant les articles
// Adaptez ce chemin selon l'emplacement réel de votre fichier
const articlesJsonPath = path.join(__dirname, '../app/blog/data/articles.json');

// Fonction pour transformer un titre en slug (URL friendly)
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')               // décompose les accents
    .replace(/[\u0300-\u036f]/g, '') // supprime les diacritiques
    .replace(/\s+/g, '-')            // remplace les espaces par des tirets
    .replace(/[^\w\-]+/g, '')        // supprime les caractères non alphanumériques
    .replace(/\-\-+/g, '-')          // remplace les tirets multiples par un seul
    .replace(/^-+/, '')              // supprime les tirets en début
    .replace(/-+$/, '');             // supprime les tirets en fin
}

// Fonction pour échapper les caractères XML
function escapeXml(unsafe) {
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

// Lecture du fichier JSON
let rawData;
try {
  rawData = fs.readFileSync(articlesJsonPath, 'utf8');
} catch (err) {
  console.error(`❌ Impossible de lire le fichier JSON : ${articlesJsonPath}`);
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

// Convertir l'objet { article1: {...}, article2: {...} } en tableau
const articlesArray = Object.keys(articlesData).map(key => ({
  id: key.replace('article', ''), // extrait l'ID numérique
  ...articlesData[key]
}));

// Trier par ID (optionnel, pour garder un ordre cohérent)
articlesArray.sort((a, b) => parseInt(a.id) - parseInt(b.id));

// Date de publication par défaut (aujourd'hui) – vous pouvez ajuster si vos articles ont une vraie date
const defaultPubDate = new Date().toUTCString();

// Construction du flux RSS
let rssItems = '';
articlesArray.forEach(article => {
  const title = escapeXml(article.title);
  const slug = slugify(article.title);
  const link = `https://votresite.com/blog/${slug}`; // adaptez le domaine
  const description = escapeXml(article.excerpt);
  const category = escapeXml(article.category);
  // Utilisez une date fixe ou ajoutez un champ "date" dans votre JSON
  const pubDate = defaultPubDate;

  rssItems += `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <description>${description}</description>
      <category>${category}</category>
      <guid isPermaLink="false">${slug}</guid>
      <pubDate>${pubDate}</pubDate>
    </item>`;
});

const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Votre Blog</title>
    <link>https://votresite.com</link>
    <description>Description de votre blog</description>
    <atom:link href="https://votresite.com/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

// Écriture du fichier dans le dossier public
const outputPath = path.join(__dirname, '../public/rss.xml');
fs.writeFileSync(outputPath, rssFeed, 'utf8');
console.log(`✅ Flux RSS généré avec succès : ${outputPath}`);
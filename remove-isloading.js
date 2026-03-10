const fs = require('fs');
const path = require('path');

// Configuration
const SECTIONS_DIR = path.join(__dirname, '../app/components/sections');
const EXTENSIONS = ['.tsx', '.jsx'];

// Statistiques
let stats = {
  filesProcessed: 0,
  filesModified: 0,
  isLoadingRemoved: 0,
  opacityClassesRemoved: 0
};

// Fonction pour traiter un fichier
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // 1. SUPPRIMER isLoading DE LA DESTRUCTION
  // Cherche: const { t, isLoading } = useLanguage();
  // Remplacer par: const { t } = useLanguage();
  content = content.replace(
    /const\s*\{\s*t\s*,\s*isLoading\s*\}\s*=\s*useLanguage\(\)/g,
    'const { t } = useLanguage()'
  );
  
  // Variante: const { t, language, isLoading } = useLanguage();
  content = content.replace(
    /const\s*\{\s*([^}]*?),\s*isLoading\s*([^}]*?)\}\s*=\s*useLanguage\(\)/g,
    (match, p1, p2) => {
      // Si après avoir enlevé isLoading il reste des virgules en trop
      let rest = (p1 + p2).replace(/,\s*,/g, ',').replace(/^\s*,\s*/, '').replace(/\s*,\s*$/, '');
      return `const { ${rest} } = useLanguage()`;
    }
  );
  
  // Variante: const { isLoading, t } = useLanguage();
  content = content.replace(
    /const\s*\{\s*isLoading\s*,\s*([^}]*?)\s*\}\s*=\s*useLanguage\(\)/g,
    'const { $1 } = useLanguage()'
  );
  
  // 2. SUPPRIMER LES CLASSES opacity DANS LE JSX
  // Pattern: className={`... ${isLoading ? 'opacity-0' : 'opacity-100'} ...`}
  content = content.replace(
    /`([^`]*)\$\{isLoading\s*\?\s*'([^']*)'\s*:\s*'([^']*)'\}([^`]*)`/g,
    (match, p1, p2, p3, p4) => {
      stats.opacityClassesRemoved++;
      // Garder seulement la partie sans condition (généralement opacity-100)
      return `\`${p1}${p3}${p4}\``;
    }
  );
  
  // Pattern plus simple: className={`... ${isLoading ? 'opacity-0' : 'opacity-100'}`}
  content = content.replace(
    /`([^`]*)\$\{isLoading\s*\?\s*'[^']*'\s*:\s*'([^']*)'\}`/g,
    (match, p1, p2) => {
      stats.opacityClassesRemoved++;
      return `\`${p1}${p2}\``;
    }
  );
  
  // Pattern: className={`... ${isLoading ? 'opacity-0' : ''} ...`}
  content = content.replace(
    /`([^`]*)\$\{isLoading\s*\?\s*'[^']*'\s*:\s*''\}([^`]*)`/g,
    (match, p1, p2) => {
      stats.opacityClassesRemoved++;
      return `\`${p1}${p2}\``;
    }
  );
  
  // Pattern: className={`... ${isLoading ? '' : 'opacity-100'} ...`}
  content = content.replace(
    /`([^`]*)\$\{isLoading\s*\?\s*''\s*:\s*'([^']*)'\}([^`]*)`/g,
    (match, p1, p2, p3) => {
      stats.opacityClassesRemoved++;
      return `\`${p1}${p2}${p3}\``;
    }
  );
  
  // 3. SUPPRIMER LES CLASSES transition-opacity duration-300 associées
  content = content.replace(
    /(className="[^"]*)transition-opacity\s+duration-300\s*([^"]*")/g,
    (match, p1, p2) => {
      stats.opacityClassesRemoved++;
      // Garder le reste de la classe sans transition-opacity duration-300
      return `className="${p1}${p2}"`.replace(/\s+/g, ' ').replace(/\s+"/g, '"');
    }
  );
  
  // Version avec backticks
  content = content.replace(
    /`([^`]*)transition-opacity\s+duration-300\s*([^`]*)`/g,
    (match, p1, p2) => {
      stats.opacityClassesRemoved++;
      return `\`${p1}${p2}\``.replace(/\s+/g, ' ').replace(/\s+`/g, '`');
    }
  );
  
  // 4. NETTOYER LES ESPACES DOUBLES DANS LES CLASSES
  content = content.replace(/className="([^"]*)"/g, (match, p1) => {
    return `className="${p1.replace(/\s+/g, ' ').trim()}"`;
  });
  
  content = content.replace(/className={`([^`]*)`}/g, (match, p1) => {
    return `className={\`${p1.replace(/\s+/g, ' ').trim()}\`}`;
  });
  
  // Sauvegarder si modifié
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    stats.filesModified++;
    console.log(`✅ Modifié: ${path.basename(filePath)}`);
  }
  
  stats.filesProcessed++;
}

// Fonction pour parcourir récursivement les dossiers
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (EXTENSIONS.includes(path.extname(file))) {
      processFile(filePath);
    }
  });
}

// Exécution
console.log('🔍 Recherche des fichiers contenant isLoading...\n');

try {
  if (fs.existsSync(SECTIONS_DIR)) {
    walkDir(SECTIONS_DIR);
    
    console.log('\n📊 RÉSUMÉ:');
    console.log(`   Fichiers analysés: ${stats.filesProcessed}`);
    console.log(`   Fichiers modifiés: ${stats.filesModified}`);
    console.log(`   isLoading supprimés: ${stats.isLoadingRemoved + stats.opacityClassesRemoved} occurrences`);
    console.log(`   Classes opacity supprimées: ${stats.opacityClassesRemoved}`);
    console.log('\n✨ Terminé!');
  } else {
    console.error(`❌ Dossier introuvable: ${SECTIONS_DIR}`);
  }
} catch (error) {
  console.error('❌ Erreur:', error);
}
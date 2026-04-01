const fs = require('fs');
const path = require('path');

// Configuration
const OLD_API_URL = 'https://bethaniemiracle.com/api';
const NEW_API_URL = 'https://trayebernard-primaire.com/api';
const OLD_DOMAIN = 'bethaniemiracle.com';
const NEW_DOMAIN = 'trayebernard-primaire.com';

// Extensions de fichiers à traiter
const EXTENSIONS = ['.js', '.ts', '.json'];

// Fichiers et dossiers à ignorer
const IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  'dist',
  'scripts'
];

// Fonction pour vérifier si un fichier doit être ignoré
function shouldIgnore(filePath) {
  return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

// Fonction pour remplacer les URLs dans un fichier
function replaceUrlsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Remplacer l'ancienne URL API par la nouvelle
    if (content.includes(OLD_API_URL)) {
      content = content.replace(new RegExp(OLD_API_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), NEW_API_URL);
      modified = true;
    }

    // Remplacer l'ancien domaine par le nouveau (pour les URLs sans /api)
    if (content.includes(OLD_DOMAIN)) {
      content = content.replace(new RegExp(OLD_DOMAIN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), NEW_DOMAIN);
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Erreur lors du traitement de ${filePath}:`, error.message);
    return false;
  }
}

// Fonction pour parcourir récursivement les dossiers
function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  let modifiedCount = 0;

  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    
    if (shouldIgnore(fullPath)) {
      return;
    }

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      modifiedCount += processDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(fullPath);
      if (EXTENSIONS.includes(ext)) {
        if (replaceUrlsInFile(fullPath)) {
          console.log(`✅ Modifié: ${fullPath}`);
          modifiedCount++;
        }
      }
    }
  });

  return modifiedCount;
}

// Point d'entrée
const controllersDir = path.join(__dirname, '..', 'controllers');
console.log(`🔄 Remplacement des URLs dans ${controllersDir}...`);
console.log(`   Ancienne URL API: ${OLD_API_URL}`);
console.log(`   Nouvelle URL API: ${NEW_API_URL}`);
console.log(`   Ancien domaine: ${OLD_DOMAIN}`);
console.log(`   Nouveau domaine: ${NEW_DOMAIN}`);
console.log('');

const modifiedCount = processDirectory(controllersDir);

console.log('');
console.log(`✅ Traitement terminé! ${modifiedCount} fichier(s) modifié(s).`);


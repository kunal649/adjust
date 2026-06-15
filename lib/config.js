const fs = require("fs").promises;  //Doubt 
const path = require("path"); 
const os = require("os");
const computeHashFile = require("./hash.js"); 

const CONFIG_DIR = path.join(os.homedir(), '.adjust');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json'); 
const CACHE_FILE = path.join(CONFIG_DIR, '.cache.json');
 

async function ensureConfigDir() {
    try {
        await fs.mkdir(CONFIG_DIR, {recursive: true}); // Doubt: Recursive?
    } catch (err) {
        console.log('Failed to create new directory.', err); 
    }
}

async function saveConfig(data) {
    await ensureConfigDir();
    await fs.writeFile(CONFIG_FILE, JSON.stringify(data, null, 2), 'utf8'); //Doubt1: I should use stream instead.
}

async function loadConfig() {
    try {
        const data = await fs.readFile(CONFIG_FILE, 'utf8'); //Doubt - Streams preferred!
        return JSON.parse(data); 
    } catch (Err) {
        return { activeLanguage: null, environment: {} }; 
    }
}

async function readCache(scriptDir) { 
    const cacheFile = path.join(scriptDir, '.adjust-cache.json');
    try {
        const data = await fs.readFile(cacheFile , 'utf8');
        return JSON.parse(data);
      } catch(err) { 
        return null;  
    } 
}

async function writeCache(scriptDir, hash) { 
const cacheFile = path.join(scriptDir, '.adjust-cache.json')
    const data = {
        sha256: hash,
        cached_at: new Date().toISOString(),
    }; 
    await fs.writeFile(cacheFile , JSON.stringify(data, null, 2), 'utf8'); 
}

module.exports = { saveConfig, loadConfig, readCache, writeCache }; 

const fs = require("fs").promises;  //Doubt 
const path = require("path"); 
const os = require("os");
const hashFile = require("./hash.js"); 

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
    try {
        path.join(scriptDir, '.cache.json');
        const data = await fs.readFile(scriptDir , 'utf8');
        return JSON.parse(data);
    } catch(err) { 
        return {footprint: null, cached_at: null}; 
    } 
}

async function writeCache(scriptDir ) {
    const data = await readCache(); 
    const cached = await hashfile(scriptDir ); 
    await fs.writeFile(scriptDir , JSON.stringify(cached, null, 2), 'utf8'); 

    data.footprint = cached; 
    data.cached_at = new Date().toISOString(); 
}

module.exports = { saveConfig, loadConfig, readCache, writeCache}; 

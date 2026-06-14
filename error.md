Naming mismatch: server.js imports getRuntimeExecutable but downloader exports getExecutable. Pick one name (recommended: getExecutable or getRuntimeExecutable) and export it consistently. Update all call sites. --> fixed

In dependencyHandler.installDependencies:

    - spawn close event code check uses string: if(code === '0') — code is a number, so use if (code === 0) -- fixed! 
    - If install fails, you must reject or resolve accordingly. Currently non-zero path prints but neither resolves nor rejects, leaving Promise unresolved. Fix to call reject(new Error(...)) for non-zero exit codes. --fixed
    - If no dep file exists you currently return true (synchronous return) instead of a Promise — make consistent: always return a Promise. For example, resolve(true) immediately.

runtimeHandler.runFile: it calls getRuntimeExecutable but downloader exports getExecutable; fix name. Also do not call process.exit inside modules — throw errors and let CLI decide.
config.saveConfig/readConfig: small config files are fine to read/write with promises; streaming is unnecessary. But make writes atomic (write to temp, rename) to avoid corruption.
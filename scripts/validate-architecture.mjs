import { validateArchitecture } from './architecture-validation.mjs';
const args = process.argv.slice(2);
const values = flag => args.flatMap((value, index) => value === flag && args[index + 1] ? [args[index + 1]] : []);
const result = validateArchitecture({ batch: values('--batch')[0], allow: values('--allow'), requireChanged: values('--require-changed'), ignore: values('--ignore') });
if (result.errors.length) { console.error(result.errors.map(error => `Architecture validation: ${error}`).join('\n')); process.exitCode = 1; }
else console.log(`Architecture validation passed: ${JSON.stringify(result.counts)}`);

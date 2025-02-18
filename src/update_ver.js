import { promisify } from 'node:util';
import child_process from 'node:child_process';
import path from 'node:path';

const exec = promisify(child_process.exec);

const projects = [
];

const commands = [
    "npm run updates:fix",
    "git add package.json",
    'git commit -m"update libs"',
    "npm version patch",
    "git push"
];

async function runOne(dir) {
    let i = 0;
    for (const command of commands) {
        const { stdout, stderr } = await exec(command, {cwd: dir});
        console.log('stdout:', i, stdout);
        if (stderr) {
            console.error('stderr:', stderr);
            // return false;
        }
        i++
    }
    return true;
}

async function runAll() {
    let i = 0;
    for (const project of projects) {
        {
            const newDir = path.join(import.meta.dirname, "../..", project)
            console.log('stdout:', i, newDir, import.meta.dirname);
            const isOk = await runOne(newDir);
            if (!isOk) {
                break;
            }
            i++;
        }
    }
}

await runAll();

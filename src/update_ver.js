import { promisify } from "node:util";
import child_process from "node:child_process";
import path from "node:path";

const exec = promisify(child_process.exec);

const projects = [
    "15",
    "bsod",
    "canvasboard",
    "determinant-web",
    "devtools",
    "dixitgame",
    "dots",
    "fool",
    "hedgehog",
    "localtext",
    "mastermind",
    "moonstone",
    "mouse-ramrod",
    "quadripple",
    "riverfight",
    "sosgame",
    "strider",
    "timer",
    "tray-electron"
];

const commands = [
    "npm run updates:fix",
    "git add package.json",
    "git commit -m\"update libs\"",
    "npm version patch",
    "git push"
];

async function runOne(dir) {
    let i = 0;
    for (const command of commands) {
        const { stdout, stderr } = await exec(command, {cwd: dir});
        console.log("stdout:", i, stdout);
        if (stderr) {
            console.error("stderr:", stderr);
            // return false;
        }
        i++;
    }
    return true;
}

async function check(dir) {
    const { stdout } = await exec("npm run updates", {cwd: dir});
    console.log("stdout:", "check", stdout);
    return !stdout.includes("All dependencies match the latest package versions");
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

async function runAll() {
    const sortedProjects = sortInput();
    if (!arrayEquals(sortedProjects, projects)) {
        console.error("Not sorted months");
        return;
    }
    let i = 0;
    for (const project of projects) {
        {
            const newDir = path.join(import.meta.dirname, "../..", project);
            console.log("stdout:", i, newDir, import.meta.dirname);
            const need = await check(newDir);
            if (!need) {
                console.log("skip", project);
                continue;
            }
            const isOk = await runOne(newDir);
            if (!isOk) {
                break;
            }
            i++;
        }
    }
}

function sortInput() {
    const sortedProjects = projects.toSorted();
    console.log(sortedProjects);
    return sortedProjects;
}

// sortInput();
await runAll();

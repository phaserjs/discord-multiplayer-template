const { execSync } = require('child_process');
const os = require('os');

const npm_execpath = process.env.npm_execpath || 'npm';
const nodemonCommand = `nodemon --watch src -e ts,ejs --exec ${npm_execpath} start`;

if (os.platform() === 'win32') {
    execSync(nodemonCommand, { stdio: 'inherit', shell: true });
}
else {
    execSync(nodemonCommand, { stdio: 'inherit' });
}

const { execSync } = require('child_process');
const os = require('os');

if (os.platform() === 'win32') {
    execSync(`nodemon --watch src -e ts,ejs --exec npm run start`, { stdio: 'inherit', shell: true });
}
else {
    execSync(`nodemon --watch src -e ts,ejs --exec $npm_execpath start`, { stdio: 'inherit' });
}

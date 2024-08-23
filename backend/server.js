process.loadEnvFile('./.env')
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const logger = require('morgan');
const os = require('os');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger("dev")); // Logger morgan
app.use(bodyParser.urlencoded({ extended: true })); // Body parser

// Initialize Passport.js
app.use(passport.initialize());

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

// Function to get the local IP address, Used for checking with front end
function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Skip over non-IPv4 and internal (i.e., 127.0.0.1) addresses
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1'; // Fallback to localhost if no other address found
}

const localIp = getLocalIpAddress();

const port = process.env.PORT || 3000; // Port 3000 is the default port
app.listen(port, () => {
    console.log(`Server is running on http://${localIp}:${port}`);
});

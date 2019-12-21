require('dotenv').config();
const discord = require('discord.js');
const { server, role, colors, login, speed } = require('./config.js');

const { JWT_SECRET } = process.env;

const token = JWT_SECRET;

const client = new discord.Client();
const rainbow = new Array(colors);

for (let i = 0; i < colors; i++) {
  const red = sin_to_hex(i, 0 * Math.PI * 2 / 3); // 0 deg
  const blue = sin_to_hex(i, 1 * Math.PI * 2 / 3); // 120 deg
  const green = sin_to_hex(i, 2 * Math.PI * 2 / 3); // 240 deg

  rainbow[i] = '#' + red + green + blue;
}

function sin_to_hex(i, phase) {
  const sin = Math.sin(Math.PI / colors * 2 * i + phase);
  const int = Math.floor(sin * 127) + 128;
  const hex = int.toString(16);

  return hex.length === 1 ? '0' + hex : hex;
}

let place = 0;


function changeColor() {
  for (let index = 0; index < server.length; ++index) {
    client.guilds.get(server[index]).roles.find('name', role).setColor(rainbow[place])
      .catch(console.error);

    if (login) {
      console.log(`[ColorChanger] Changed color to ${rainbow[place]} in server: ${server[index]}`);
    }
    if (place == (colors - 1)) {
      place = 0;
    } else {
      place++;
    }
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  if (speed < 10) { console.log("The minimum speed is 60.000, if this gets abused your bot might get IP-banned"); process.exit(1); }
  setInterval(changeColor, speed);
});

client.login(token);
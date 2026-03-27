const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const express = require('express');

const app = express();

// 🔥 DAS IST DER WICHTIGSTE TEIL (für UptimeRobot)
app.use((req, res) => {
    res.status(200).send('OK');
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`Bot ist online als ${client.user.tag}`);
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    console.log("EVENT WIRD AUSGELOEST");

    const addedRole = '1457266433682837576';
    const removeRole = '1457638301228990595';

    if (!oldMember.roles.cache.has(addedRole) && newMember.roles.cache.has(addedRole)) {
        console.log("ROLLE WURDE HINZUGEFÜGT");

        if (newMember.roles.cache.has(removeRole)) {
            await newMember.roles.remove(removeRole);
            console.log("GAST ENTFERNT");
        }
    }
});

// 🌐 Webserver starten
app.listen(process.env.PORT || 3000, () => {
    console.log('Webserver läuft');
});

// 🤖 Bot starten
client.login(process.env.BOT_TOKEN);

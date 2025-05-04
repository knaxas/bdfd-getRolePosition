const express = require("express");
const cors = require("cors");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running.');
});

app.get("/getRoleByPosition/:token/:guildId/:position", async (req, res) => {
  const { token, guildId, position } = req.params;

  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  try {
    await client.login(token);

    const guild = await client.guilds.fetch(guildId);
    const roles = await guild.roles.fetch();

    const sorted = roles
      .filter((role) => role.name !== "@everyone")
      .sort((a, b) => b.position - a.position);

    const index = parseInt(position) - 1;
    const role = Array.from(sorted.values())[index];

    if (!role) return res.status(404).json({ error: "Keine Rolle gefunden" });

    res.json({
      roleId: role.id,
    });
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Abrufen der Rolle", details: err.message });
  } finally {
    client.destroy();
  }
});


app.get('/api/is-in-voice/:token/:guildId/:userId', async (req, res) => {
  const { token, guildId, userId } = req.params;

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildMembers,
    ],
  });

  try {
    await client.login(token);
    const guild = await client.guilds.fetch(guildId);
    const member = await guild.members.fetch(userId);
    const inVoice = !!member.voice?.channel;

    res.json({ inVoice });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Discord query failed', details: err.message });
  } finally {
    client.destroy();
  }
});

app.listen(PORT, () => {
  console.log(`API läuft auf Port ${PORT}`);
});

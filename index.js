const express = require("express");
const cors = require("cors");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/getRoleByPosition/:botToken/:guildId/:position", async (req, res) => {
  const { botToken, guildId, position } = req.params;

  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  try {
    await client.login(botToken);

    const guild = await client.guilds.fetch(guildId);
    const roles = await guild.roles.fetch();

    const sorted = roles
      .filter((role) => role.name !== "@everyone")
      .sort((a, b) => b.position - a.position);

    const index = parseInt(position) - 1;
    const role = Array.from(sorted.values())[index];

    if (!role) return res.status(404).json({ error: "Keine Rolle gefunden" });

    // Nur die ID der Rolle zurückgeben
    res.json({
      roleId: role.id,
    });
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Abrufen der Rolle", details: err.message });
  } finally {
    client.destroy();
  }
});

app.listen(PORT, () => {
  console.log(`API läuft auf Port ${PORT}`);
});

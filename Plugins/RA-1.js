const fetch = require("node-fetch");

module.exports = {
  name: "Truecaller",
  alias: ["true","ra1"],
  description: "Send a random picture from the assets folder",
  start: async (Atlas, m, { inputCMD, text, doReact, prefix }) => {
    try {
      if (!text) {
        return m.reply("Please provide a valid number to search.");
      }

      await doReact("⌛");

      let res = await fetch(`https://inrl-web.onrender.com/api/truecaller?number=${text}`);

      if (!res.ok) {
        return m.reply(`API request failed with status ${res.status}`);
      }

      let json = await res.json();

      console.log('JSON response:', json);

      json.creator = 'RA-1';

      let result = '';
      for (let prop in json) {
        result += `• *${prop}:* ${json[prop]}\n`;
      }

      await Atlas.sendMessage(m.from, { text: result }, { quoted: m });
    } catch (error) {
      console.error(error);
      m.reply("An error occurred while processing the Truecaller command.");
    }
  },
};

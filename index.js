import express from "express";
import Kahoot from "kahoot.js-updated";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

let activeBots = []; // futó botok listája

app.get("/", (req, res) => {
  res.send("Kahoot Bot Server működik 🟢");
});

// ====== BOT FLOOD + AUTO ANSWER ======
app.post("/start", async (req, res) => {
  const { pin, name = "MateBot", count = 1, autoAnswer = true } = req.body;

  if (!pin) return res.json({ error: "No PIN provided." });

  for (let i = 0; i < count; i++) {
    const botName = `${name}_${i}`;
    const client = new Kahoot();

    client.join(pin, botName);

    client.on("Joined", () => {
      console.log(`Bot joined: ${botName}`);
    });

    client.on("QuestionStart", (question) => {
      if (autoAnswer) {
        const random = Math.floor(Math.random() * question.questionChoices.length);
        question.answer(random);
        console.log(`Bot ${botName} válaszolt automatikusan → ${random}`);
      }
    });

    client.on("Disconnect", () => {
      console.log(`Bot disconnected: ${botName}`);
    });

    activeBots.push(client);
  }

  res.json({ ok: true, message: `${count} bot csatlakozik...` });
});

// ===== LEÁLLÍTÁS =====
app.post("/stop", (req, res) => {
  activeBots.forEach(bot => bot.leave?.());
  activeBots = [];
  res.json({ ok: true, message: "Minden bot leállítva 🔴" });
});

app.listen(PORT, () => {
  console.log(`Bot szerver fut a ${PORT} porton`);
});

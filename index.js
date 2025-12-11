import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// hogy a Railway lássa, hogy él a szerver
app.get("/", (req, res) => {
  res.send("Kahoot bot server is running 🟢");
});

// ide fogsz majd POST-ot küldeni a weboldaladról (pin, név, stb.)
app.post("/start-bot", express.json(), (req, res) => {
  const { gamePin, name, count } = req.body || {};

  console.log("Bot kérés érkezett:", { gamePin, name, count });

  // IDE JÖN KÉSŐBB: itt indítod el a kahoot bote(ke)t

  res.json({ ok: true, message: "Bot indul (még csak teszt) 🚀" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

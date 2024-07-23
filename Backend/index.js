const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");

dotenv.config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/room", roomRoutes);

app.use("/sobre", (req, res) => {
    res.json({
        título: "CoolChat",
        descrição: "Chat insano para conversas insanas",
        autor: "Vinícius Sorgetz Alves"
    });
});

app.listen(port, () => {
    console.log("Rodando na porta " + port);
})
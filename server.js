import express from "express";
import { router } from "./routes/user.router.js";
import { connect } from "./models/model.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000; // usare la porta definito nel file dotenv

app.use(express.json());
app.use("/", router);

app.listen(port, async () => {
  //far partire il server al port designato
  console.log(`Server running on port ${port}`);
  await connect(); // chiamare la funzione per la connessione al db
});

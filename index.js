import express from "express";
import projectsRouter from "./routes/projects.js";
import helmet from "helmet";

const app = express();

app.use(express.json());
app.use(helmet());

const port = process.env.PORT || 5000;

app.get("/", (requset, response) => {
  response.send("Hello");
});

app.use("/projects", projectsRouter);

app.listen(port, () => console.log(`The server is running on port ${port}`));

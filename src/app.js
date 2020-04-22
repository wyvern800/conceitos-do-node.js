const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

//app.use("/repositories/:id", isValidUuid);

const repositories = [];

/*function isValidUuid(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).send("invalid uuid");
  }
  return next();
}*/

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).send("Repository doesn't exists");
  }

  /*const repository = {
    id,
    title,
    url,
    techs,
    likes: 0,
  };

  repositories[repositoryIndex] = repository;*/

  const repository = {
    ...repositories[repositoryIndex],
    url,
    title,
    techs,
  };

  repositories.splice(repositoryIndex, 1, repository);

  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Project not found." });
  }

  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).send("não existe");
  }
  ///parseInt(repositories[repositoryIndex].likes, 10) + 1
  const currentLikes = repositories[repositoryIndex].likes;

  const repository = {
    ...repositories[repositoryIndex],
    likes: currentLikes + 1,
  };

  repositories.splice(repositoryIndex, 1, repository);

  return response.status(200).send(repository);
});

module.exports = app;

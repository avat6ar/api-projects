import multer from "multer";
import { v4 as uuidv4 } from "uuid";

let projects = [];

export const getProjects = (requset, response) => {
  response.send(projects);
};

export const getProject = (request, response) => {
  const id = request.params.id;
  const project = projects.find((student) => student.id === id);
  if (project) {
    response.json(project);
  } else {
    response.send("student not found");
  }
};

export const addProject = (requset, response) => {
  const project = {
    id: uuidv4(),
    img: `https://avat6ar-api-projects.onrender.com/projects/img_project/${requset.file.filename}`,
    title: requset.body.title,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    link_github: requset.body.link_github,
    link: requset.body.link,
    html: requset.body.html,
    css: requset.body.css,
    js: requset.body.js,
    bootstrap: requset.body.bootstrap,
    react: requset.body.react,
  };
  projects.push(project);
  response.json(projects);
};

export const deleteProject = (request, response) => {
  const id = request.params.id;
  projects = projects.filter((project) => project.id !== id);
  response.json(projects);
};

export const updateProject = (request, response) => {
  const id = request.params.id;
  const { title, link_github, link } = request.body;
  let project = projects.find((student) => student.id === id);
  if (title) {
    project.title = title;
  }
  if (link_github) {
    project.link_github = link_github;
  }
  if (link) {
    project.link = link;
  }
  response.send(`Student with id ${id} has been updated`);
};

export const errHandler = (err, requset, response, next) => {
  if (err instanceof multer.MulterError) {
    response.json({
      success: 0,
      message: err.message,
    });
  }
};

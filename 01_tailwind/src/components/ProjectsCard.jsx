import React from "react";
import Card from "./Card";

const ProjectsCard = () => {
  const projects = [
    {
      id: 1,
      name: "Syntax Pro",
      tech: ["MERN"],
      description:
        "Learn and implement MERN stack on the go with ready-to-use concepts.",
    },
    {
      id: 2,
      name: "CartMe",
      tech: ["React", "IndexedDB", "CSS"],
      description:
        "Efficient data management across pages using IndexedDB with smooth UI animations.",
    },
    {
      id: 3,
      name: "iNotebook",
      tech: ["React", "MERN", "JWT"],
      description:
        "Used Context API, React hooks, JWT authentication, middleware, and localStorage for a full-stack notes app.",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className=" flex justify-center">
        <h2 className="flex justify-center text-2xl w-full">
          My <span className="text-amber-700"> Projects</span>
        </h2>
      </div>
      <div className=" flex flex-row flex-wrap justify-evenly gap-10">
        {projects.map((project) => (
          <div key={project.id}>
            <Card
              name={project.name}
              tech={project.tech}
              description={project.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsCard;

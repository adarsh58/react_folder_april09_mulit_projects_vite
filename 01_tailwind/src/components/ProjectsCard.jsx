import { ShoppingCart,Code,NotebookPen } from "lucide-react";
import Card from "./Card";

const ProjectsCard = () => {
  const projects = [
    {
      id: 1,
      name: "Syntax Pro",
      tech: ["MERN"],
      description:
        "Learn and implement MERN stack on the go with ready-to-use concepts.",
        img: <Code color="black" size={50}/>,
    },
    {
      id: 2,
      name: "CartMe",
      tech: ["React", "IndexedDB", "CSS"],
      description:
        "Efficient data management across pages using IndexedDB with smooth UI animations.",
         img: <ShoppingCart  color="black" size={50}/>,
    },
    {
      id: 3,
      name: "iNotebook",
      tech: ["React", "MERN", "JWT"],
      description:
        "Used Context API, React hooks, JWT authentication, middleware, and localStorage for a full-stack notes app.",
         img: <NotebookPen  color="black" size={50}/>,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full h-full ">
      <div className=" flex justify-center mt-5 mb-5">
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
              img={project.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsCard;

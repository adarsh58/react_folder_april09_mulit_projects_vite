import heroImg from "../assets/Profile.png";
import ProjectsCard from "./ProjectsCard";
import SkillBar from "./SkillBar";
const AboutMe = () => {
  return (
    <section>
      <div className="flex flex-col justify-start gap-2  bg-black text-white p-2 h-fit w-full">
        <h2 className="flex justify-center text-3xl w-full">
          About <span className="text-amber-700"> Me</span>
        </h2>
        <div className=" flex flex-row justify-center items-center gap-4 p-4 rounded-lg">
          <div className="flex flex-row justify-center items-center h-70 w-120 rounded-full">
            <img
              src={heroImg}
              alt="Adarsh Sharma"
              className="w-1/2 h-full object-cover object-[100%_30%] rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-4 p-4 rounded-lg">
          <p className="text-lg">
            I’m a full-stack developer specializing in backend development using
            C# and .NET APIs, while also creating responsive and modern user
            interfaces with React. With experience in SQL, MERN stack, and
            Android, I enjoy developing end-to-end applications that are both
            scalable and user-friendly. I’m passionate about writing clean,
            maintainable code and solving practical problems through technology.
          </p>
        </div>
        <div className=" flex justify-center">
          <h2 className="flex justify-center text-2xl w-full">
            My <span className="text-amber-700"> Skills</span>
          </h2>
        </div>
        <div className="bg-black  ">
          <SkillBar name="C#" level={99} />
          <SkillBar name="Web API" level={90} />
          <SkillBar name=".Net Core" level={90} />
          <SkillBar name="SQL" level={80} />
          <SkillBar name="React" level={80} />
          <SkillBar name="MERN" level={65} />
          <SkillBar name="JS" level={70} />
          
        </div>
        <div>
            <ProjectsCard/>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

import { Phone,Mail,Computer } from "lucide-react";
import heroImg from "../assets/Profile.png";
const HeroSection = () => {
  return (
    <section>
    <div className="flex justify-between align-items gap-2 bg-black text-white p-2 h-150 w-full">
      {/* Left section */}
      <div className="w-1/2 p-4 flex flex-col justify-start items-start gap-4">
        <h1 className='text-3xl font-family-["Poppins", "sans-serif"]'>
          Hello!
        </h1>
        <h2 className='text-3xl font-family-["Poppins", "sans-serif"]'>
          I am <span className="text-amber-700">Adarsh Sharma</span>
        </h2>
        <h2 className="text-2xl text-amber-700">Full stack developer</h2>
        <p className="text-lg">
          I’m a software developer with experience in building scalable
          applications using C#, .NET APIs, SQL, and React. I enjoy creating
          clean, efficient solutions and continuously improving my full-stack
          development skills across MERN and Android platforms.
        </p>
        <button className=" bg-amber-700 text-white px-4 py-2 rounded hover:bg-white hover:text-amber-700 transition duration-300">
          Let's Talk
        </button>
        <div className="mt-2 w-1/4 flex justify-between">
          <Phone color="#f97316" />
          <Mail color="#f97316"/>
          <Computer color="#f97316"/>
        </div>
      </div>
      {/* Right section */}
      <div className="w-1/2 p-7 pt-8">
        {" "}
        {/* Added pt-8 for padding-top */}
        <img
          src={heroImg}
          alt="Adarsh Sharma"
          className="w-full h-full object-cover object-[0%_30%] "
        />
      </div>
    </div>
    </section>
  );
};

export default HeroSection;

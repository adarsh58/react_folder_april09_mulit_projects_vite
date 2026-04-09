const SkillBar = ({ name, level }) => {
  return (
     <div className="flex justify-center items-start w-full">
    <div className="mb-3 w-1/2">
      <h3 className="text-white tracking-widest text-sm mb-2">{name}</h3>
     
      <div className="h-3 w-full bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-500 rounded-full transition-all duration-1000"
          style={{ width: `${level}%` }}
        ></div>
      </div>
      </div>
    </div>
  );
};

export default SkillBar;

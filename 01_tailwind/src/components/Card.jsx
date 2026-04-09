import {Code}  from "lucide-react";

const Card = ({ name, tech, description }) => {
  return (
    <div className='bg-amber-700 w-70 h-80 flex flex-col justify-start items-center pt-5 rounded-2xl mb-10 mt-1'>
      <div>
        <Code />
      </div>
      <h3 className='text-white text-lg mt-10'>{name}</h3> 
        <p className='text-white text-sm mt-3 px-4 text-center'>{description}</p> 
    </div>
  )
}

export default Card

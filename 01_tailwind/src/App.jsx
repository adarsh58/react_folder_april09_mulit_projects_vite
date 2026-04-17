
import AboutMe from './components/AboutMe'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className='flex flex-col bg-linear-to-r from-orange-400 to-orange-600 h-full w-full'>
    
     <div className='bg-black h-full m-10 rounded-4xl shadow-lg drop-shadow-amber-300 '>
    <Navbar/> 
      <HeroSection/>
      <AboutMe/>
     </div>
    </div>
  )
}

export default App

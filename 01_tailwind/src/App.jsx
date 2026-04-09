import './App.css'
import AboutMe from './components/AboutMe'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className='flex flex-col h-full w-full'>
      <Navbar/> 
      <HeroSection/>
      <AboutMe/>
    </div>
  )
}

export default App

import './App.css'
import Header from "../components/header.jsx";
import Home from "../components/home.jsx";
import Calculator from '../components/Calculator.jsx';
import SolarImpactCalculator from '../components/SolarImpactCalculator.jsx';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import ImageCarousel from '../components/ImageCarousel.jsx'; 

export default function App() {
  return (
    <main>
      
      {/* <h2>Hello Friend</h2> */}
      
    <Header></Header>
      <ImageCarousel />
      <Home>
      <Calculator></Calculator>
      </Home>
      <Calculator></Calculator>
      <h1 className='WelcomeCarsouel'>Welcome to Solar Impact Calculator</h1>
      <SolarImpactCalculator />
     
    </main>
  )
}

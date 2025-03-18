import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import GenAlpha from './components/GenAlpha';
import OurProducts from './components/OurProducts';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Candies from './components/Candies';
import Home from './components/Home';

function App() {

  return (
    <div className='min-h-screen flex flex-col'>
    <Router>
      <Navbar/>
      <div className='mt-20 flex-1'>
      <Routes>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/gen-alpha' element={<GenAlpha/>}/>
        <Route path='/our-expertise' element={<OurProducts/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/raw-radicals' element={<Candies/>}/>
      </Routes>
      </div>
      <Footer/>
    </Router>
    </div>
  )
}

export default App

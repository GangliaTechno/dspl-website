import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import ProductService from './components/ProductService';
import OurProducts from './components/OurProducts';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {

  return (
    <div className='min-h-screen flex flex-col'>
    <Router>
      <Navbar/>
      <div className='mt-20 flex-1'>
      <Routes>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/productService' element={<ProductService/>}/>
        <Route path='/our-expertise' element={<OurProducts/>}/>
        <Route path='/' element={<AboutUs/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
      </Routes>
      </div>
      <Footer/>
    </Router>
    </div>
  )
}

export default App

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BrandingEcommerce from './components/BrandingEcommerce';
import EdTechPage from './components/EdTech';
import ResearchDevelopmentPage from './components/Research&Development';

function App() {

  return (
    <div className='min-h-screen flex flex-col'>
    <Router>
      <Navbar/>
      <div className='mt-20 flex-1'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/branding' element={<BrandingEcommerce/>}/>
        <Route path='/edtech' element={<EdTechPage/>}/>
        <Route path='/research' element={<ResearchDevelopmentPage/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
      </Routes>
      </div>
      <Footer/>
    </Router>
    </div>
  )
}

export default App

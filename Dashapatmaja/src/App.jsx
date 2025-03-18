import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import ProductService from './components/ProductService';
import OurProducts from './components/OurProducts';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/productService' element={<ProductService/>}/>
        <Route path='/our-expertise' element={<OurProducts/>}/>
      </Routes>
    </Router>
  )
}

export default App

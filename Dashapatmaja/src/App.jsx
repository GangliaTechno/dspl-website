import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<AboutUs/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
      </Routes>
    </Router>
  )
}

export default App

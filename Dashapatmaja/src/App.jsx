import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import Home from './components/Home';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App

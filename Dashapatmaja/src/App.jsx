import './App.css'
import './components/AboutUs'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './components/AboutUs';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/about' element={<AboutUs/>}/>
      </Routes>
    </Router>
  )
}

export default App

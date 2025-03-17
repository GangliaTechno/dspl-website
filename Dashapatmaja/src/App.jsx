import './App.css'
import './components/AboutUs'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import BrandingEcommerce from './components/BrandingEcommerce';
import EdTechPage from './components/EdTech';
import ResearchDevelopmentPage from './components/Research&Development';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/branding' element={<BrandingEcommerce/>}/>
        <Route path='/edtech' element={<EdTechPage/>}/>
        <Route path='/research' element={<ResearchDevelopmentPage/>}/>
      </Routes>
    </Router>
  )
}

export default App

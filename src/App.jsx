import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Brands from './pages/Brands';
import Marketing from './pages/Marketing';
import Branding from './pages/Branding';
import Ecommerce from './pages/Ecommerce';
import Contact from './pages/Contact';
import WorkWithUsModal from './components/WorkWithUsModal';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div id="app-root">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/branding" element={<Branding />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <WorkWithUsModal />
      </div>

      <style>{`
        #app-root {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .main-content {
          flex-grow: 1;
        }
      `}</style>
    </Router>
  );
}

export default App;


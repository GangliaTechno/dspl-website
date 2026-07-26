import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const App = ({ pages }) => (
  <BrowserRouter>
    <AppRoutes pages={pages} />
  </BrowserRouter>
);

export default App;

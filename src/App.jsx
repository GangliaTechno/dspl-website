import { BrowserRouter } from 'react-router';
import AppRoutes from './AppRoutes';

const App = ({ pages }) => (
  <BrowserRouter>
    <AppRoutes pages={pages} />
  </BrowserRouter>
);

export default App;

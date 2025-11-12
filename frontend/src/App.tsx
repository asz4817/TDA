import { Route, createBrowserRouter,  createRoutesFromElements, RouterProvider} from 'react-router-dom'; 
import HomePage from './pages/HomePage';
import MainLayout from './layout/MainLayout';
import ContactUs from './pages/ContactUs';
import TXDC from './pages/TXDC2026';
import Registration from './pages/Registration';
import AboutUs from './components/AboutUs';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/AboutUs' element={<AboutUs />}/>
      <Route path='/contactUs' element={<ContactUs />}/>
      <Route path='/txdc2026' element={<TXDC />} />
      <Route path='/txdc2026/register' element={<Registration />} />

      
    </Route>
  )
);


function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App

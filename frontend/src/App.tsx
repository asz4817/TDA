import { Route, createBrowserRouter,  createRoutesFromElements, RouterProvider} from 'react-router-dom'; 
import HomePage from './pages/HomePage';
import MainLayout from './layout/MainLayout';
import ContactUs from './pages/ContactUs';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/contact' element={<ContactUs />}/>

      
    </Route>
  )
);


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App

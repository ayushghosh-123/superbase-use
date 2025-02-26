import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements} from 'react-router-dom';
import App from './App.jsx';
import Signup from './Component/Signup.jsx';
import Signin from './Component/Signin.jsx';
import Dashboard from './Component/Dashbord.jsx'; // Ensure correct spelling (Dashboard vs Dashbord)
import { AuthContextProvider } from './assets/Context/AuthContext.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <h1 className='text-center pt-4 text-3xl text-white'>React Superbase</h1>
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);



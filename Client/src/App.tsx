import './App.css';
import "../src/models";
import React, { useState } from 'react';
import { AWS_Services, Library } from './lib/library';
import About from "./pages/About/About";
import Add from "./pages/Add/Add";
import Contact from "./pages/Contact/Contact";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Tip from "./pages/Tip/Tip";
import Events from './pages/Events/Events';
import Navbar from './layout/Navbar';
import Confirm from './pages/Confirm/Confirm';
import Admin from './pages/Admin/Admin';
import awsmobile from './aws-exports';
import useGetUser from './hooks/useGetUser';
import Test from './pages/Test/Test';
const { Amplify } = AWS_Services;
const { Route, Routes } = Library.Router;
Amplify.configure(awsmobile);

const App = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useGetUser({ setAuthOpen, setLoading });
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/addsongs" element={<Add />} />
        <Route path="/admin" element={<Admin currentUser={currentUser} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/events' element={<Events />} />
        <Route path='/test' element={<Test />} />
        <Route path="/tip" element={<Tip />} />
        <Route path="/confirm" element={<Confirm />} />
      </Routes>
    </div>
  );
}

export default App;
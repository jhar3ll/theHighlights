import React from 'react';
import './App.css';
import { Library } from './lib/library';
import About from "./pages/About/About";
import Add from "./pages/Add/Add";
import Contact from "./pages/Contact/Contact";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Tip from "./pages/Tip/Tip";
import Events from './pages/Events/Events';
import Navbar from './layout/Navbar';
import Confirm from './pages/Confirm/Confirm';

const { Route, Routes } = Library.Router;
function App() {
  return (
    <div className="App" style={{ backgroundColor: "black", color: "white" }}>
      <Navbar />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/addsongs" element={<Add />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/events' element={<Events />} />
        <Route path="/tip" element={<Tip />} />
        <Route path="/confirm" element={<Confirm />} />
      </Routes>
    </div>
  );
}

export default App;

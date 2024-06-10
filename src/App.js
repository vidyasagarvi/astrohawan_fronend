
import React from 'react';
import Pujas from './components/Pujas';
import NavBar from './components/navbar/NavBar';
import Home from './components/hero/Home';
import Footer from './components/Footer';

const App = () => {

  return (
    <div>
      <NavBar/>
      <Home/>
      <Pujas />
     <Footer/>
    </div>
  );
};

export default App;

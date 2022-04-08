import './App.css';
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from './components/HomeScreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Route exact path="/">
              <HomeScreen />
          </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Front-end HouseFlips</h1>
      </div>
    </Provider>
  );
}

export default App;

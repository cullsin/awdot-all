import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import './index.scss';
import { store, persistor } from './store';

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

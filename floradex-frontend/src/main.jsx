import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store'; // Import your Redux store
import './styles/index.css';
import App from './App.jsx';

console.log("main.jsx is running");

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      {console.log("Rendering App in main.jsx")}
      <App />
    </StrictMode>
  </Provider>
);
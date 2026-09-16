/** React Bootstrap Styling. */
import 'bootstrap/dist/css/bootstrap.min.css'

/** React Imports. */
import App from "./App";
import { BrowserRouter } from "react-router-dom"
import { createRoot } from "react-dom/client";

/** Personal Imports. */
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

/** App Structure. */
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
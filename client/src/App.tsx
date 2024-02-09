import React from 'react';
import {Box, Grommet} from "grommet";
import {BrowserRouter} from "react-router-dom";
import {HomePage} from "./pages/home";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {AppRoutes} from "./Routes";
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Grommet full>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <ToastContainer />
      </Grommet>
    </UserProvider>
  );
}

export default App;

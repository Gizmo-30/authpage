import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SingUp from "./Components/SingUp";
import SignIn from "./Components/SignIn";
import Users from "./Components/Users";
import {ErrorProvider} from "./Methods/ErrorContext";
import {SuccessProvider} from "./Methods/SuccessContext";
import axios from "axios";
axios.defaults.baseURL = "https://authpage-server.vercel.app";

function App() {
  return (
      <SuccessProvider>
          <ErrorProvider>
              <BrowserRouter>
                <div className="App d-flex align-items-center justify-content-center vh-100 mx-auto vw-70 p-2" style={{maxWidth: '1100px'}}>
                  <Routes>
                    <Route path='/signup' element={<SingUp />}></Route>
                    <Route path='/' element={<SignIn />}></Route>
                    <Route path='/users' element={<Users />}></Route>
                  </Routes>
                </div>
              </BrowserRouter>
          </ErrorProvider>
      </SuccessProvider>
  );
}


export default App;

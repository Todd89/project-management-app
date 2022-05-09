import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import WelcomeRoute from './components/pages/WelcomeRoute/WelcomeRoute';
import Footer from './components/pages/Footer/Footer';
import MainRoute from './components/pages/MainRoute/MainRoute';
import BoardRoute from './components/pages/BoardRoute/BoardRoute';
import ErrorRoute from './components/pages/ErrorRoute/ErrorRoute';
import Login from './components/pages/Login/Login';
import SignUp from './components/pages/SignUp/SignUp';
import PrivateRoute from './hoc/PrivateRoute';

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" element={<WelcomeRoute />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/main"
            element={
              <PrivateRoute>
                <MainRoute />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/board"
            element={
              <PrivateRoute>
                <BoardRoute />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/*" element={<ErrorRoute />}></Route>
        </Routes>
        <Footer />
      </HashRouter>
    </React.StrictMode>
  );
};

export default App;

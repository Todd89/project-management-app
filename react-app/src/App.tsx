import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import WelcomeRoute from './components/pages/WelcomeRoute/WelcomeRoute';
import Footer from './components/pages/Footer/Footer';
import MainRoute from './components/pages/MainRoute/MainRoute';
import BoardRoute from './components/pages/BoardRoute/BoardRoute';
import ErrorRoute from './components/pages/ErrorRoute/ErrorRoute';
import Login from './components/pages/loginPage/authorizForm/authorizeForm';
import SignUp from './components/pages/loginPage/registerForm/registerForm';
import EditProfile from './components/pages/loginPage/editProfileForm/editProfileForm';
import PrivateRoute from './hoc/PrivateRoute';
import { useSelector } from 'react-redux';
import { IState } from './interface/types';

const App: React.FC = () => {
  const userState = useSelector((state: IState) => state.loginData);
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<WelcomeRoute />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/edit" element={<EditProfile />}></Route>
        <Route path="/main" element={<MainRoute />}></Route>
        <Route
          path="/board"
          element={
            <PrivateRoute token={userState.token}>
              <BoardRoute />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/*" element={<ErrorRoute />}></Route>
      </Routes>
      <Footer />
    </HashRouter>
  );
};

export default App;

// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Registration from "./pages/Registration";
import DetailedView from './pages/DetailedView';
import Slider from "./pages/Slider";
import React from "react";
import ContactUs from "./pages/ContactUs";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserApproval from './pages/admin/UserApproval'
import AdminFile from './pages/admin/AdminFile'
import AdmminQueries from './pages/admin/AdminQueries'


function App() {
  return (
    <Router>
      <div className="App">
      <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"    />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>}/>
          <Route path="/registration" element={ <Layout><Registration /></Layout>}/>
          <Route path="/details/:id" element={<Layout><DetailedView/></Layout>} />
          <Route path="/login-signup" element={<Slider />} />
          <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
          <Route path='/admin-user-approval' element={<UserApproval/>}/>
          <Route path='/admin' element={<AdminFile/>}/>
          <Route path='/admin-queries' element={<AdmminQueries/>}/>


        </Routes>
      </div>
    </Router>
  );
}

export default App;

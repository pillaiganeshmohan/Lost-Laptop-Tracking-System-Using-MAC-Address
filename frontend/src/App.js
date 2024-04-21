// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Registration from "./pages/Registration";
import DetailedView from './pages/DetailedView';
import Slider from "./pages/Slider";
import React from "react";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>}/>
          <Route path="/registration" element={ <Layout><Registration /></Layout>}/>
          <Route path="/details" element={<Layout><DetailedView/></Layout>} />
          <Route path="/slider" element={<Slider />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

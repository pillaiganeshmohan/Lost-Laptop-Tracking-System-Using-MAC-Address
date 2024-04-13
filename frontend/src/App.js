import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Registration from './pages/Registration';
import DetailedView from './pages/DetailedView';

function App() {
  return (
    <Router>
    <div className="App">
   
        <Routes>
        <Route path="/" element={<Layout><Home/></Layout>} />
        <Route path="/registration" element={<Layout><Registration/></Layout>} />
        <Route path="/details" element={<Layout><DetailedView/></Layout>} />
        
        </Routes>
     
    </div>
    </Router>
  );
}

export default App;

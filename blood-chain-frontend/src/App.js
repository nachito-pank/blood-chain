import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import DonorDashboard from './components/DonorDashboard';
import AdminPanel from './components/AdminPanel';
import DonationForm from './components/DonationForm';
import BloodStock from './components/BloodStock';
import Tracking from './components/Tracking';
import './App.css'; // Assurez-vous d'avoir le fichier CSS
import dashboard from './dashboard.ico';
import donor from './donor.ico';
import login from './login.ico';
import panel from './panel.ico';
import sign from './sign.ico';
import stock from './stock.ico';
import track from './track.ico';
import logo from './logo.png'

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1><img src={logo} alt="Logo" className="logo" />BLOOD-CHAIN</h1>

          {/* Navbar */}
          <nav className="navbar">

            <ul>
              <li>
                <Link to="/"><img src={sign} />Sign Up</Link>
              </li>
              <li>
                <Link to="/login"><img src={login} />Login</Link>
              </li>
              <li>
                <Link to="/dashboard"><img src={dashboard} />Donor Dashboard</Link>
              </li>
              <li>
                <Link to="/admin"><img src={panel} />Admin Panel</Link>
              </li>
              <li>
                <Link to="/donate"><img src={donor} />Donate Blood</Link>
              </li>
              <li>
                <Link to="/bloodstock"><img src={stock} />Blood Stock</Link>
              </li>
              <li>
                <Link to="/tracking"><img src={track} />Tracking</Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DonorDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/donate" element={<DonationForm />} />
          <Route path="/bloodstock" element={<BloodStock />} />
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

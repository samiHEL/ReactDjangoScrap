// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [brand, setBrand] = useState('');
//   const [city, setCity] = useState('');
//   const [loggedIn, setLoggedIn] = useState(false);

//   const handleLogin = () => {
//     axios.post('http://localhost:8000/api/login', { username, password })
//       .then(response => {
//         alert(response.data.message);
//         setLoggedIn(true);
//       })
//       .catch(error => alert('Login failed'));
//   };

//   const handleRegister = () => {
//     axios.post('http://localhost:8000/api/register', { username, password })
//       .then(response => alert(response.data.message))
//       .catch(error => alert('Registration failed'));
//   };

//   const handleSubmit = () => {
//     axios.post('http://localhost:8000/api/submit', { brand, city })
//       .then(response => alert(response.data.message))
//       .catch(error => alert('Submission failed'));
//   };

// //   if (!loggedIn) {
// //     return (
// //       <div>
// //         <h2>Login or Register</h2>
// //         <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
// //         <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
// //         <button onClick={handleLogin}>Login</button>
// //         <button onClick={handleRegister}>Register</button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       <h2>Form Submission</h2>
// //       <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="Enseigne à scraper" />
// //       <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Nom de la Ville" />
// //       <button onClick={handleSubmit}>Submit</button>
// //     </div>
// //   );
// // }

// // export default App;


//   if (!loggedIn) {
//     return (
//       <div className="background">
//         <div className="form-container">
//           <div className="form-box">
//             <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
//             <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
//             <button onClick={handleLogin}>Login</button>
//             <button onClick={handleRegister}>Register</button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="background">
//       <div className="form-container">
//         <div className="form-box">
//           <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="Enseigne à scraper" />
//           <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Nom de la Ville" />
//           <button onClick={handleSubmit}>Submit</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Contact from './Contact';
import Home from './Home';
import Scrap from './Scrap';
import './App.css'
import LandingPage from './LandingPage'
function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };
  return (
    <Router>
      <div className="background">
        <NavBar username={username} />
        <Routes>
          <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Home onLogin={handleLogin} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/scrap" element={isLoggedIn ? <Scrap /> : <Navigate to="/login" replace />} />
          // ... other routes
        </Routes>
      </div>
    </Router>
  );
}

export default App;


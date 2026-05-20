import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Navigate } from 'react-router-dom'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Trips from './components/Trips';
import Logs from './components/Logs';
import Drivers from './components/Drivers';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Logout from './components/Logout';
import Sidebar from './components/Sidebar';
import TripDetails from './components/TripDetails';
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to="/home" replace />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/sidebar" element=
            {
              <ProtectedRoute>
                <Sidebar/>
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="trips" element={<Trips/>} />
              <Route path="view_trip" element={<TripDetails/>} />
              <Route path="logs" element={<Logs/>} />
              <Route path="drivers" element={<Drivers/>} />
              <Route path="reports" element={<Reports/>} />
              <Route path="settings" element={<Settings/>} />
              <Route path="logout" element={<Logout/>} />
            </Route>
            <Route path="*" element={<Navigate to="/home" replace />}/>
          </Routes>
  );


  // const [count, setCount] = useState(0)

  // return (
  //   // <div className="App">
  //   //   <Home></Home>
  //     {/* <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src="/vite.svg" className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://reactjs.org" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p> */}
  //   // </div>
  // )
}

export default App

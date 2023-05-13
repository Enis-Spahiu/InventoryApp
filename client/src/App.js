import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './Components/Home';
import Login from "./Components/Login";
import Register from "./Components/Register";
import { useEffect } from 'react';
import axios from 'axios'

function App() {

  useEffect(() => {
    if(localStorage.getItem("flag") !== null){
      const interval = setInterval(() => {
        axios.get(`http://localhost:8000/api/refresh`, {withCredentials: true})
          .then(res => {
            console.log(res);
            localStorage.setItem("accToken", res.data.accessToken)
          })
          .catch(err => {
            console.log(err);
            // <Navigate to={'/login'} />
          })
      }, 1000 * 60 * 3.5);
    
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line
  }, [localStorage.getItem("flag")])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/home' element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

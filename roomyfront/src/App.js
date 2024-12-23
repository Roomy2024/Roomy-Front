
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from './component/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './component/NavBar';
import Login from './component/Login';

function App() {
   const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/community')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
      <Router>
        <Header></Header>
        <NavBar></NavBar>
      </Router>
      
    );
}

export default App;
import React ,{useEffect,useState} from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios'
const App = () => {
  const [countries, setCountries] = useState ([])
  useEffect ( () => {
    axios.get('https://https://restcountries.eu/#api-endpoints-all.eu/')
    .then( response => {
      console.log(response.data)
      setCountries(response.data)
    })
  },[])
  let flag = 0;
  //filtercountries
  const [filtercountries, setNewFilterCountries] = useState([])
  setNewFilterCountries( filtercountries.concat(filtercountries))
  const handleCountries = (event) => {
    setNewFilterCountries(event.target.value)
  }
  
  
    return (
      <form>
        <div>
        find countries
        <input value = {filtercountries}
         onChange = {handleCountries}
        />
      </div>
      </form>
    
      
    
    )
  }
  
  

export default App;

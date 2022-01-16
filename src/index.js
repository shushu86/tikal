import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MapData from './components/MapData/MapData';
import PlanetsChart from './components/PlanetsChart/PlanetsChart';
import './style.css';

const App = () => {
  const [vehicles, setVehicles] = useState();
  const [planets, setPlanets] = useState();

  const getData = async () => {
    try {
      const res = await axios.get('https://swapi.py4e.com/api/vehicles/');
      setVehicles(res.data.results);
    }
    catch(err) {
      console.log(err);
    }

    try {
      const res = await axios.get('https://swapi.py4e.com/api/planets/');
      setPlanets(res.data.results);
    }
    catch(err) {
      console.log(err);
    }
  } 
    
  useEffect(() => {
    getData();
  }, []);

return <div>
        {vehicles && <MapData vehicles={vehicles} />}
        {planets && <PlanetsChart planets={planets} />}
      </div>
}

ReactDOM.render(<App /> ,document.querySelector('#root'))
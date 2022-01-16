import React, { useState } from "react";
import axios from "axios";
import './style.css';

const MapData = ({ vehicles }) => {
  const [maxVehicle, setMaxVehicle] = useState(null);
  const vehiclesObjArray = [];

  const getData = async () => {
    for (let i = 0; i < vehicles.length; i++) {
      const vehicle = vehicles[i];
      let vehicleObj = {
        max_population: 0,
        name: vehicle.name,
        pilots: [],
      };

      for (let j = 0; j < vehicle.pilots.length; j++) {
        const pilot = vehicle.pilots[j];
        const pilotRes = await axios.get(pilot);
        const planetRes = await axios.get(pilotRes.data.homeworld);
    
        let pilotObj = {
          name: pilotRes.data.name,
          homePlanet: {
            name: planetRes.data.name,
            population: parseInt(planetRes.data.population),
          },
        };
        vehicleObj.pilots.push(pilotObj);
        vehicleObj.max_population += pilotObj.homePlanet.population;
      }

      vehiclesObjArray.push(vehicleObj);
    }

    const max =
      vehiclesObjArray &&
      vehiclesObjArray.reduce(function (prev, current) {
        return prev.max_population > current.max_population ? prev : current;
      });
    
    setMaxVehicle(max);
  };

  if (maxVehicle == null) {
    getData();
  }


  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              {`Vehicle name with the largest sum: ${maxVehicle && maxVehicle.name}`}
            </td>
          </tr>
          <tr>
            <td>
              Related home planets and their respective population:
            </td>
            <td>
              {maxVehicle && maxVehicle.pilots.map((pilot) => {
                return <div key={pilot.name}>{pilot.homePlanet.name} - {pilot.homePlanet.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
              })}
            </td>
          </tr>
          <tr>
            <td>
              Related pilot names:
            </td>
            <td>
              {maxVehicle && maxVehicle.pilots.map((pilot) => {
                return <div key={pilot.name}>{pilot.name}</div>
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MapData;

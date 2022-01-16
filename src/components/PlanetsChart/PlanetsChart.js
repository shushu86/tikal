import React from 'react'
import './style.css';

const PlanetsChart = ({ planets }) => {
    
    const chartPlanets = planets.filter((planet) => {
        return planet.name === 'Tatooine' ||
               planet.name === 'Alderaan' ||
               planet.name === 'Naboo' ||
               planet.name === 'Bespin' ||
               planet.name === 'Endor'
    });
    
    const sumPopulation = chartPlanets.reduce((accumulator, current) => accumulator + parseInt(current.population), 0);

    function percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    } 

    return (
        <div className="container">
            {chartPlanets.map((planet) => (
                <div className="barContainer" key={planet.name}>
                    <div className="legend">{planet.population}</div>
                    <div className="bar" style={{ height: percentage(planet.population , sumPopulation) + 'vh' }}></div>
                    <div className="title">{planet.name}</div>
                </div>
            ))}    
        </div>
    )
}

export default PlanetsChart;

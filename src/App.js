import React from 'react'; // Asegúrate de importar React al principio del archivo
import './App.css';
import MealCalculator from './MealCalculator'; // Importamos el componente MealCalculator

function App() {
  return (
    <div className="App">
      <MealCalculator /> {/* Usamos el componente MealCalculator */}
    </div>
  );
}

export default App; // Exportamos el componente App
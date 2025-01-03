import React, { useState } from 'react';

const MealCalculator = () => {
  const [selectedMeals, setSelectedMeals] = useState({
    desayuno: '',
    comida: '',
    merienda: '',
    cena: ''
  });

  const CALORIE_LIMIT = 1492;
  const LOW_CALORIE_THRESHOLD = CALORIE_LIMIT - 100;

  const meals = {
    desayuno: [
      { id: 1, name: 'Tostadas con huevos', description: 'Tostadas con huevos: 65 g pan Bimbo (160 kcal), 3 huevos (180 kcal), 10 g hummus (25 kcal), 120 ml leche desnatada (45 kcal)', calories: 410 },
      { id: 2, name: 'Pan con chocolate', description: 'Pan con chocolate: 65 g pan Bimbo (160 kcal), 65 g fruta (60 kcal), 120 ml leche desnatada (45 kcal)', calories: 325 },
      { id: 3, name: 'Tortitas de avena', description: 'Tortitas: 40 g avena (120 kcal), 120 ml leche desnatada, 1 huevo (60 kcal), 120 ml leche desnatada para el café (45 kcal)', calories: 300 }
    ],
    comida: [
      { id: 1, name: 'Soja texturizada con patatas', description: 'Soja texturizada con patatas: 60 g soja texturizada (180 kcal), 190 g tomate triturado (57 kcal), 300 g patata (240 kcal), 100 g cebolla (40 kcal)', calories: 517 },
      { id: 2, name: 'Garbanzos con tiras vegetarianas', description: 'Garbanzos con tiras vegetarianas: 250 g garbanzos cocidos (200 kcal), 170 g tiras vegetarianas del Lidl (290 kcal), 85 g verduras', calories: 520 },
      { id: 3, name: 'Ñoquis con tofu', description: 'Ñoquis con tofu: 200 g ñoquis (215.38 kcal), 150 g tofu (163.64 kcal), 5 ml aceite de oliva (45 kcal)', calories: 424 }
    ],
    merienda: [
      { id: 1, name: 'Tortitas de arroz con chocolate', description: 'Tortitas de arroz con chocolate: 3 tortitas (97.5 kcal), 90 g plátano (90 kcal), 120 ml leche desnatada (45 kcal)', calories: 232.5 },
      { id: 2, name: 'Tortitas con huevo', description: 'Tortitas con huevo: 30 g tortitas de maíz (4 unidades) (120 kcal), 2 huevos medianos (120 kcal), 120 ml leche desnatada (45 kcal)', calories: 285 },
      { id: 3, name: 'Tortilla de queso', description: 'Tortilla de queso: 2 huevos medianos (120 kcal), 20 g queso (80 kcal), 120 ml leche desnatada (45 kcal)', calories: 245 }
    ],
    cena: [
      { id: 1, name: 'Hamburguesa', description: 'Hamburguesa: Hamburguesa Lidl pan Maxi Burger (350 kcal), queso High Protein (20 g, 47 kcal), 85 g verduras', calories: 435 },
      { id: 2, name: 'Pad Thai', description: 'Pad Thai: 45 g fideos de arroz, 80 g tofu, 20 g verduras, 5 g salsa de soja, 5 g AOVE', calories: 95 },
      { id: 3, name: 'Lentejas con seitán', description: 'Lentejas con seitán: 140 g lentejas cocidas, 140 g seitán, 115 g verduras', calories: 395 }
    ]
  };

  const handleMealSelection = (mealType, id) => {
    setSelectedMeals({
      ...selectedMeals,
      [mealType]: id
    });
  };

  const getTotalCalories = () => {
    let total = 0;
    Object.entries(selectedMeals).forEach(([mealType, id]) => {
      if (id) {
        const meal = meals[mealType].find(m => m.id === parseInt(id));
        if (meal) total += meal.calories;
      }
    });
    return total;
  };

  const getCalorieStatus = (totalCalories) => {
    if (totalCalories > CALORIE_LIMIT) {
      return {
        type: 'destructive',
        message: `¡Atención! Te excedes de tu límite de calorías por ${(totalCalories - CALORIE_LIMIT).toFixed(1)} kcal`,
        title: '⚠️ Exceso de calorías'
      };
    } else if (totalCalories < LOW_CALORIE_THRESHOLD) {
      return {
        type: 'warning',
        message: `Te faltan ${(CALORIE_LIMIT - totalCalories).toFixed(1)} kcal para llegar a tu objetivo. Considera añadir algo más a tu dieta.`,
        title: '⚠️ Calorías insuficientes'
      };
    } else {
      return {
        type: 'success',
        message: 'Tu plan de comidas está dentro del rango ideal de calorías.',
        title: '✅ Plan equilibrado'
      };
    }
  };

  const renderMealSection = (mealType, title) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <select 
        value={selectedMeals[mealType]} 
        onChange={(e) => handleMealSelection(mealType, e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">Selecciona una opción</option>
        {meals[mealType].map(meal => (
          <option key={meal.id} value={meal.id}>
            {meal.name} ({meal.calories} kcal)
          </option>
        ))}
      </select>
      {selectedMeals[mealType] && (
        <p className="text-sm text-gray-600">
          {meals[mealType].find(m => m.id === parseInt(selectedMeals[mealType]))?.description}
        </p>
      )}
    </div>
  );

  const totalCalories = getTotalCalories();
  const calorieStatus = getCalorieStatus(totalCalories);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Calculadora de Calorías Diarias</h1>
      <p className="mb-4 text-center text-gray-600">Límite diario: {CALORIE_LIMIT} kcal</p>

      {renderMealSection('desayuno', '¿Qué quieres desayunar?')}
      {renderMealSection('comida', '¿Qué quieres comer?')}
      {renderMealSection('merienda', '¿Qué quieres merendar?')}
      {renderMealSection('cena', '¿Qué quieres cenar?')}

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-semibold text-center">
          Total de calorías: {totalCalories} kcal
        </h3>
      </div>

      {Object.values(selectedMeals).some(meal => meal) && (
        <div className="alert mt-4">
          <h4>{calorieStatus.title}</h4>
          <p>{calorieStatus.message}</p>
        </div>
      )}
    </div>
  );
};

export default MealCalculator;

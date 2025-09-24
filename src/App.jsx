import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './sections/Home';
import MyKitchen from './sections/MyKitchen';
import MealPlan from './sections/MealPlan';
import GroceryList from './sections/GroceryList';
import RecipeDetails from './sections/RecipeDetails';
import Recipes from './sections/Recipes';
import WhatsInYourFridge from './sections/WhatsInYourFridge';
import CookingAssistant from './sections/CookingAssistant';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ToastContainer />
        <NavBar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/whats-in-your-fridge" element={<WhatsInYourFridge />} />
            <Route path="/my-kitchen" element={<MyKitchen />} />
            <Route path="/meal-plan" element={<MealPlan />} />
            <Route path="/grocery-list" element={<GroceryList />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/cooking-assistant/:id" element={<CookingAssistant />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
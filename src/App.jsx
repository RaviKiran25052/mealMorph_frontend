import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FiHome, FiCalendar, FiShoppingCart, FiBookOpen, FiBox, FiCoffee } from 'react-icons/fi';
import Navbar from './components/Navbar';
import Home from './sections/Home';
import MyKitchen from './sections/MyKitchen';
import MealPlan from './sections/MealPlan';
import GroceryList from './sections/GroceryList';
import RecipeDetails from './sections/RecipeDetails';
import Recipes from './sections/Recipes';
import WhatsInYourFridge from './sections/WhatsInYourFridge';
import { ToastContainer } from 'react-toastify';

const navItems = [
  { path: '/', icon: <FiHome />, label: 'Home' },
  { path: '/recipes', icon: <FiBookOpen />, label: 'Recipes' },
  { path: '/whats-in-your-fridge', icon: <FiBox />, label: "What's in Your Fridge?" },
  { path: '/my-kitchen', icon: <FiCoffee />, label: 'My Kitchen' },
  { path: '/meal-plan', icon: <FiCalendar />, label: 'Meal Plan' },
  { path: '/grocery-list', icon: <FiShoppingCart />, label: 'Grocery List' },
];

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ToastContainer />
        <Navbar items={navItems} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/whats-in-your-fridge" element={<WhatsInYourFridge />} />
            <Route path="/my-kitchen" element={<MyKitchen />} />
            <Route path="/meal-plan" element={<MealPlan />} />
            <Route path="/grocery-list" element={<GroceryList />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
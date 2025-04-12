import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FiHome, FiShoppingCart } from 'react-icons/fi';
import { TbFridge, TbToolsKitchen3 } from 'react-icons/tb';
import { MdOutlineCalendarMonth, MdOutlineSoupKitchen } from 'react-icons/md';
import Navbar from './components/Navbar';
import Home from './sections/Home';
import MyKitchen from './sections/MyKitchen';
import MealPlan from './sections/MealPlan';
import GroceryList from './sections/GroceryList';
import RecipeDetails from './sections/RecipeDetails';
import Recipes from './sections/Recipes';
import WhatsInYourFridge from './sections/WhatsInYourFridge';
import CookingAssistant from './sections/CookingAssistant';

const navItems = [
  { path: '/', icon: <FiHome />, label: 'Home' },
  { path: '/recipes', icon: <TbToolsKitchen3 />, label: 'Recipes' },
  { path: '/whats-in-your-fridge', icon: <TbFridge />, label: "What's in Your Fridge?" },
  { path: '/my-kitchen', icon: <MdOutlineSoupKitchen />, label: 'My Kitchen' },
  { path: '/meal-plan', icon: <MdOutlineCalendarMonth />, label: 'Meal Plan' },
  { path: '/grocery-list', icon: <FiShoppingCart />, label: 'Grocery List' },
];

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ToastContainer />
        <Navbar items={navItems} />
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
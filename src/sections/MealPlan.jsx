import { useState } from 'react';
import { FiPlus, FiTrash2, FiShoppingCart, FiEdit2, FiClock, FiUsers, FiStar } from 'react-icons/fi';
import RecipePopup from '../components/RecipePopup';

const MealPlan = () => {
	const [selectedDay, setSelectedDay] = useState('monday');
	const [meals, setMeals] = useState({
		monday: { breakfast: null, lunch: null, dinner: null },
		tuesday: { breakfast: null, lunch: null, dinner: null },
		wednesday: { breakfast: null, lunch: null, dinner: null },
		thursday: { breakfast: null, lunch: null, dinner: null },
		friday: { breakfast: null, lunch: null, dinner: null },
		saturday: { breakfast: null, lunch: null, dinner: null },
		sunday: { breakfast: null, lunch: null, dinner: null },
	});
	const [selectedMealType, setSelectedMealType] = useState(null);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const days = [
		{ id: 'monday', label: 'Monday' },
		{ id: 'tuesday', label: 'Tuesday' },
		{ id: 'wednesday', label: 'Wednesday' },
		{ id: 'thursday', label: 'Thursday' },
		{ id: 'friday', label: 'Friday' },
		{ id: 'saturday', label: 'Saturday' },
		{ id: 'sunday', label: 'Sunday' },
	];

	const mealTypes = ['breakfast', 'lunch', 'dinner'];

	// Mock recipe data - replace with API data
	const recipeSuggestions = [
		{
			id: 1,
			title: 'Avocado Toast',
			type: 'breakfast',
			time: '10 mins',
			servings: 2,
			rating: 4.8,
			ratingCount: 128,
			vegType: 'veg',
			image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		},
		{
			id: 2,
			title: 'Chicken Salad',
			type: 'lunch',
			time: '20 mins',
			servings: 4,
			rating: 4.5,
			ratingCount: 95,
			vegType: 'non-veg',
			image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		},
		{
			id: 3,
			title: 'Pasta Primavera',
			type: 'dinner',
			time: '30 mins',
			servings: 4,
			rating: 4.7,
			ratingCount: 156,
			vegType: 'veg',
			image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		},
		{
			id: 4,
			title: 'Oatmeal with Berries',
			type: 'breakfast',
			time: '15 mins',
			servings: 2,
			rating: 4.6,
			ratingCount: 89,
			vegType: 'veg',
			image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		},
		{
			id: 5,
			title: 'Grilled Salmon',
			type: 'dinner',
			time: '25 mins',
			servings: 2,
			rating: 4.9,
			ratingCount: 203,
			vegType: 'non-veg',
			image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		},
		{
			id: 6,
			title: 'Vegetable Stir Fry',
			type: 'lunch',
			time: '15 mins',
			servings: 2,
			rating: 4.4,
			ratingCount: 76,
			vegType: 'veg',
			image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		},
		{
			id: 7,
			title: 'Beef Steak',
			type: 'dinner',
			time: '20 mins',
			servings: 2,
			rating: 4.8,
			ratingCount: 145,
			vegType: 'non-veg',
			image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		},
		{
			id: 8,
			title: 'Fruit Smoothie Bowl',
			type: 'breakfast',
			time: '10 mins',
			servings: 1,
			rating: 4.7,
			ratingCount: 92,
			vegType: 'veg',
			image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		},
		{
			id: 9,
			title: 'Fish Tacos',
			type: 'lunch',
			time: '25 mins',
			servings: 3,
			rating: 4.6,
			ratingCount: 118,
			vegType: 'non-veg',
			image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		}
	];

	const handleAddMeal = (day, mealType, recipe) => {
		setMeals({
			...meals,
			[day]: {
				...meals[day],
				[mealType]: recipe,
			},
		});
		setIsSearchOpen(false);
		setSelectedMealType(null);
	};

	const handleRemoveMeal = (day, mealType) => {
		setMeals({
			...meals,
			[day]: {
				...meals[day],
				[mealType]: null,
			},
		});
	};

	const generateGroceryList = () => {
		// Implement grocery list generation
		alert('Grocery list generated!');
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-8">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
				<h1 className="text-3xl font-bold text-gray-900">Meal Plan</h1>
				<button
					onClick={generateGroceryList}
					className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
				>
					<FiShoppingCart className="mr-2" />
					Generate Grocery List
				</button>
			</div>

			{/* Day Selector */}
			<div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
				{days.map((day) => (
					<button
						key={day.id}
						onClick={() => setSelectedDay(day.id)}
						className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors duration-200 ${selectedDay === day.id
							? 'bg-primary-600 text-white shadow-md'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
							}`}
					>
						{day.label}
					</button>
				))}
			</div>

			{/* Meal Plan Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{mealTypes.map((mealType) => (
					<div
						key={mealType}
						className="bg-white rounded-lg shadow-md p-6 h-96 overflow-y-auto transition-shadow duration-200 hover:shadow-lg"
					>
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-gray-900 capitalize">
								{mealType}
							</h2>
							{!meals[selectedDay][mealType] ? (
								<button
									onClick={() => {
										setSelectedMealType(mealType);
										setIsSearchOpen(true);
									}}
									className="p-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
								>
									<FiPlus className="h-5 w-5" />
								</button>
							) : (
								<button
									onClick={() => {
										setSelectedMealType(mealType);
										setIsSearchOpen(true);
									}}
									className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
								>
									<FiEdit2 className="h-5 w-5" />
								</button>
							)}
						</div>

						{meals[selectedDay][mealType] ? (
							<div className="relative group">
								<div className="relative overflow-hidden rounded-lg">
									<img
										src={meals[selectedDay][mealType].image}
										alt={meals[selectedDay][mealType].title}
										className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
										<button
											onClick={() => handleRemoveMeal(selectedDay, mealType)}
											className="absolute top-2 right-2 p-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors duration-200"
										>
											<FiTrash2 className="h-5 w-5" />
										</button>
									</div>
								</div>
								<div className="mt-4">
									<h3 className="text-lg font-medium text-gray-900">
										{meals[selectedDay][mealType].title}
									</h3>
									<div className="flex items-center gap-4 mt-2">
										<div className="flex items-center text-gray-600">
											<FiClock className="mr-2" />
											<span>{meals[selectedDay][mealType].time}</span>
										</div>
										<div className="flex items-center text-gray-600">
											<FiUsers className="mr-2" />
											<span>{meals[selectedDay][mealType].servings} servings</span>
										</div>
										<div className="flex items-center text-gray-600">
											<FiStar className="mr-2 text-yellow-500" />
											<span>{meals[selectedDay][mealType].rating}</span>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
								<p className="text-gray-500">No meal planned</p>
							</div>
						)}
					</div>
				))}
			</div>

			{/* Recipe Popup */}
			<RecipePopup
				isOpen={isSearchOpen}
				onClose={() => {
					setIsSearchOpen(false);
					setSelectedMealType(null);
				}}
				onSelect={(recipe) => handleAddMeal(selectedDay, selectedMealType, recipe)}
				recipes={recipeSuggestions}
			/>
		</div>
	);
};

export default MealPlan; 
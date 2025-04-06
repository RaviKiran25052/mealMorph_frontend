import { useState } from 'react';
import { FiPlus, FiTrash2, FiShoppingCart } from 'react-icons/fi';

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
			image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		},
		{
			id: 2,
			title: 'Chicken Salad',
			type: 'lunch',
			time: '20 mins',
			image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		},
		{
			id: 3,
			title: 'Pasta Primavera',
			type: 'dinner',
			time: '30 mins',
			image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		},
	];

	const handleAddMeal = (day, mealType, recipe) => {
		setMeals({
			...meals,
			[day]: {
				...meals[day],
				[mealType]: recipe,
			},
		});
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
		<div className="max-w-6xl mx-auto">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Meal Plan</h1>
				<button
					onClick={generateGroceryList}
					className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
				>
					<FiShoppingCart className="mr-2" />
					Generate Grocery List
				</button>
			</div>

			{/* Day Selector */}
			<div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
				{days.map((day) => (
					<button
						key={day.id}
						onClick={() => setSelectedDay(day.id)}
						className={`px-4 py-2 rounded-lg whitespace-nowrap ${selectedDay === day.id
								? 'bg-indigo-600 text-white'
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
						className="bg-white rounded-lg shadow p-6 h-96 overflow-y-auto"
					>
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-gray-900 capitalize">
								{mealType}
							</h2>
							{!meals[selectedDay][mealType] && (
								<button
									onClick={() => handleAddMeal(selectedDay, mealType, recipeSuggestions[0])}
									className="p-2 text-indigo-600 hover:text-indigo-700"
								>
									<FiPlus className="h-5 w-5" />
								</button>
							)}
						</div>

						{meals[selectedDay][mealType] ? (
							<div className="relative group">
								<img
									src={meals[selectedDay][mealType].image}
									alt={meals[selectedDay][mealType].title}
									className="w-full h-48 object-cover rounded-lg"
								/>
								<div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
									<button
										onClick={() => handleRemoveMeal(selectedDay, mealType)}
										className="absolute top-2 right-2 p-2 bg-white rounded-full text-red-500 hover:bg-red-50"
									>
										<FiTrash2 className="h-5 w-5" />
									</button>
								</div>
								<div className="mt-4">
									<h3 className="text-lg font-medium text-gray-900">
										{meals[selectedDay][mealType].title}
									</h3>
									<p className="text-sm text-gray-500">
										{meals[selectedDay][mealType].time}
									</p>
								</div>
							</div>
						) : (
							<div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
								<p className="text-gray-500">No meal planned</p>
							</div>
						)}
					</div>
				))}
			</div>

			{/* Recipe Suggestions */}
			<div className="mt-8">
				<h2 className="text-xl font-semibold text-gray-900 mb-4">
					Recipe Suggestions
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{recipeSuggestions.map((recipe) => (
						<div
							key={recipe.id}
							className="bg-white rounded-lg shadow overflow-hidden"
						>
							<img
								src={recipe.image}
								alt={recipe.title}
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h3 className="text-lg font-medium text-gray-900">
									{recipe.title}
								</h3>
								<p className="text-sm text-gray-500">{recipe.time}</p>
								<button
									onClick={() => handleAddMeal(selectedDay, recipe.type, recipe)}
									className="mt-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
								>
									Add to {selectedDay}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MealPlan; 
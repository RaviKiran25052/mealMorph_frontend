import { useState } from 'react';
import { FiPlus, FiTrash2, FiSearch, FiX, FiClock, FiUsers, FiStar, FiFilter, FiChevronDown } from 'react-icons/fi';

const WhatsInYourFridge = () => {
	const [ingredients, setIngredients] = useState([]);
	const [newIngredient, setNewIngredient] = useState('');
	const [suggestedRecipes, setSuggestedRecipes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isToggleEnabled, setIsToggleEnabled] = useState(false);
	const [filters, setFilters] = useState({
		category: '',
		sortBy: 'rating',
		vegType: 'all',
	});

	const categoryOptions = [
		{ value: '', label: 'All Categories' },
		{ value: 'breakfast', label: 'Breakfast' },
		{ value: 'lunch', label: 'Lunch' },
		{ value: 'dinner', label: 'Dinner' },
		{ value: 'desserts', label: 'Desserts' },
		{ value: 'snacks', label: 'Snacks' },
	];

	const sortOptions = [
		{ value: 'rating', label: 'Rating' },
		{ value: 'time', label: 'Cooking Time' },
		{ value: 'servings', label: 'Servings' },
	];

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters(prev => ({ ...prev, [name]: value }));
	};

	const handleToggleClick = () => {
		if (!isToggleEnabled) {
			setIsToggleEnabled(true);
			setFilters(prev => ({
				...prev,
				vegType: 'veg'
			}));
		} else {
			setFilters(prev => ({
				...prev,
				vegType: prev.vegType === 'veg' ? 'non-veg' : 'veg'
			}));
		}
	};

	const filteredAndSortedRecipes = suggestedRecipes
		.filter(recipe => {
			if (filters.category && recipe.category !== filters.category) return false;
			if (filters.vegType !== 'all' && recipe.type !== filters.vegType) return false;
			return true;
		})
		.sort((a, b) => {
			switch (filters.sortBy) {
				case 'rating':
					return b.rating - a.rating;
				case 'time':
					return parseInt(a.time) - parseInt(b.time);
				case 'servings':
					return a.servings - b.servings;
				default:
					return 0;
			}
		});

	const handleAddIngredient = (e) => {
		e.preventDefault();
		if (newIngredient.trim()) {
			setIngredients([
				...ingredients,
				{
					id: Date.now(),
					name: newIngredient.trim(),
				},
			]);
			setNewIngredient('');
			setError(null);
		} else {
			setError('Please enter an ingredient name');
		}
	};

	const handleRemoveIngredient = (id) => {
		setIngredients(ingredients.filter((ing) => ing.id !== id));
	};

	const handleSearchRecipes = async () => {
		setIsLoading(true);
		setError(null);
		try {
			// Simulate API call with timeout
			await new Promise(resolve => setTimeout(resolve, 1000));

			// Mock data for demonstration
			const mockRecipes = [
				{
					id: 1,
					title: 'Pasta with Tomato Sauce',
					image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
					time: '30 mins',
					servings: 4,
					rating: 4.5,
					ratingCount: 128,
					category: 'dinner',
					missingIngredients: ['Pasta', 'Tomato Sauce'],
					description: 'A classic Italian dish with rich tomato sauce and perfectly cooked pasta.',
				},
				{
					id: 2,
					title: 'Vegetable Stir Fry',
					image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
					time: '20 mins',
					servings: 2,
					rating: 4.8,
					ratingCount: 256,
					category: 'lunch',
					missingIngredients: ['Soy Sauce', 'Rice'],
					description: 'Quick and healthy stir-fried vegetables with a savory sauce.',
				},
			];
			setSuggestedRecipes(mockRecipes);
		} catch (err) {
			setError('Failed to fetch recipe suggestions. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					What's in Your Fridge?
				</h1>
				<p className="text-gray-600">
					Enter the ingredients you have, and we'll suggest recipes you can make!
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
					<h2 className="text-xl font-semibold mb-4">Your Ingredients</h2>
					<form onSubmit={handleAddIngredient} className="mb-4">
						<div className="relative">
							<input
								type="text"
								value={newIngredient}
								onChange={(e) => setNewIngredient(e.target.value)}
								placeholder="Enter ingredient name..."
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
							/>
						</div>
						{error && (
							<p className="mt-2 text-sm text-red-500">{error}</p>
						)}
						<button
							type="submit"
							className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
						>
							<FiPlus className="mr-2" />
							Add Ingredient
						</button>
					</form>

					{ingredients.length > 0 ? (
						<ul className="space-y-2 max-h-60 overflow-y-auto">
							{ingredients.map((ingredient) => (
								<li
									key={ingredient.id}
									className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-all duration-300"
								>
									<span className="font-medium">{ingredient.name}</span>
									<button
										onClick={() => handleRemoveIngredient(ingredient.id)}
										className="text-red-500 hover:text-red-700 transition-colors duration-300"
									>
										<FiTrash2 className="h-5 w-5" />
									</button>
								</li>
							))}
						</ul>
					) : (
						<div className="text-center py-8 bg-gray-50 rounded-md">
							<p className="text-gray-500">No ingredients added yet</p>
							<p className="text-sm text-gray-400 mt-1">Start by adding ingredients above</p>
						</div>
					)}

					{ingredients.length > 0 && (
						<button
							onClick={handleSearchRecipes}
							disabled={isLoading}
							className={`mt-6 w-full px-4 py-2 bg-primary-600 text-white rounded-md flex items-center justify-center transition-all duration-300 ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-primary-700 transform hover:scale-105'
								}`}
						>
							{isLoading ? (
								<>
									<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Searching...
								</>
							) : (
								<>
									<FiSearch className="mr-2" />
									Find Recipes
								</>
							)}
						</button>
					)}
				</div>

				<div className="space-y-6">
					<h2 className="text-xl font-semibold">Suggested Recipes</h2>
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-4">
							<button
								onClick={() => setIsFilterOpen(!isFilterOpen)}
								className="flex items-center space-x-2 p-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all duration-300 group"
							>
								<FiFilter className="h-5 w-5" />
								<span>Filters</span>
								<FiChevronDown
									className={`h-4 w-4 transform transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}
								/>
							</button>
							<select
								name="sortBy"
								value={filters.sortBy}
								onChange={handleFilterChange}
								className="p-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all duration-300"
							>
								{sortOptions.map((option) => (
									<option key={option.value} value={option.value}>
										Sort by: {option.label}
									</option>
								))}
							</select>
							<div className={`flex items-center h-[42px] gap-3 px-2 ${isToggleEnabled ? 'bg-primary-50 rounded-md' : 'bg-white'}`}>
								{isToggleEnabled && (
									<button
										onClick={() => {
											setIsToggleEnabled(false);
											setFilters(prev => ({
												...prev,
												vegType: 'all'
											}));
										}}
										className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
									>
										<FiX className="h-4 w-4" />
									</button>
								)}
								<span className="text-sm font-medium text-gray-700">Non-Veg</span>
								<div className="relative flex items-center">
									<button
										onClick={handleToggleClick}
										className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300"
										style={{
											backgroundColor: !isToggleEnabled ? '#d1d5db' : (filters.vegType === 'veg' ? '#22c55e' : '#ef4444')
										}}
									>
										<span
											className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${!isToggleEnabled ? 'translate-x-1' : (filters.vegType === 'veg' ? 'translate-x-5' : 'translate-x-1')
												}`}
										/>
									</button>
								</div>
								<span className="text-sm font-medium text-gray-700">Veg</span>
							</div>
						</div>
					</div>

					{/* Filter Panel */}
					<div className={`transition-all duration-300 ease-in-out ${isFilterOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
						<div className={`mt-4 p-4 bg-white border border-gray-300 rounded-md transform transition-all duration-300 ${isFilterOpen ? 'translate-y-0' : '-translate-y-4'}`}>
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-lg font-semibold">Filter Recipes</h3>
								<button
									onClick={() => setIsFilterOpen(false)}
									className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
								>
									<FiX className="h-5 w-5" />
								</button>
							</div>
							<div className="grid grid-cols-1 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Category
									</label>
									<select
										name="category"
										value={filters.category}
										onChange={handleFilterChange}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
									>
										{categoryOptions.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>

					{isLoading ? (
						<div className="flex justify-center items-center h-64">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
						</div>
					) : filteredAndSortedRecipes.length > 0 ? (
						<div className="space-y-6">
							{filteredAndSortedRecipes.map((recipe) => (
								<div key={recipe.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
									<div className="flex flex-col md:flex-row gap-6">
										<div className="md:w-1/3">
											<img
												src={recipe.image}
												alt={recipe.title}
												className="w-full h-48 object-cover rounded-lg shadow-md"
											/>
										</div>
										<div className="md:w-2/3">
											<div className="flex justify-between items-start mb-2">
												<h3 className="text-xl font-semibold">{recipe.title}</h3>
												<div className="flex items-center bg-primary-50 px-3 py-1 rounded-full">
													<FiStar className="text-primary-600 mr-1" />
													<span className="text-primary-600 font-medium">{recipe.rating}</span>
													<span className="text-gray-500 ml-1">({recipe.ratingCount})</span>
												</div>
											</div>
											<p className="text-gray-600 mb-4">{recipe.description}</p>
											<div className="flex flex-wrap gap-4 mb-4">
												<div className="flex items-center text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
													<FiClock className="mr-2" />
													<span>{recipe.time}</span>
												</div>
												<div className="flex items-center text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
													<FiUsers className="mr-2" />
													<span>{recipe.servings} servings</span>
												</div>
											</div>
											{recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
												<div className="mt-4">
													<h4 className="font-medium text-gray-700 mb-2">
														Missing Ingredients:
													</h4>
													<div className="flex flex-wrap gap-2">
														{recipe.missingIngredients.map((ingredient, index) => (
															<span
																key={index}
																className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
															>
																{ingredient}
															</span>
														))}
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="bg-white rounded-lg shadow-lg p-8 text-center">
							<FiSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
							<p className="text-gray-500 mb-2">
								{ingredients.length > 0
									? "No recipes found matching your filters"
									: "Add some ingredients and click 'Find Recipes' to get suggestions!"}
							</p>
							{ingredients.length > 0 && (
								<p className="text-sm text-gray-400">
									Try adjusting your filters or adding more ingredients
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default WhatsInYourFridge;
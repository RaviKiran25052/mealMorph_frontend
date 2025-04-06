import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	FiClock, FiUsers, FiStar, FiHeart, FiShare2, FiShoppingCart,
	FiPrinter, FiMinus, FiPlus, FiThermometer, FiDroplet, FiZap, FiScissors, FiCoffee, FiList,
	FiBookOpen, FiPieChart, FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';

const RecipeDetails = () => {
	const { id } = useParams();
	const [servings, setServings] = useState(4);
	const [isFavorite, setIsFavorite] = useState(false);
	const [activeTab, setActiveTab] = useState('ingredients');
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [recipe, setRecipe] = useState(null);

	// Mock recipe data - replace with API data
	const mockRecipe = {
		id: 1,
		title: 'Spaghetti Carbonara',
		image: 'https://images.unsplash.com/photo-1589227365533-cee630bd59bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		time: '30 mins',
		servings: 4,
		rating: 4.5,
		ratingCount: 128,
		description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper.',
		ingredients: [
			{ name: 'spaghetti', amount: 400, unit: 'g' },
			{ name: 'pancetta', amount: 200, unit: 'g' },
			{ name: 'large eggs', amount: 4, unit: '' },
			{ name: 'pecorino cheese', amount: 50, unit: 'g' },
			{ name: 'parmesan', amount: 50, unit: 'g' },
			{ name: 'black pepper', amount: 1, unit: 'tsp' },
			{ name: 'salt', amount: 1, unit: 'tsp' },
		],
		instructions: [
			'Bring a large pot of salted water to boil and cook the spaghetti according to package instructions.',
			'While the pasta is cooking, heat a large skillet over medium heat and cook the pancetta until crispy.',
			'In a bowl, whisk together the eggs, grated cheeses, and black pepper.',
			'Drain the pasta, reserving some of the cooking water.',
			'Working quickly, add the hot pasta to the skillet with the pancetta, then remove from heat.',
			'Add the egg mixture and toss quickly to coat the pasta, adding a splash of pasta water if needed.',
			'Serve immediately with extra grated cheese and black pepper.',
		],
		nutrition: {
			calories: 450,
			protein: 15,
			carbs: 65,
			fat: 12,
			fiber: 8,
		},
		tags: ['Italian', 'Pasta', 'Quick', 'Dinner'],
	};

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				setIsLoading(true);
				// TODO: Replace with actual API call
				// const response = await fetch(`/api/recipes/${id}`);
				// const data = await response.json();
				// setRecipe(data);
				setRecipe(mockRecipe);
				setTimeout(() => setIsLoading(false), 1000); // Simulate loading
			} catch (err) {
				setError('Failed to load recipe. Please try again later.');
				setIsLoading(false);
			}
		};

		if (id) {
			fetchRecipe();
		}
	}, [id]);

	const toggleFavorite = () => {
		setIsFavorite(!isFavorite);
	};

	const addToGroceryList = () => {
		// Implement grocery list functionality
		alert('Added to grocery list!');
	};

	const printRecipe = () => {
		window.print();
	};

	const getScaledAmount = (amount, unit) => {
		if (!amount) return '0';
		const scaledAmount = ((amount / recipe.servings) * servings).toFixed(1);
		// Remove trailing .0 if it's a whole number
		const formattedAmount = scaledAmount.replace(/\.0$/, '');
		return unit ? `${formattedAmount} ${unit}` : formattedAmount;
	};

	const getScaledNutrition = (value) => {
		if (!value) return '0';
		const scaledValue = ((value / recipe.servings) * servings).toFixed(1);
		return scaledValue.replace(/\.0$/, '');
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[500px]">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
			</div>
		);
	}

	if (error || !recipe) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[500px] text-center">
				<FiAlertCircle className="text-red-500 text-5xl mb-4" />
				<h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
				<p className="text-gray-600">{error || 'Recipe not found'}</p>
				<button
					onClick={() => window.location.reload()}
					className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<div className="space-y-8 max-w-6xl mx-auto">
			{/* Hero Section */}
			<div className="relative h-[500px] rounded-3xl overflow-hidden group">
				<img
					src={recipe.image}
					alt={recipe.title}
					className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 p-8 text-white">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
							<FiStar className="text-yellow-400 animate-pulse" />
							<span className="text-xl font-medium">
								{recipe.rating} ({recipe.ratingCount})
							</span>
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={toggleFavorite}
								className={`p-3 rounded-full transition-all duration-300 ${isFavorite
									? 'bg-red-500 text-white hover:bg-red-600'
									: 'bg-white/20 text-white hover:bg-white/30'
									}`}
							>
								<FiHeart size={24} className={isFavorite ? 'animate-bounce' : ''} />
							</button>
							<button
								onClick={printRecipe}
								className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
							>
								<FiPrinter size={24} />
							</button>
						</div>
					</div>
					<h1 className="text-5xl font-bold mt-4 drop-shadow-lg">{recipe.title}</h1>
					<div className="flex items-center gap-8 mt-4 text-xl">
						<div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
							<FiClock className="text-primary-300" />
							{recipe.time}
						</div>
						<div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
							<FiUsers className="text-primary-300" />
							{recipe.servings} servings
						</div>
					</div>
					<div className="flex gap-2 mt-4">
						{recipe.tags.map((tag) => (
							<span
								key={tag}
								className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm hover:bg-white/30 transition-colors duration-300"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			</div>

			{/* New Main Content Layout */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Left Column - Recipe Info */}
				<div className="lg:col-span-2 space-y-8">
					{/* Top Row - About and Servings Side by Side */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Description Card */}
						<div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
									<FiBookOpen className="text-primary-500" />
								</div>
								<h2 className="text-2xl font-bold text-gray-800">About This Recipe</h2>
							</div>
							<p className="text-gray-600 leading-relaxed">{recipe.description}</p>
						</div>

						{/* Servings Card */}
						<div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
									<FiUsers className="text-primary-500" />
								</div>
								<h2 className="text-2xl font-bold text-gray-800">Adjust Servings</h2>
							</div>
							<div className="flex items-center justify-center gap-4">
								<button
									onClick={() => setServings(Math.max(1, servings - 1))}
									className="p-4 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-300 hover:scale-110"
								>
									<FiMinus className="text-gray-600" />
								</button>
								<div className="text-4xl font-bold text-primary-600 w-20 text-center">
									{servings}
								</div>
								<button
									onClick={() => setServings(servings + 1)}
									className="p-4 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-300 hover:scale-110"
								>
									<FiPlus className="text-gray-600" />
								</button>
							</div>
						</div>
					</div>

					{/* Optimized Tabs Section */}
					<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
						<div className="border-b border-gray-200">
							<nav className="flex">
								{[
									{
										id: 'ingredients',
										icon: <FiList />,
										label: 'Ingredients',
										count: recipe.ingredients.length
									},
									{
										id: 'instructions',
										icon: <FiBookOpen />,
										label: 'Instructions',
										count: recipe.instructions.length
									},
									{
										id: 'nutrition',
										icon: <FiPieChart />,
										label: 'Nutrition',
										count: Object.keys(recipe.nutrition).length
									}
								].map((tab) => (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`${activeTab === tab.id
											? 'border-primary-500 text-primary-600 bg-primary-50'
											: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
											} flex-1 py-3 px-4 border-b-2 font-medium text-sm capitalize transition-all duration-300 flex items-center justify-center gap-2`}
									>
										<div className="flex items-center gap-2">
											<div className={`w-7 h-7 rounded-full flex items-center justify-center ${activeTab === tab.id ? 'bg-primary-100' : 'bg-gray-100'
												}`}>
												{tab.icon}
											</div>
											<span>{tab.label}</span>
											<span className={`px-1.5 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
												}`}>
												{tab.count}
											</span>
										</div>
									</button>
								))}
							</nav>
						</div>

						<div className="p-4">
							{activeTab === 'ingredients' && (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									{recipe.ingredients.map((ingredient, index) => (
										<div
											key={index}
											className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
										>
											<div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
												<FiCheckCircle className="text-primary-500" />
											</div>
											<div className="flex-1">
												<h3 className="font-medium text-gray-800 capitalize group-hover:text-primary-600 transition-colors duration-300">
													{ingredient.name}
												</h3>
												<p className="text-sm text-gray-500">
													{getScaledAmount(ingredient.amount, ingredient.unit)}
												</p>
											</div>
										</div>
									))}
								</div>
							)}

							{activeTab === 'instructions' && (
								<div className="space-y-3">
									{recipe.instructions.map((step, index) => (
										<div
											key={index}
											className="flex gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
										>
											<div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
												{index + 1}
											</div>
											<p className="text-gray-700 group-hover:text-primary-600 transition-colors duration-300">{step}</p>
										</div>
									))}
								</div>
							)}

							{activeTab === 'nutrition' && (
								<div className="space-y-4">
									{/* Enhanced Nutrition Facts Card */}
									<div className="bg-white p-6 rounded-xl border border-gray-200">
										<h3 className="text-xl font-semibold text-gray-800 mb-6">Nutrition Facts</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											{[
												{
													key: 'calories',
													value: getScaledNutrition(recipe.nutrition.calories),
													icon: <FiZap />,
													color: 'text-yellow-500',
													bgColor: 'bg-yellow-50',
													description: 'Energy content of the meal',
													unit: ' kcal'
												},
												{
													key: 'protein',
													value: getScaledNutrition(recipe.nutrition.protein),
													icon: <FiDroplet />,
													color: 'text-blue-500',
													bgColor: 'bg-blue-50',
													description: 'Essential for muscle growth',
													unit: 'g'
												},
												{
													key: 'carbs',
													value: getScaledNutrition(recipe.nutrition.carbs),
													icon: <FiThermometer />,
													color: 'text-green-500',
													bgColor: 'bg-green-50',
													description: 'Primary energy source',
													unit: 'g'
												},
												{
													key: 'fat',
													value: getScaledNutrition(recipe.nutrition.fat),
													icon: <FiCoffee />,
													color: 'text-red-500',
													bgColor: 'bg-red-50',
													description: 'Healthy fats for body function',
													unit: 'g'
												},
												{
													key: 'fiber',
													value: getScaledNutrition(recipe.nutrition.fiber),
													icon: <FiScissors />,
													color: 'text-purple-500',
													bgColor: 'bg-purple-50',
													description: 'Aids in digestion',
													unit: 'g'
												}
											].map(({ key, value, icon, color, bgColor, description, unit }) => (
												<div
													key={key}
													className={`p-4 rounded-xl ${bgColor} hover:shadow-md transition-all duration-300`}
												>
													<div className="flex items-center gap-3 mb-2">
														<div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${color}`}>
															{icon}
														</div>
														<div>
															<div className="text-sm text-gray-500 capitalize">{key}</div>
															<div className="font-semibold text-gray-800 text-xl">
																{value}{unit}
															</div>
														</div>
													</div>
													<p className="text-sm text-gray-600">{description}</p>
												</div>
											))}
										</div>
									</div>

									{/* Health Benefits */}
									<div className="bg-primary-50 p-4 rounded-xl">
										<h3 className="text-lg font-semibold text-primary-800 mb-3">Health Benefits</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
											<div className="flex items-start gap-2">
												<div className="w-5 h-5 rounded-full bg-primary-500 text-white flex items-center justify-center mt-0.5">
													<FiCheckCircle size={14} />
												</div>
												<p className="text-sm text-primary-700">High in protein for muscle maintenance and repair</p>
											</div>
											<div className="flex items-start gap-2">
												<div className="w-5 h-5 rounded-full bg-primary-500 text-white flex items-center justify-center mt-0.5">
													<FiCheckCircle size={14} />
												</div>
												<p className="text-sm text-primary-700">Rich in dietary fiber for digestive health</p>
											</div>
											<div className="flex items-start gap-2">
												<div className="w-5 h-5 rounded-full bg-primary-500 text-white flex items-center justify-center mt-0.5">
													<FiCheckCircle size={14} />
												</div>
												<p className="text-sm text-primary-700">Contains essential vitamins and minerals</p>
											</div>
											<div className="flex items-start gap-2">
												<div className="w-5 h-5 rounded-full bg-primary-500 text-white flex items-center justify-center mt-0.5">
													<FiCheckCircle size={14} />
												</div>
												<p className="text-sm text-primary-700">Balanced macronutrient profile for sustained energy</p>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Right Column - Quick Actions */}
				<div className="space-y-6">
					{/* Recipe Stats */}
					<div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
						<h2 className="text-xl font-bold text-gray-800 mb-4">Recipe Stats</h2>
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
									<FiClock className="text-primary-500" />
								</div>
								<div>
									<p className="text-sm text-gray-500">Prep Time</p>
									<p className="font-medium text-gray-800">{recipe.time}</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
									<FiUsers className="text-primary-500" />
								</div>
								<div>
									<p className="text-sm text-gray-500">Servings</p>
									<p className="font-medium text-gray-800">{recipe.servings} people</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
									<FiStar className="text-primary-500" />
								</div>
								<div>
									<p className="text-sm text-gray-500">Rating</p>
									<p className="font-medium text-gray-800">
										{recipe.rating} ({recipe.ratingCount} reviews)
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Quick Actions */}
					<div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
						<h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
						<div className="space-y-3">
							<button
								onClick={addToGroceryList}
								className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-300"
							>
								<FiShoppingCart />
								Add to Grocery List
							</button>
							<button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-300 border border-gray-200">
								<FiShare2 />
								Share Recipe
							</button>
							<button
								onClick={printRecipe}
								className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-300 border border-gray-200"
							>
								<FiPrinter />
								Print Recipe
							</button>
						</div>
					</div>

					{/* Tags */}
					<div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
						<h2 className="text-xl font-bold text-gray-800 mb-4">Tags</h2>
						<div className="flex flex-wrap gap-2">
							{recipe.tags.map((tag) => (
								<span
									key={tag}
									className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm hover:bg-gray-100 transition-colors duration-300"
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecipeDetails; 
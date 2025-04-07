import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import FilterBar from '../components/FilterBar';
import { FiSearch, FiX } from 'react-icons/fi';

const Recipes = () => {
	const location = useLocation();
	const [isToggleEnabled, setIsToggleEnabled] = useState(false);
	const [recipes, setRecipes] = useState([
		{
			id: 1,
			title: 'Masala Dosa',
			image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			cookingTime: '30 mins',
			servings: 2,
			difficulty: 'Medium',
			rating: 4.8,
			ratingCount: 128,
			category: 'breakfast',
			type: 'veg',
			ingredients: [
				{ name: 'Rice', quantity: '2 cups' },
				{ name: 'Urad Dal', quantity: '1 cup' },
				{ name: 'Potatoes', quantity: '3 medium' }
			]
		},
		{
			id: 2,
			title: 'Rajma Chawal',
			image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			cookingTime: '45 mins',
			servings: 4,
			difficulty: 'Medium',
			rating: 4.7,
			ratingCount: 156,
			category: 'lunch',
			type: 'veg',
			ingredients: [
				{ name: 'Kidney Beans', quantity: '2 cups' },
				{ name: 'Basmati Rice', quantity: '2 cups' },
				{ name: 'Onions', quantity: '2 medium' }
			]
		},
		{
			id: 3,
			title: 'Butter Chicken',
			image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			cookingTime: '45 mins',
			servings: 4,
			difficulty: 'Medium',
			rating: 4.9,
			ratingCount: 215,
			category: 'dinner',
			type: 'non-veg',
			ingredients: [
				{ name: 'Chicken', quantity: '500g' },
				{ name: 'Yogurt', quantity: '1 cup' },
				{ name: 'Tomatoes', quantity: '4 medium' }
			]
		},
		{
			id: 4,
			title: 'Gulab Jamun',
			image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			cookingTime: '40 mins',
			servings: 6,
			difficulty: 'Medium',
			rating: 4.9,
			ratingCount: 198,
			category: 'desserts',
			type: 'veg',
			ingredients: [
				{ name: 'Khoya', quantity: '250g' },
				{ name: 'Sugar', quantity: '2 cups' },
				{ name: 'Cardamom', quantity: '1 tsp' }
			]
		},
		{
			id: 5,
			title: 'Samosa',
			image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			cookingTime: '50 mins',
			servings: 4,
			difficulty: 'Hard',
			rating: 4.6,
			ratingCount: 167,
			category: 'snacks',
			type: 'veg',
			ingredients: [
				{ name: 'All-purpose flour', quantity: '2 cups' },
				{ name: 'Potatoes', quantity: '3 medium' },
				{ name: 'Peas', quantity: '1/2 cup' }
			]
		},
		{
			id: 6,
			title: 'Palak Paneer',
			image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			cookingTime: '35 mins',
			servings: 4,
			difficulty: 'Medium',
			rating: 4.7,
			ratingCount: 142,
			category: 'vegetarian',
			type: 'veg',
			ingredients: [
				{ name: 'Spinach', quantity: '500g' },
				{ name: 'Paneer', quantity: '200g' },
				{ name: 'Onions', quantity: '2 medium' }
			]
		},
		{
			id: 7,
			title: 'Rogan Josh',
			image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			cookingTime: '60 mins',
			servings: 4,
			difficulty: 'Hard',
			rating: 4.8,
			ratingCount: 189,
			category: 'non-vegetarian',
			type: 'non-veg',
			ingredients: [
				{ name: 'Lamb', quantity: '500g' },
				{ name: 'Yogurt', quantity: '1 cup' },
				{ name: 'Kashmiri Red Chili', quantity: '2 tbsp' }
			]
		},
		{
			id: 8,
			title: 'Fish Curry',
			image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			cookingTime: '40 mins',
			servings: 4,
			difficulty: 'Medium',
			rating: 4.6,
			ratingCount: 134,
			category: 'seafood',
			type: 'non-veg',
			ingredients: [
				{ name: 'Fish', quantity: '500g' },
				{ name: 'Coconut Milk', quantity: '1 cup' },
				{ name: 'Tamarind', quantity: '2 tbsp' }
			]
		},
		{
			id: 9,
			title: 'Rasam',
			image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			cookingTime: '25 mins',
			servings: 4,
			difficulty: 'Easy',
			rating: 4.5,
			ratingCount: 156,
			category: 'soups',
			type: 'veg',
			ingredients: [
				{ name: 'Tomatoes', quantity: '4 medium' },
				{ name: 'Tamarind', quantity: '1 tbsp' },
				{ name: 'Rasam Powder', quantity: '2 tbsp' }
			]
		},
		{
			id: 10,
			title: 'Chicken Curry',
			image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			cookingTime: '45 mins',
			servings: 4,
			difficulty: 'Medium',
			rating: 4.8,
			ratingCount: 178,
			category: 'curries',
			type: 'non-veg',
			ingredients: [
				{ name: 'Chicken', quantity: '500g' },
				{ name: 'Onions', quantity: '3 medium' },
				{ name: 'Tomatoes', quantity: '3 medium' }
			]
		}
	]);
	const [filteredRecipes, setFilteredRecipes] = useState([]);
	const [filters, setFilters] = useState({
		category: '',
		servings: '',
		sortBy: 'rating',
		vegType: 'all',
	});
	const [searchQuery, setSearchQuery] = useState('');

	// Read category from URL query parameters
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const category = searchParams.get('category');
		if (category) {
			setFilters(prev => ({ ...prev, category }));
		}
	}, [location.search]);

	// Filter and sort recipes
	useEffect(() => {
		let result = [...recipes];

		// Apply category filter
		if (filters.category) {
			result = result.filter(recipe => recipe.category === filters.category);
		}

		// Apply servings filter
		if (filters.servings) {
			result = result.filter(recipe => recipe.servings === parseInt(filters.servings));
		}

		// Apply vegType filter
		if (filters.vegType !== 'all') {
			result = result.filter(recipe => recipe.type === filters.vegType);
		}

		// Apply search filter
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter(recipe =>
				recipe.title.toLowerCase().includes(query) ||
				recipe.ingredients.some(ingredient =>
					ingredient.name.toLowerCase().includes(query)
				)
			);
		}

		// Apply sorting
		switch (filters.sortBy) {
			case 'rating':
				result.sort((a, b) => b.rating - a.rating);
				break;
			case 'servings':
				result.sort((a, b) => a.servings - b.servings);
				break;
			case 'time':
				// Extract numeric value from cooking time string (e.g., "30 mins" -> 30)
				result.sort((a, b) => {
					const timeA = parseInt(a.cookingTime);
					const timeB = parseInt(b.cookingTime);
					return timeA - timeB;
				});
				break;
			case 'difficulty':
				const difficultyOrder = { 'Easy': 0, 'Medium': 1, 'Hard': 2 };
				result.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
				break;
			default:
				break;
		}

		setFilteredRecipes(result);
	}, [recipes, filters, searchQuery]);

	const handleFilterChange = (newFilters) => {
		// Preserve the vegType if it's not being updated
		setFilters(prevFilters => ({
			...prevFilters,
			...newFilters,
			vegType: newFilters.vegType !== undefined ? newFilters.vegType : prevFilters.vegType
		}));
	};

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	const handleToggleClick = () => {
		if (!isToggleEnabled) {
			setIsToggleEnabled(true);
			handleFilterChange({
				...filters,
				vegType: 'veg'
			});
		} else {
			handleFilterChange({
				...filters,
				vegType: filters.vegType === 'veg' ? 'non-veg' : 'veg'
			});
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">Recipes</h1>
				<p className="text-gray-600">
					Browse our collection of delicious recipes
				</p>
			</div>

			<div className="flex flex-col md:flex-row items-start gap-4 mb-6">
				<div className="flex-grow">
					<FilterBar
						onFilterChange={handleFilterChange}
						onSearch={handleSearch}
					/>
				</div>
				<div className={`flex items-center rounded-full h-[42px] gap-3 px-4 ${isToggleEnabled ? 'bg-primary-100' : 'bg-white'}`}>
					{isToggleEnabled && (
						<button
							onClick={() => {
								setIsToggleEnabled(false);
								handleFilterChange({
									...filters,
									vegType: 'all'
								});
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

			{filteredRecipes.length === 0 ? (
				<div className="text-center py-12">
					<FiSearch className="mx-auto h-12 w-12 text-gray-400" />
					<h3 className="mt-2 text-lg font-medium text-gray-900">No recipes found</h3>
					<p className="mt-1 text-gray-500">
						Try adjusting your search or filter to find what you're looking for.
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredRecipes.map((recipe) => (
						<RecipeCard key={recipe.id} recipe={recipe} />
					))}
				</div>
			)}
		</div>
	);
};

export default Recipes; 
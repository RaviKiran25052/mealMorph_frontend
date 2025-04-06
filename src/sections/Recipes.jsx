import { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import FilterBar from '../components/FilterBar';

const Recipes = () => {
	const [recipes, setRecipes] = useState([
		{
			id: 1,
			title: 'Quick Pasta Primavera',
			image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			time: '30 mins',
			servings: 4,
			difficulty: 'Easy',
			rating: 4.5,
			diet: 'vegetarian',
		},
		{
			id: 2,
			title: 'Healthy Buddha Bowl',
			image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			time: '20 mins',
			servings: 2,
			difficulty: 'Easy',
			rating: 4.8,
			diet: 'vegan',
		},
		{
			id: 3,
			title: 'Chocolate Avocado Mousse',
			image: 'https://images.unsplash.com/photo-1568708212856-35c36858e5d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			time: '15 mins',
			servings: 4,
			difficulty: 'Easy',
			rating: 4.2,
			diet: 'vegan',
		},
		{
			id: 4,
			title: 'Grilled Salmon with Asparagus',
			image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			time: '25 mins',
			servings: 2,
			difficulty: 'Medium',
			rating: 4.7,
			diet: 'keto',
		},
		{
			id: 5,
			title: 'Quinoa Stuffed Bell Peppers',
			image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			time: '45 mins',
			servings: 4,
			difficulty: 'Medium',
			rating: 4.3,
			diet: 'vegetarian',
		},
		{
			id: 6,
			title: 'Gluten-Free Banana Bread',
			image: 'https://images.unsplash.com/photo-1588195538326-6955dda1d1d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			time: '60 mins',
			servings: 8,
			difficulty: 'Easy',
			rating: 4.6,
			diet: 'gluten-free',
		},
	]);

	const [filters, setFilters] = useState({
		diet: '',
		time: '',
		difficulty: '',
		sortBy: 'rating',
	});

	const handleFilterChange = (newFilters) => {
		setFilters(newFilters);
	};

	const handleFavorite = (recipeId) => {
		setRecipes(recipes.map(recipe => {
			if (recipe.id === recipeId) {
				return { ...recipe, isFavorite: !recipe.isFavorite };
			}
			return recipe;
		}));
	};

	const filteredAndSortedRecipes = recipes
		.filter(recipe => {
			if (filters.diet && recipe.diet !== filters.diet) return false;
			if (filters.time && parseInt(recipe.time) > parseInt(filters.time)) return false;
			if (filters.difficulty && recipe.difficulty.toLowerCase() !== filters.difficulty) return false;
			return true;
		})
		.sort((a, b) => {
			switch (filters.sortBy) {
				case 'rating':
					return b.rating - a.rating;
				case 'time':
					return parseInt(a.time) - parseInt(b.time);
				case 'difficulty':
					const difficultyOrder = { 'Easy': 0, 'Medium': 1, 'Hard': 2 };
					return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
				default:
					return 0;
			}
		});

	return (
		<div className="max-w-6xl mx-auto">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900">All Recipes</h1>
				<div className="text-gray-500">
					{filteredAndSortedRecipes.length} recipes found
				</div>
			</div>

			<FilterBar onFilterChange={handleFilterChange} />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredAndSortedRecipes.map((recipe) => (
					<RecipeCard
						key={recipe.id}
						recipe={recipe}
						onFavorite={handleFavorite}
					/>
				))}
			</div>

			{filteredAndSortedRecipes.length === 0 && (
				<div className="text-center py-12">
					<h3 className="mt-2 text-sm font-medium text-gray-900">
						No recipes found
					</h3>
					<p className="mt-1 text-sm text-gray-500">
						Try adjusting your filters to find more recipes.
					</p>
				</div>
			)}
		</div>
	);
};

export default Recipes; 
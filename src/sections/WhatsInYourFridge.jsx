import { useState } from 'react';
import { FiPlus, FiTrash2, FiSearch } from 'react-icons/fi';
import RecipeCard from '../components/RecipeCard';

const WhatsInYourFridge = () => {
	const [ingredients, setIngredients] = useState([]);
	const [newIngredient, setNewIngredient] = useState('');
	const [newQuantity, setNewQuantity] = useState('');
	const [suggestedRecipes, setSuggestedRecipes] = useState([]);

	const handleAddIngredient = (e) => {
		e.preventDefault();
		if (newIngredient.trim() && newQuantity.trim()) {
			setIngredients([
				...ingredients,
				{
					id: Date.now(),
					name: newIngredient.trim(),
					quantity: newQuantity.trim(),
				},
			]);
			setNewIngredient('');
			setNewQuantity('');
		}
	};

	const handleRemoveIngredient = (id) => {
		setIngredients(ingredients.filter((ing) => ing.id !== id));
	};

	const handleSearchRecipes = () => {
		// Mock data for demonstration
		const mockRecipes = [
			{
				id: 1,
				title: 'Pasta with Tomato Sauce',
				image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
				time: '30 mins',
				servings: 4,
				rating: 4.5,
				category: 'dinner',
				missingIngredients: ['Pasta', 'Tomato Sauce'],
			},
			{
				id: 2,
				title: 'Vegetable Stir Fry',
				image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
				time: '20 mins',
				servings: 2,
				rating: 4.8,
				category: 'lunch',
				missingIngredients: ['Soy Sauce', 'Rice'],
			},
		];
		setSuggestedRecipes(mockRecipes);
	};

	return (
		<div className="max-w-6xl mx-auto">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					What's in Your Fridge?
				</h1>
				<p className="text-gray-600">
					Enter the ingredients you have, and we'll suggest recipes you can make!
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="bg-white rounded-lg shadow p-6">
					<h2 className="text-xl font-semibold mb-4">Your Ingredients</h2>
					<form onSubmit={handleAddIngredient} className="mb-4">
						<div className="grid grid-cols-2 gap-4">
							<input
								type="text"
								value={newIngredient}
								onChange={(e) => setNewIngredient(e.target.value)}
								placeholder="Ingredient name"
								className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							/>
							<input
								type="text"
								value={newQuantity}
								onChange={(e) => setNewQuantity(e.target.value)}
								placeholder="Quantity"
								className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>
						<button
							type="submit"
							className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center"
						>
							<FiPlus className="mr-2" />
							Add Ingredient
						</button>
					</form>

					{ingredients.length > 0 ? (
						<ul className="space-y-2">
							{ingredients.map((ingredient) => (
								<li
									key={ingredient.id}
									className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
								>
									<div>
										<span className="font-medium">{ingredient.name}</span>
										<span className="text-gray-500 ml-2">
											({ingredient.quantity})
										</span>
									</div>
									<button
										onClick={() => handleRemoveIngredient(ingredient.id)}
										className="text-red-500 hover:text-red-700"
									>
										<FiTrash2 className="h-5 w-5" />
									</button>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-500 text-center py-4">
							No ingredients added yet
						</p>
					)}

					{ingredients.length > 0 && (
						<button
							onClick={handleSearchRecipes}
							className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center"
						>
							<FiSearch className="mr-2" />
							Find Recipes
						</button>
					)}
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-4">Suggested Recipes</h2>
					{suggestedRecipes.length > 0 ? (
						<div className="space-y-6">
							{suggestedRecipes.map((recipe) => (
								<div key={recipe.id} className="bg-white rounded-lg shadow p-4">
									<RecipeCard recipe={recipe} showFavorite={false} />
									{recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
										<div className="mt-4">
											<h3 className="font-medium text-gray-700 mb-2">
												Missing Ingredients:
											</h3>
											<ul className="flex flex-wrap gap-2">
												{recipe.missingIngredients.map((ingredient, index) => (
													<li
														key={index}
														className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
													>
														{ingredient}
													</li>
												))}
											</ul>
										</div>
									)}
								</div>
							))}
						</div>
					) : (
						<div className="bg-white rounded-lg shadow p-6 text-center">
							<p className="text-gray-500">
								Add some ingredients and click "Find Recipes" to get suggestions!
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default WhatsInYourFridge; 
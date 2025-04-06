import { useState } from 'react';
import { FiTrash2, FiClock, FiUsers, FiStar, FiCalendar, FiCheckCircle } from 'react-icons/fi';

const GroceryList = () => {
	const [recipes, setRecipes] = useState([
		{
			id: 1,
			title: 'Spaghetti Carbonara',
			image: 'https://images.unsplash.com/photo-1589227365533-cee630bd59bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			time: '30 mins',
			servings: 4,
			difficulty: 'Easy',
			rating: 4.5,
			ratingCount: 128,
			addedDate: '2024-03-15',
			ingredients: [
				{ id: 1, name: 'Spaghetti', quantity: '400g', category: 'pantry', checked: false },
				{ id: 2, name: 'Pancetta', quantity: '200g', category: 'meat', checked: false },
				{ id: 3, name: 'Eggs', quantity: '4', category: 'dairy', checked: false },
				{ id: 4, name: 'Pecorino Cheese', quantity: '50g', category: 'dairy', checked: false },
				{ id: 5, name: 'Parmesan', quantity: '50g', category: 'dairy', checked: false },
			],
		},
		{
			id: 2,
			title: 'Avocado Toast',
			image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			time: '10 mins',
			servings: 2,
			difficulty: 'Easy',
			rating: 4.8,
			ratingCount: 95,
			addedDate: '2024-03-16',
			ingredients: [
				{ id: 6, name: 'Bread', quantity: '4 slices', category: 'pantry', checked: false },
				{ id: 7, name: 'Avocado', quantity: '2', category: 'produce', checked: false },
				{ id: 8, name: 'Eggs', quantity: '4', category: 'dairy', checked: false },
				{ id: 9, name: 'Salt', quantity: 'to taste', category: 'pantry', checked: false },
				{ id: 10, name: 'Pepper', quantity: 'to taste', category: 'pantry', checked: false },
			],
		},
	]);

	const handleRemoveItem = (recipeId, itemId) => {
		setRecipes(recipes.map(recipe => {
			if (recipe.id === recipeId) {
				return {
					...recipe,
					ingredients: recipe.ingredients.filter(item => item.id !== itemId)
				};
			}
			return recipe;
		}));
	};

	const handleToggleItem = (recipeId, itemId) => {
		setRecipes(recipes.map(recipe => {
			if (recipe.id === recipeId) {
				return {
					...recipe,
					ingredients: recipe.ingredients.map(item => {
						if (item.id === itemId) {
							return { ...item, checked: !item.checked };
						}
						return item;
					})
				};
			}
			return recipe;
		}));
	};

	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const getCheckedCount = (ingredients) => {
		return ingredients.filter(item => item.checked).length;
	};

	return (
		<div className="space-y-8 max-w-6xl mx-auto p-6">
			{/* Header Section */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-4xl font-bold">Your Grocery List</h1>
					<p className="text-gray-600 mt-2">Track your shopping items and meal ingredients</p>
				</div>
			</div>

			{/* Recipe Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{recipes.map((recipe) => (
					<div
						key={recipe.id}
						className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
					>
						<div className="relative h-48">
							<img
								src={recipe.image}
								alt={recipe.title}
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
							<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
								<h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<FiStar className="text-yellow-400" />
										<span className="text-lg">
											{recipe.rating} ({recipe.ratingCount})
										</span>
									</div>
									<div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
										<FiCalendar className="text-primary-300" />
										<span className="text-sm">{formatDate(recipe.addedDate)}</span>
									</div>
								</div>
								<div className="flex items-center gap-6 mt-2">
									<div className="flex items-center gap-2">
										<FiClock className="text-primary-300" />
										{recipe.time}
									</div>
									<div className="flex items-center gap-2">
										<FiUsers className="text-primary-300" />
										{recipe.servings} servings
									</div>
								</div>
							</div>
						</div>
						<div className="p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-xl font-semibold">Ingredients</h3>
								<div className="flex items-center gap-2 text-sm text-gray-500">
									<FiCheckCircle className="text-green-500" />
									<span>{getCheckedCount(recipe.ingredients)}/{recipe.ingredients.length} items</span>
								</div>
							</div>
							<ul className="space-y-3">
								{recipe.ingredients.map((ingredient) => (
									<li
										key={ingredient.id}
										className="flex items-center gap-3 group"
									>
										<input
											type="checkbox"
											checked={ingredient.checked}
											onChange={() => handleToggleItem(recipe.id, ingredient.id)}
											className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
										/>
										<span
											className={`flex-1 ${ingredient.checked ? 'line-through text-gray-400' : ''
												}`}
										>
											{ingredient.name}
										</span>
										<span className="text-gray-500">{ingredient.quantity}</span>
										<button
											onClick={() => handleRemoveItem(recipe.id, ingredient.id)}
											className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-600"
										>
											<FiTrash2 />
										</button>
									</li>
								))}
							</ul>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default GroceryList; 
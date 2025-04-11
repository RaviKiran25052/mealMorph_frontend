import { useState } from 'react';
import { FiX, FiSearch, FiClock, FiUsers, FiStar, FiChevronDown, FiPlus } from 'react-icons/fi';

const RecipePopup = ({
	isOpen,
	onClose,
	onSelect,
	recipes = [],
}) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [filters, setFilters] = useState({
		category: 'all',
		sortBy: 'rating',
		vegType: 'all',
	});
	const [isToggleEnabled, setIsToggleEnabled] = useState(false);

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters(prev => ({
			...prev,
			[name]: value
		}));
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

	const handleClose = () => {
		setSearchQuery('');
		setIsToggleEnabled(false);
		setFilters(prev => ({
			...prev,
			vegType: 'all'
		}));
		onClose();
	};
	const handleRecipeSelect = async (recipe) => {
		setIsLoading(true);
		setError(null);
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 500));
			onSelect(recipe);
			handleClose();
		} catch (err) {
			setError('Failed to select recipe. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const filteredRecipes = recipes
		.filter(recipe => {
			if (filters.category !== 'all' && recipe.type !== filters.category) return false;
			if (filters.vegType !== 'all' && recipe.vegType !== filters.vegType) return false;
			if (searchQuery) {
				return recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
			}
			return true;
		})
		.sort((a, b) => {
			switch (filters.sortBy) {
				case 'rating':
					return b.rating - a.rating;
				case 'time':
					return parseInt(a.time) - parseInt(b.time);
				case 'servings':
					return b.servings - a.servings;
				default:
					return 0;
			}
		});

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="flex flex-col bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden transform transition-all duration-300">
				{/* Header */}
				<div className="p-4 border-b border-gray-200">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-semibold">Select Recipe</h2>
						<button
							onClick={handleClose}
							className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
						>
							<FiX className="h-5 w-5" />
						</button>
					</div>
					<div className="mt-4 space-y-4">
						{/* Search Bar */}
						<div className="relative">
							<input
								type="text"
								value={searchQuery}
								onChange={handleSearch}
								placeholder="Search recipes..."
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
							/>
							<FiSearch className="absolute right-3 top-2.5 text-gray-400" />
						</div>

						{/* Filters */}
						<div className="flex flex-wrap gap-4">
							<div className="flex-1 min-w-[200px]">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Category
								</label>
								<div className="relative">
									<select
										name="category"
										value={filters.category}
										onChange={handleFilterChange}
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
									>
										<option value="all">All Categories</option>
										<option value="breakfast">Breakfast</option>
										<option value="lunch">Lunch</option>
										<option value="dinner">Dinner</option>
									</select>
									<FiChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
								</div>
							</div>
							<div className="flex-1 min-w-[200px]">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Sort By
								</label>
								<div className="relative">
									<select
										name="sortBy"
										value={filters.sortBy}
										onChange={handleFilterChange}
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
									>
										<option value="rating">Rating</option>
										<option value="time">Cooking Time</option>
										<option value="servings">Servings</option>
									</select>
									<FiChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
								</div>
							</div>
							<div className="flex-1 min-w-[200px]">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Diet Type
								</label>
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
					</div>
				</div>

				{/* Content */}
				<div className="p-4 overflow-y-auto flex-1">
					{error && (
						<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
							{error}
						</div>
					)}
					{isLoading ? (
						<div className="flex items-center justify-center h-32">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
						</div>
					) : filteredRecipes.length === 0 ? (
						<div className="text-center py-8 text-gray-500">
							No recipes found. Try adjusting your filters or search term.
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
							{filteredRecipes.map((recipe) => (
								<div
									key={recipe.id}
									className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
								>
									<div className="relative overflow-hidden">
										<img
											src={recipe.image}
											alt={recipe.title}
											className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
										/>
										{/* Plus button */}
										<button
											onClick={() => handleRecipeSelect(recipe)}
											className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-primary-600 text-primary-600 hover:text-white rounded-lg transition-colors duration-200 shadow-md z-10"
										>
											<FiPlus className="h-5 w-5" />
										</button>
										{/* Overlay with recipe details */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
											<div className="flex items-center gap-2 mb-2">
												<h3 className="text-xl font-semibold text-white">
													{recipe.title}
												</h3>
												<div className={`w-4 h-4 bg-white flex items-center justify-center border ${recipe.vegType === 'veg'
													? 'border-green-500'
													: 'border-red-500'
													}`}>
													{recipe.vegType === 'veg' ? (
														<div className="w-2 h-2 bg-green-500 rounded-full"></div>
													) : (
														<div className="w-2 h-2 bg-red-500 clip-triangle"></div>
													)}
												</div>
											</div>
											<div className="flex flex-wrap gap-3">
												<div className="flex items-center text-white/90">
													<FiClock className="mr-1 text-blue-300" />
													<span className="text-sm">{recipe.time}</span>
												</div>
												<div className="flex items-center text-white/90">
													<FiUsers className="mr-1 text-blue-300" />
													<span className="text-sm">{recipe.servings} servings</span>
												</div>
												<div className="flex items-center text-white/90">
													<FiStar className="mr-1 text-yellow-400" />
													<span className="text-sm font-medium">{recipe.rating}</span>
													<span className="text-sm text-white/70 ml-1">({recipe.ratingCount})</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default RecipePopup;

// Add styles for the triangle shape
const styles = `
	.clip-triangle {
		clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
	}
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet); 
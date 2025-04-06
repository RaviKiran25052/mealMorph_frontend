import { useState } from 'react';
import { FiFilter, FiX, FiSearch, FiChevronDown } from 'react-icons/fi';

const FilterBar = ({ onFilterChange, onSearch }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [filters, setFilters] = useState({
		category: '',
		servings: '',
		sortBy: 'rating',
	});

	const categoryOptions = [
		{ value: '', label: 'All Categories' },
		{ value: 'breakfast', label: 'Breakfast' },
		{ value: 'lunch', label: 'Lunch' },
		{ value: 'dinner', label: 'Dinner' },
		{ value: 'snacks', label: 'Snacks' },
		{ value: 'desserts', label: 'Desserts' },
		{ value: 'vegetarian', label: 'Vegetarian' },
		{ value: 'non-vegetarian', label: 'Non-Vegetarian' },
		{ value: 'seafood', label: 'Seafood' },
		{ value: 'vegan', label: 'Vegan' },
		{ value: 'gluten-free', label: 'Gluten Free' },
		{ value: 'keto', label: 'Keto' },
	];

	const servingsOptions = [
		{ value: '', label: 'Any Servings' },
		{ value: '1', label: '1 serving' },
		{ value: '2', label: '2 servings' },
		{ value: '4', label: '4 servings' },
		{ value: '6', label: '6 servings' },
		{ value: '8', label: '8+ servings' },
	];

	const sortOptions = [
		{ value: 'rating', label: 'Rating' },
		{ value: 'servings', label: 'Servings' },
	];

	const handleChange = (e) => {
		const { name, value } = e.target;
		const newFilters = { ...filters, [name]: value };
		setFilters(newFilters);
		onFilterChange(newFilters);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		onSearch(searchQuery);
	};

	return (
		<div className="mb-6">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<form onSubmit={handleSearch} className="flex-1 max-w-md">
					<div className="relative">
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search by ingredients..."
							className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
						/>
						<FiSearch className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
					</div>
				</form>
				<div className="flex items-center space-x-4">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all duration-300 group"
					>
						<FiFilter className="h-5 w-5" />
						<span>Filters</span>
						<FiChevronDown
							className={`h-4 w-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
						/>
					</button>
					<select
						name="sortBy"
						value={filters.sortBy}
						onChange={handleChange}
						className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all duration-300"
					>
						{sortOptions.map((option) => (
							<option key={option.value} value={option.value}>
								Sort by: {option.label}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
				<div className={`mt-4 p-4 bg-white border border-gray-300 rounded-md transform transition-all duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-4'}`}>
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-semibold">Filter Recipes</h3>
						<button
							onClick={() => setIsOpen(false)}
							className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
						>
							<FiX className="h-5 w-5" />
						</button>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Category
							</label>
							<select
								name="category"
								value={filters.category}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
							>
								{categoryOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Servings
							</label>
							<select
								name="servings"
								value={filters.servings}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
							>
								{servingsOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FilterBar; 
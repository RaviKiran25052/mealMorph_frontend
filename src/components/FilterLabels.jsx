import { FiX } from 'react-icons/fi';

const FilterLabels = ({ filters, onRemoveFilter }) => {
	const getFilterLabel = (key, value) => {
		switch (key) {
			case 'category':
				return value.charAt(0).toUpperCase() + value.slice(1);
			case 'servings':
				return `${value} servings`;
			case 'sortBy':
				return `Sorted by: ${value}`;
			default:
				return value;
		}
	};

	return (
		<div className="flex flex-wrap gap-2 mt-4">
			{Object.entries(filters).map(([key, value]) => {
				if (value && key !== 'sortBy') {
					return (
						<div
							key={key}
							className="flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
						>
							<span>{getFilterLabel(key, value)}</span>
							<button
								onClick={() => onRemoveFilter(key)}
								className="hover:text-primary-900 transition-colors"
							>
								<FiX className="h-4 w-4" />
							</button>
						</div>
					);
				}
				return null;
			})}
		</div>
	);
};

export default FilterLabels; 
import { Link } from 'react-router-dom';
import { FiClock, FiUsers, FiStar } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import { GiMeat } from 'react-icons/gi';

const RecipeCard = ({ recipe }) => {
	return (
		<Link
			to={`/recipe/${recipe.id}`}
			className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
		>
			<div className="relative h-48">
				<img
					src={recipe.image}
					alt={recipe.title}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
				<div className="absolute top-4 right-4">
					{recipe.type === 'veg' ? (
						<div className="bg-green-500 text-white p-2 rounded-full">
							<FaLeaf className="w-5 h-5" />
						</div>
					) : (
						<div className="bg-red-500 text-white p-2 rounded-full">
							<GiMeat className="w-5 h-5" />
						</div>
					)}
				</div>
			</div>
			<div className="p-6">
				<h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
					{recipe.title}
				</h3>
				<div className="flex items-center gap-4 text-gray-600 mb-4">
					<div className="flex items-center gap-1">
						<FiClock className="w-4 h-4" />
						<span className="text-sm">{recipe.cookingTime}</span>
					</div>
					<div className="flex items-center gap-1">
						<FiUsers className="w-4 h-4" />
						<span className="text-sm">{recipe.servings} servings</span>
					</div>
					<div className="flex items-center gap-1">
						<FiStar className="w-4 h-4 text-yellow-400" />
						<span className="text-sm">
							{recipe.rating} ({recipe.ratingCount})
						</span>
					</div>
				</div>
				<div className="flex flex-wrap gap-2">
					<span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
						{recipe.category}
					</span>
					<span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
						{recipe.difficulty}
					</span>
				</div>
			</div>
		</Link>
	);
};

export default RecipeCard; 
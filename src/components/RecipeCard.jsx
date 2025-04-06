import { Link } from 'react-router-dom';
import { FiClock, FiUsers, FiStar } from 'react-icons/fi';

function RecipeCard({ recipe }) {
	return (
		<Link
			to={`/recipe/${recipe.id}`}
			className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
		>
			<div className="relative h-48 overflow-hidden">
				<img
					src={recipe.image}
					alt={recipe.title}
					className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
				/>
				<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
					<div className="flex items-center gap-2 text-white">
						<FiStar className="text-yellow-400" />
						<span className="text-sm font-medium">
							{recipe.rating} ({recipe.ratingCount || 0})
						</span>
					</div>
				</div>
			</div>
			<div className="p-4">
				<h3 className="font-semibold text-lg mb-2 line-clamp-1">{recipe.title}</h3>
				<div className="flex items-center gap-4 text-sm text-gray-500">
					<div className="flex items-center gap-1">
						<FiClock className="text-primary-500" />
						{recipe.time}
					</div>
					<div className="flex items-center gap-1">
						<FiUsers className="text-primary-500" />
						{recipe.servings} servings
					</div>
				</div>
			</div>
		</Link>
	);
}

export default RecipeCard; 
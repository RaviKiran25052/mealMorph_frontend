import { useState } from 'react';
import { FiStar, FiClock, FiCalendar, FiUsers, FiBookmark } from 'react-icons/fi';

const MyKitchen = () => {
	const [activeTab, setActiveTab] = useState('recent'); // Changed to 'recent' as default

	// Sample data - replace with your actual data
	const favorites = [
		{
			id: 1,
			title: 'Spaghetti Carbonara',
			image: 'https://images.unsplash.com/photo-1589227365533-cee630bd59bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			time: '30 mins',
			servings: 4,
			rating: 4.8,
			ratingCount: 128,
		},
		// Add more favorites...
	];

	const recentCooks = [
		{
			id: 1,
			title: 'Pasta Primavera',
			image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			date: '2024-03-15',
			rating: 4.7,
			ratingCount: 42,
			notes: 'Added extra garlic and basil for more flavor',
		},
		// Add more recent cooks...
	];

	return (
		<div className="space-y-8 max-w-6xl mx-auto">
			{/* Header */}
			<div className="flex justify-between items-center">
				<h1 className="text-4xl font-bold">My Kitchen</h1>
				<div className="flex gap-4">
					<button
						onClick={() => setActiveTab('favorites')}
						className={`px-4 py-2 rounded-lg transition-colors duration-300 ${activeTab === 'favorites'
							? 'bg-primary-600 text-white'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
							}`}
					>
						<FiBookmark className="inline-block mr-2" />
						Favorites
					</button>
					<button
						onClick={() => setActiveTab('recent')}
						className={`px-4 py-2 rounded-lg transition-colors duration-300 ${activeTab === 'recent'
							? 'bg-primary-600 text-white'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
							}`}
					>
						<FiCalendar className="inline-block mr-2" />
						Recent Cooks
					</button>
				</div>
			</div>

			{/* Content */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{activeTab === 'favorites' ? (
					favorites.map((recipe) => (
						<div
							key={recipe.id}
							className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
						>
							<div className="relative h-48">
								<img
									src={recipe.image}
									alt={recipe.title}
									className="w-full h-full object-cover"
								/>
								<div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
									<FiStar className="inline-block mr-1 text-yellow-400" />
									{recipe.rating} ({recipe.ratingCount})
								</div>
							</div>
							<div className="p-6">
								<h3 className="font-semibold text-xl mb-2">{recipe.title}</h3>
								<div className="flex items-center gap-4 text-gray-600">
									<div className="flex items-center gap-1">
										<FiClock />
										{recipe.time}
									</div>
									<div className="flex items-center gap-1">
										<FiUsers />
										{recipe.servings} servings
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					recentCooks.map((cook) => (
						<div
							key={cook.id}
							className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
						>
							<div className="relative h-48">
								<img
									src={cook.image}
									alt={cook.title}
									className="w-full h-full object-cover"
								/>
								<div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
									<FiStar className="inline-block mr-1 text-yellow-400" />
									{cook.rating} ({cook.ratingCount})
								</div>
							</div>
							<div className="p-6">
								<h3 className="font-semibold text-xl mb-2">{cook.title}</h3>
								<div className="flex items-center gap-2 text-gray-600 mb-3">
									<FiCalendar />
									{new Date(cook.date).toLocaleDateString()}
								</div>
								<p className="text-gray-600">{cook.notes}</p>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default MyKitchen; 
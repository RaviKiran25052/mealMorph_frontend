import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiUsers, FiStar, FiChevronRight, FiChevronLeft, FiCoffee } from 'react-icons/fi';
import { IoFastFoodOutline, IoFishOutline } from 'react-icons/io5';
import { LuIceCreamBowl, LuLeaf } from 'react-icons/lu';
import { TbCake, TbMeat, TbSoup } from 'react-icons/tb';
import { RiDrinks2Line } from 'react-icons/ri';
import { BiBowlRice } from 'react-icons/bi';
import { PiBowlFood, PiForkKnife } from 'react-icons/pi';

const featuredRecipes = [
	{
		id: 1,
		title: 'Spaghetti Carbonara',
		image: 'https://images.unsplash.com/photo-1589227365533-cee630bd59bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		time: '30 mins',
		servings: 4,
		rating: 4.8,
		ratingCount: 128,
		category: 'Dinner',
	},
	{
		id: 2,
		title: 'Avocado Toast',
		image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		time: '10 mins',
		servings: 2,
		rating: 4.5,
		ratingCount: 95,
		category: 'Breakfast',
	},
	{
		id: 3,
		title: 'Chocolate Chip Cookies',
		image: 'https://images.unsplash.com/photo-1558964122-2a69744c5c93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		time: '25 mins',
		servings: 24,
		rating: 4.9,
		ratingCount: 215,
		category: 'Dessert',
	},
	{
		id: 4,
		title: 'Grilled Salmon',
		image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		time: '20 mins',
		servings: 2,
		rating: 4.7,
		ratingCount: 156,
		category: 'Dinner',
	},
	{
		id: 5,
		title: 'Berry Smoothie Bowl',
		image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		time: '15 mins',
		servings: 1,
		rating: 4.6,
		ratingCount: 87,
		category: 'Breakfast',
	},
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
	{
		id: 2,
		title: 'Chicken Stir Fry',
		image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		date: '2024-03-14',
		rating: 4.5,
		ratingCount: 38,
		notes: 'Used brown rice instead of white rice',
	},
	{
		id: 3,
		title: 'Blueberry Pancakes',
		image: 'https://images.unsplash.com/photo-1566607553669-1c0f0b1d0b4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		date: '2024-03-13',
		rating: 4.9,
		ratingCount: 56,
		notes: 'Added extra blueberries and maple syrup',
	},
];

const categories = [
	{
		name: 'Breakfast',
		icon: <FiCoffee className="w-8 h-8" />,
		count: 45,
		image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
	},
	{
		name: 'Lunch',
		icon: <BiBowlRice className="w-8 h-8" />,
		count: 62,
		image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
	},
	{
		name: 'Dinner',
		icon: <PiForkKnife className="w-8 h-8" />,
		count: 78,
		image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
	},
	{
		name: 'Curries',
		icon: <PiBowlFood className="w-8 h-8" />,
		count: 42,
		image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
	},
	{
		name: 'Desserts',
		icon: <LuIceCreamBowl className="w-8 h-8" />,
		count: 34,
		image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
	},
	{
		name: 'Snacks',
		icon: <IoFastFoodOutline className="w-8 h-8" />,
		count: 28,
		image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
	},
	{
		name: 'Vegetarian',
		icon: <LuLeaf className="w-8 h-8" />,
		count: 56,
		image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
	},
	{
		name: 'Non-Vegetarian',
		icon: <TbMeat className="w-8 h-8" />,
		count: 72,
		image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
	},
	{
		name: 'Seafood',
		icon: <IoFishOutline className="w-8 h-8" />,
		count: 48,
		image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
	},
	{
		name: 'Soups',
		icon: <TbSoup className="w-8 h-8" />,
		count: 38,
		image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
	},
	{
		name: 'Smoothies',
		icon: <RiDrinks2Line className="w-8 h-8" />,
		count: 42,
		image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
	},
	{
		name: 'Cake',
		icon: <TbCake className="w-8 h-8" />,
		count: 35,
		image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
	}
];

function Home() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	useEffect(() => {
		let interval;
		if (isAutoPlaying) {
			interval = setInterval(() => {
				setCurrentSlide((prev) => (prev + 1) % featuredRecipes.length);
			}, 5000);
		}
		return () => clearInterval(interval);
	}, [isAutoPlaying]);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % featuredRecipes.length);
		setIsAutoPlaying(false);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + featuredRecipes.length) % featuredRecipes.length);
		setIsAutoPlaying(false);
	};

	return (
		<div className="space-y-12">
			{/* Enhanced Hero Section */}
			<section className="relative h-[80vh] rounded-2xl overflow-hidden">
				{/* Dynamic Background with Parallax Effect */}
				<div className="absolute inset-0">
					<img
						src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
						alt="Hero Background"
						className="w-full h-full object-cover transform scale-110 animate-zoom-in-out"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
				</div>

				{/* Content */}
				<div className="relative h-full flex flex-col justify-center items-start px-8 md:px-16 lg:px-24">
					<div className="max-w-2xl space-y-6">
						<h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in">
							<span className="text-primary-400">Discover</span> Your Next
							<br />
							Favorite <span className="text-primary-400">Meal</span>
						</h1>
						<p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in-up">
							Find recipes based on your ingredients, dietary preferences, and cooking time
						</p>
						<div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
							<Link
								to="/whats-in-your-fridge"
								className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-300 text-lg hover:scale-105 shadow-lg hover:shadow-primary-500/30"
							>
								What's in Your Fridge?
							</Link>
							<Link
								to="/recipes"
								className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 text-lg hover:scale-105 border border-white/20"
							>
								Browse Recipes
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Categories Section */}
			<section className="animate-fade-in">
				<h2 className="text-3xl font-bold mb-8">Browse Categories</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{categories.map((category, index) => (
						<Link
							key={category.name}
							to={`/recipes?category=${category.name.toLowerCase()}`}
							className="group relative h-48 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
							style={{ animationDelay: `${index * 100}ms` }}
						>
							<img
								src={category.image}
								alt={category.name}
								className="absolute inset-0 w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/30" />
							<div className="relative h-full flex flex-col items-center justify-center p-4 text-white">
								<div className="bg-white/20 backdrop-blur-sm p-3 rounded-full mb-4 transform group-hover:scale-110 transition-transform duration-300">
									{category.icon}
								</div>
								<h3 className="font-semibold text-xl">{category.name}</h3>
								<p className="text-sm opacity-90">{category.count} recipes</p>
							</div>
						</Link>
					))}
				</div>
			</section>

			{/* Featured Recipes Carousel */}
			<section className="animate-fade-in">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-3xl font-bold">Featured Recipes</h2>
					<Link
						to="/recipes"
						className="text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors duration-300"
					>
						View All <FiChevronRight />
					</Link>
				</div>
				<div className="relative group">
					<div className="overflow-hidden rounded-2xl">
						<div
							className="flex transition-transform duration-500 ease-in-out"
							style={{ transform: `translateX(-${currentSlide * 100}%)` }}
						>
							{featuredRecipes.map((recipe) => (
								<div key={recipe.id} className="w-full flex-shrink-0">
									<div className="relative h-[500px] md:h-[600px]">
										<img
											src={recipe.image}
											alt={recipe.title}
											className="w-full h-full object-cover"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
										<div className="absolute bottom-0 left-0 right-0 p-8 text-white">
											<div className="bg-white/20 backdrop-blur-sm inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4">
												{recipe.category}
											</div>
											<h3 className="text-4xl font-bold mb-4">{recipe.title}</h3>
											<div className="flex items-center gap-6 text-lg">
												<div className="flex items-center gap-2">
													<FiClock className="text-primary-300" />
													{recipe.time}
												</div>
												<div className="flex items-center gap-2">
													<FiUsers className="text-primary-300" />
													{recipe.servings} servings
												</div>
												<div className="flex items-center gap-2">
													<FiStar className="text-yellow-400" />
													{recipe.rating} ({recipe.ratingCount})
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<button
						onClick={prevSlide}
						className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
					>
						<FiChevronLeft size={28} />
					</button>
					<button
						onClick={nextSlide}
						className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
					>
						<FiChevronRight size={28} />
					</button>
				</div>
			</section>

			{/* Recent Cooks Section */}
			<section className="animate-fade-in">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-3xl font-bold">Your Recent Cooks</h2>
					<Link
						to="/my-kitchen"
						className="text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors duration-300"
					>
						View More <FiChevronRight />
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{recentCooks.map((cook) => (
						<div
							key={cook.id}
							className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
						>
							<div className="relative h-56 overflow-hidden">
								<img
									src={cook.image}
									alt={cook.title}
									className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
								/>
								<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
									<div className="flex items-center gap-2 text-white">
										<FiStar className="text-yellow-400" />
										<span className="text-lg">{cook.rating} ({cook.ratingCount})</span>
									</div>
								</div>
							</div>
							<div className="p-6">
								<h3 className="font-semibold text-xl mb-2">{cook.title}</h3>
								<p className="text-sm text-gray-500 mb-3">
									Cooked on {new Date(cook.date).toLocaleDateString()}
								</p>
								<p className="text-gray-600">{cook.notes}</p>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}

export default Home; 
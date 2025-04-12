import React from 'react';
import { FiList, FiCheckCircle } from 'react-icons/fi';

const IngredientsCard = ({ ingredients }) => {
	return (
		<div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 transition-all hover:shadow-lg">
			<h2 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent flex items-center gap-2 mb-4">
				<FiList className="text-primary-500" />
				Ingredients
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{ingredients.map((ingredient, index) => (
					<li
						key={index}
						className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-white border border-gray-100 hover:border-primary-200 transition-all duration-200 hover:shadow-sm group list-none"
					>
						<div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
							<FiCheckCircle />
						</div>
						<div className="flex-1">
							<p className="font-medium text-gray-800 group-hover:text-primary-600 transition-colors duration-200">
								{ingredient.name}
							</p>
							<div className="text-sm text-gray-500">
								{ingredient.amount} {ingredient.unit}
							</div>
						</div>
					</li>
				))}
			</div>
		</div>
	);
};

export default IngredientsCard; 
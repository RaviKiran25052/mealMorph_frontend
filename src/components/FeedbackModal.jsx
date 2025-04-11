import { useState } from 'react';
import { FiX, FiStar } from 'react-icons/fi';

const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
	const [name, setName] = useState('');
	const [rating, setRating] = useState(0);
	const [hoveredStar, setHoveredStar] = useState(0);
	const [description, setDescription] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({
			name,
			rating,
			description
		});
		setName('');
		setRating(0);
		setDescription('');
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto m-4">
				<div className="p-6 border-b border-gray-200">
					<div className="flex justify-between items-center">
						<h2 className="text-2xl font-bold text-gray-900">Leave Feedback</h2>
						<button
							onClick={onClose}
							className="p-2 hover:bg-gray-100 rounded-full transition-colors"
						>
							<FiX className="w-6 h-6" />
						</button>
					</div>
				</div>

				<div className="p-6">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Your Name
							</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
								placeholder="Enter your name"
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Rating
							</label>
							<div className="flex gap-2">
								{[1, 2, 3, 4, 5].map((star) => (
									<button
										key={star}
										type="button"
										onMouseEnter={() => setHoveredStar(star)}
										onMouseLeave={() => setHoveredStar(0)}
										onClick={() => setRating(star)}
										className="p-1 transition-transform hover:scale-110"
									>
										<FiStar
											className={`w-8 h-8 ${star <= (hoveredStar || rating)
													? 'fill-yellow-400 text-yellow-400'
													: 'text-gray-300'
												}`}
										/>
									</button>
								))}
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Your Feedback
							</label>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								rows={4}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
								placeholder="Share your experience with this recipe..."
								required
							/>
						</div>

						<button
							type="submit"
							className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
						>
							Submit Feedback
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default FeedbackModal; 
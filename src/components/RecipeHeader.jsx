import React from 'react';
import { FiArrowLeft, FiVolume2, FiVolumeX, FiMic, FiMicOff, FiHelpCircle, FiClock, FiUser, FiStar, FiPlay } from 'react-icons/fi';

const RecipeHeader = ({
	recipe,
	id,
	navigate,
	isSpeechEnabled,
	setIsSpeechEnabled,
	isListening,
	toggleVoiceRecognition,
	setShowHelp,
	cookingStarted,
	startCooking
}) => {
	return (
		<div className="relative rounded-2xl shadow-xl mb-6 overflow-hidden">
			{/* Recipe image as background */}
			<div className="absolute inset-0">
				<img
					src={recipe.image}
					alt={recipe.title}
					className="w-full h-full object-cover object-center brightness-75"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
			</div>

			<div className="relative p-8 text-white z-10">
				<div className="flex items-center justify-between mb-6">
					<button
						onClick={() => navigate(`/recipe/${id}`)}
						className="flex items-center gap-2 text-white hover:text-white/90 transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 shadow-lg"
					>
						<FiArrowLeft />
						Back to Recipe
					</button>
					{cookingStarted &&
						<div className="flex items-center gap-3">
							<button
								onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
								className={`p-3 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-lg ${isSpeechEnabled ? 'bg-white/20 text-white' : 'bg-black/20 text-white/70'}`}
								title={isSpeechEnabled ? "Mute voice guidance" : "Enable voice guidance"}
							>
								{isSpeechEnabled ? <FiVolume2 /> : <FiVolumeX />}
							</button>
							<div className="relative group">
								<button
									onClick={toggleVoiceRecognition}
									className={`p-3 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-lg ${isListening ? 'bg-red-400/30 text-white animate-pulse' : 'bg-black/20 text-white/70'}`}
									title={isListening ? "Voice recognition active" : "Enable voice commands"}
								>
									{isListening ? <FiMic /> : <FiMicOff />}
								</button>
								<div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 right-0 top-full mt-2 w-64 p-3 bg-black/80 backdrop-blur-md text-white text-xs rounded-md z-50 transition-all duration-200 shadow-lg">
									{isListening ? (
										<div>
											<p className="font-semibold mb-1 text-green-400">Voice recognition active</p>
										</div>
									) : (
										<div>
											<p className="font-semibold mb-1">Click to enable voice commands</p>
											<p className="mb-2">You can use the following commands:</p>
											<ul className="space-y-1 list-disc pl-4">
												<li>"Next step" or "Next"</li>
												<li>"Previous step" or "Back"</li>
												<li>"Repeat" to hear the current step</li>
												<li>"Set timer for 5 minutes"</li>
											</ul>
										</div>
									)}
								</div>
							</div>
							<button
								onClick={() => setShowHelp(true)}
								className="p-3 rounded-full bg-black/20 text-white/70 hover:bg-white/20 hover:text-white transition-all backdrop-blur-md border border-white/10 shadow-lg"
								title="Show help"
							>
								<FiHelpCircle />
							</button>
						</div>
					}
				</div>

				<div className="flex-1">
					<h1 className="text-5xl font-bold mb-3 drop-shadow-lg">{recipe.title}</h1>
					<p className="text-white/90 drop-shadow-lg text-lg max-w-3xl">{recipe.description}</p>

					<div className="flex flex-wrap gap-3 mt-6">
						<div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl text-sm border border-white/10 shadow-lg">
							<FiClock className="text-green-300" />
							<span>{recipe.time}</span>
						</div>
						<div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl text-sm border border-white/10 shadow-lg">
							<FiUser className="text-blue-300" />
							<span>{recipe.servings} servings</span>
						</div>
						<div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl text-sm border border-white/10 shadow-lg">
							<FiStar className="text-yellow-300" />
							<span>{recipe.rating} rating</span>
						</div>
						{!cookingStarted &&
							<button
								onClick={startCooking}
								className="ml-auto bg-primary-500/90 backdrop-blur-md text-white px-5 py-2 rounded-xl font-medium text-sm hover:bg-primary-600 transition-colors flex items-center gap-2 shadow-lg border border-primary-400/30"
							>
								<FiPlay className="text-white" />
								Start Cooking
							</button>
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecipeHeader; 
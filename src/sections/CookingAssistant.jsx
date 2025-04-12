import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	FiMic, FiMicOff, FiVolume2, FiVolumeX, FiClock, FiPlay, FiPause,
	FiArrowLeft, FiArrowRight, FiAlertCircle, FiCheckCircle, FiHelpCircle, FiList,
	FiInfo, FiStar, FiUser
} from 'react-icons/fi';

const CookingAssistant = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [recipe, setRecipe] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [currentStep, setCurrentStep] = useState(0);
	const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
	const [isListening, setIsListening] = useState(false);
	const [timers, setTimers] = useState([]);
	const [showHelp, setShowHelp] = useState(false);
	const [cookingStarted, setCookingStarted] = useState(false);
	const [showInitialHelp, setShowInitialHelp] = useState(false);
	const [customTimerInput, setCustomTimerInput] = useState({ minutes: "", seconds: "", label: "" });
	const [timerTemplates, setTimerTemplates] = useState([
		{ name: "Boil Pasta", duration: 600 },
		{ name: "Sauté Vegetables", duration: 300 },
		{ name: "Simmer Sauce", duration: 480 },
		{ name: "Preheat Oven", duration: 900 }
	]);
	const speechSynthesisRef = useRef(null);
	const recognitionRef = useRef(null);

	// Mock recipe data - replace with API data
	const mockRecipe = {
		id: 1,
		title: 'Spaghetti Carbonara',
		image: 'https://images.unsplash.com/photo-1589227365533-cee630bd59bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
		time: '30 mins',
		servings: 4,
		rating: 4.5,
		ratingCount: 128,
		description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper.',
		ingredients: [
			{ name: 'spaghetti', amount: 400, unit: 'g' },
			{ name: 'pancetta', amount: 200, unit: 'g' },
			{ name: 'large eggs', amount: 4, unit: '' },
			{ name: 'pecorino cheese', amount: 50, unit: 'g' },
			{ name: 'parmesan', amount: 50, unit: 'g' },
			{ name: 'black pepper', amount: 1, unit: 'tsp' },
			{ name: 'salt', amount: 1, unit: 'tsp' },
		],
		instructions: [
			'Bring a large pot of salted water to boil and cook the spaghetti according to package instructions.',
			'While the pasta is cooking, heat a large skillet over medium heat and cook the pancetta until crispy.',
			'In a bowl, whisk together the eggs, grated cheeses, and black pepper.',
			'Drain the pasta, reserving some of the cooking water.',
			'Working quickly, add the hot pasta to the skillet with the pancetta, then remove from heat.',
			'Add the egg mixture and toss quickly to coat the pasta, adding a splash of pasta water if needed.',
			'Serve immediately with extra grated cheese and black pepper.',
		],
		timers: [
			{ stepIndex: 0, duration: 600, label: 'Cook pasta' },
			{ stepIndex: 1, duration: 300, label: 'Cook pancetta' },
		],
	};

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				setIsLoading(true);
				// TODO: Replace with actual API call
				// const response = await fetch(`/api/recipes/${id}`);
				// const data = await response.json();
				// setRecipe(data);
				setRecipe(mockRecipe);
				setTimeout(() => setIsLoading(false), 1000); // Simulate loading
			} catch (err) {
				console.error('Failed to load recipe', err);
				setIsLoading(false);
			}
		};

		if (id) {
			fetchRecipe();
		}

		// Initialize speech recognition
		if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			recognitionRef.current = new SpeechRecognition();
			recognitionRef.current.continuous = true;
			recognitionRef.current.interimResults = false;

			recognitionRef.current.onresult = (event) => {
				const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
				processVoiceCommand(command);
			};

			recognitionRef.current.onerror = (event) => {
				console.error('Speech recognition error', event.error);
				setIsListening(false);
			};
		}

		return () => {
			// Cleanup
			if (recognitionRef.current) {
				recognitionRef.current.stop();
			}
			if (speechSynthesisRef.current) {
				window.speechSynthesis.cancel();
			}
		};
	}, [id]);

	// Voice commands processor
	const processVoiceCommand = (command) => {
		// Navigate between steps
		if (command.includes('next step') || command.includes('next')) {
			handleNextStep();
		} else if (command.includes('previous step') || command.includes('back')) {
			handlePreviousStep();
		}
		// Timer controls - enhanced pattern recognition
		else if (command.includes('timer') || command.includes('set timer') || command.includes('start timer')) {
			let duration = 0;

			// Check for minutes in various formats
			const minutesPatterns = [
				/(\d+)\s*minute/i,               // "5 minutes", "5 minute"
				/(\d+)\s*min/i,                  // "5 min"
				/(\d+)\s*m\b/i,                  // "5 m"
				/(\d+)\s*o'clock/i,              // Misrecognized "5 o'clock" for "5 minutes"
				/(\d+)\s*clock/i                 // Misrecognized "5 clock" for "5 minutes"
			];

			for (const pattern of minutesPatterns) {
				const match = command.match(pattern);
				if (match) {
					duration += parseInt(match[1]) * 60;
					break;
				}
			}

			// Check for seconds in various formats
			const secondsPatterns = [
				/(\d+)\s*second/i,               // "30 seconds"
				/(\d+)\s*sec/i,                  // "30 sec"
				/(\d+)\s*s\b/i                   // "30 s"
			];

			for (const pattern of secondsPatterns) {
				const match = command.match(pattern);
				if (match) {
					duration += parseInt(match[1]);
					break;
				}
			}

			// If we found a time, set the timer
			if (duration > 0) {
				// Extract a possible label after the time
				const timeRemoved = command.replace(/\d+\s*(minute|min|m|second|sec|s|o'clock|clock)\w*\s*/gi, '').trim();
				const label = timeRemoved.length > 0 ?
					timeRemoved.charAt(0).toUpperCase() + timeRemoved.slice(1) :
					`Timer ${timers.length + 1}`;

				addTimer(duration, label);
				speakText(`Timer set for ${Math.floor(duration / 60)} minutes and ${duration % 60} seconds${label !== `Timer ${timers.length}` ? ' for ' + label : ''}`);
			} else {
				// If no time was found but they asked for a timer, set a default 1-minute timer
				addTimer(60, `Quick Timer`);
				speakText("I didn't catch the time, setting a 1-minute timer");
			}
		}
		// Read step
		else if (command.includes('read step') || command.includes('repeat')) {
			speakText(recipe.instructions[currentStep]);
		}
		// Toggle speech
		else if (command.includes('mute') || command.includes('stop speaking')) {
			setIsSpeechEnabled(false);
		} else if (command.includes('unmute') || command.includes('start speaking')) {
			setIsSpeechEnabled(true);
		}
	};

	// Text-to-speech function
	const speakText = (text) => {
		if (!isSpeechEnabled) return;

		if (window.speechSynthesis) {
			window.speechSynthesis.cancel(); // Stop any current speech
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.rate = 0.9; // Slightly slower rate for cooking instructions
			speechSynthesisRef.current = utterance;
			window.speechSynthesis.speak(utterance);
		}
	};

	// Toggle voice recognition
	const toggleVoiceRecognition = () => {
		if (isListening) {
			recognitionRef.current.stop();
		} else {
			recognitionRef.current.start();
			speakText("Voice recognition activated. You can say 'next step', 'previous step', 'repeat', or 'start timer'.");
		}
		setIsListening(!isListening);
	};

	// Navigation between steps
	const handleNextStep = () => {
		if (currentStep < recipe.instructions.length - 1) {
			setCurrentStep(currentStep + 1);
			speakText(recipe.instructions[currentStep + 1]);
		}
	};

	const handlePreviousStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
			speakText(recipe.instructions[currentStep - 1]);
		}
	};

	// Timer functions
	const addTimer = (duration, label = `Timer ${timers.length + 1}`) => {
		const newTimer = {
			id: Date.now(),
			duration,
			remaining: duration,
			isRunning: true,
			label: label
		};
		setTimers([...timers, newTimer]);
		speakText(`Timer set for ${formatTime(duration)}`);
	};

	const toggleTimer = (id) => {
		setTimers(timers.map(timer =>
			timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
		));
	};

	const removeTimer = (id) => {
		setTimers(timers.filter(timer => timer.id !== id));
	};

	// Format time from seconds to MM:SS
	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	};

	// Update timers every second
	useEffect(() => {
		const timerInterval = setInterval(() => {
			setTimers(prevTimers =>
				prevTimers.map(timer => {
					if (timer.isRunning && timer.remaining > 0) {
						const newRemaining = timer.remaining - 1;
						// Alert when timer reaches zero
						if (newRemaining === 0 && isSpeechEnabled) {
							speakText(`${timer.label} timer is done`);
						}
						return { ...timer, remaining: newRemaining };
					}
					return timer;
				})
			);
		}, 1000);

		return () => clearInterval(timerInterval);
	}, [isSpeechEnabled]);

	// Speak instruction when step changes - only if cooking has started
	useEffect(() => {
		if (recipe && !isLoading && isSpeechEnabled && cookingStarted) {
			speakText(recipe.instructions[currentStep]);
		}
	}, [currentStep, isLoading, recipe, isSpeechEnabled, cookingStarted]);

	// Start cooking function
	const startCooking = () => {
		setShowInitialHelp(true);
	};

	// Modify the startCookingAfterHelp function to handle both cases
	const startCookingAfterHelp = () => {
		setShowInitialHelp(false);

		// Only start cooking if this was called from the initial help modal
		if (!cookingStarted) {
			setCookingStarted(true);
			if (isSpeechEnabled) {
				speakText(`Let's start cooking ${recipe.title}. ${recipe.instructions[currentStep]}`);
			}
		}
	};

	// Add a function to add a timer template
	const addTimerTemplate = (name, duration) => {
		addTimer(duration, name);
	};

	if (isLoading || !recipe) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="loader"></div>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto p-4">
			{/* Header with title and controls */}
			<div className="relative rounded-2xl shadow-xl mb-6 overflow-hidden">
				{/* Recipe image as background - improved for better visibility */}
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
						<div className="flex items-center gap-3">
							<button
								onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
								className={`p-3 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-lg ${isSpeechEnabled ? 'bg-white/20 text-white' : 'bg-black/20 text-white/70'}`}
								title={isSpeechEnabled ? "Mute voice guidance" : "Enable voice guidance"}
							>
								{isSpeechEnabled ? <FiVolume2 /> : <FiVolumeX />}
							</button>
							<button
								onClick={toggleVoiceRecognition}
								className={`p-3 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-lg ${isListening ? 'bg-red-400/30 text-white animate-pulse' : 'bg-black/20 text-white/70'}`}
								title={isListening ? "Turn off voice commands" : "Enable voice commands"}
							>
								{isListening ? <FiMic /> : <FiMicOff />}
							</button>
							<button
								onClick={() => setShowHelp(!showHelp)}
								className="p-3 rounded-full bg-black/20 text-white/70 hover:bg-white/20 hover:text-white transition-all backdrop-blur-md border border-white/10 shadow-lg"
								title="Show help"
							>
								<FiHelpCircle />
							</button>
						</div>
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

			{/* Single Voice Command Guide modal for both initial help and regular help */}
			{(showHelp || showInitialHelp) && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm">
					<div className="bg-white rounded-2xl shadow-xl max-w-2xl overflow-hidden w-full m-4 animate-fadeIn">
						<div className="px-6 py-2 border-b border-gray-100 sticky top-0 bg-white z-10">
							<div className="flex items-center justify-between">
								<h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
									Voice Command Guide
								</h2>
								<button
									onClick={() => showInitialHelp ? setShowInitialHelp(false) : setShowHelp(false)}
									className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<line x1="18" y1="6" x2="6" y2="18"></line>
										<line x1="6" y1="6" x2="18" y2="18"></line>
									</svg>
								</button>
							</div>
						</div>

						<div className="p-6 overflow-auto max-h-[70vh]">
							<div className="bg-primary-50 rounded-xl p-4 mb-6 border border-primary-100">
								<p className="text-primary-700">
									Speak clearly and naturally. For the best experience, wait for the beep before giving commands.
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div>
									<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
										<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
											<FiArrowRight />
										</div>
										Navigation Commands
									</h3>
									<ul className="space-y-4">
										<li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
											<div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 mt-1">
												<span className="font-mono font-bold">1</span>
											</div>
											<div>
												<div className="font-medium text-gray-800">"Next step" or "Next"</div>
												<div className="text-sm text-gray-600 mt-1">Move to the next instruction</div>
											</div>
										</li>
										<li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
											<div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 mt-1">
												<span className="font-mono font-bold">2</span>
											</div>
											<div>
												<div className="font-medium text-gray-800">"Previous step" or "Back"</div>
												<div className="text-sm text-gray-600 mt-1">Go back to the previous instruction</div>
											</div>
										</li>
										<li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
											<div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 mt-1">
												<span className="font-mono font-bold">3</span>
											</div>
											<div>
												<div className="font-medium text-gray-800">"Repeat" or "Read step"</div>
												<div className="text-sm text-gray-600 mt-1">Read the current step again</div>
											</div>
										</li>
									</ul>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
										<div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
											<FiClock />
										</div>
										Timer & Voice Controls
									</h3>
									<ul className="space-y-4">
										<li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
											<div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
												<span className="font-mono font-bold">1</span>
											</div>
											<div>
												<div className="font-medium text-gray-800">"Start timer 5 minutes"</div>
												<div className="text-sm text-gray-600 mt-1">Set a timer for any duration</div>
											</div>
										</li>
										<li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
											<div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
												<span className="font-mono font-bold">2</span>
											</div>
											<div>
												<div className="font-medium text-gray-800">"Mute" or "Stop speaking"</div>
												<div className="text-sm text-gray-600 mt-1">Turn off voice guidance</div>
											</div>
										</li>
										<li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
											<div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
												<span className="font-mono font-bold">3</span>
											</div>
											<div>
												<div className="font-medium text-gray-800">"Unmute" or "Start speaking"</div>
												<div className="text-sm text-gray-600 mt-1">Turn on voice guidance</div>
											</div>
										</li>
									</ul>
								</div>
							</div>

							<div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
								<h3 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
									<FiInfo />
									Tips for Best Results
								</h3>
								<ul className="space-y-2 text-sm text-yellow-700">
									<li className="flex items-start gap-2">
										<span>•</span>
										<span>Speak clearly and at a normal pace</span>
									</li>
									<li className="flex items-start gap-2">
										<span>•</span>
										<span>Reduce background noise when using voice commands</span>
									</li>
									<li className="flex items-start gap-2">
										<span>•</span>
										<span>If a command isn't recognized, try rephrasing or using simpler terms</span>
									</li>
								</ul>
							</div>

							<div className="mt-6 flex justify-end">
								{showInitialHelp ? (
									<button
										onClick={startCookingAfterHelp}
										className="px-5 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
									>
										Got it, Start Cooking
									</button>
								) : (
									<button
										onClick={() => setShowHelp(false)}
										className="px-5 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
									>
										Got it
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Main content grid */}
			{cookingStarted ? (
				<>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Left column: Instructions */}
						<div className="lg:col-span-2">
							<div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 overflow-hidden transform transition-all hover:shadow-lg">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Instructions</h2>
									<div className="flex items-center gap-2">
										<span className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
											{currentStep + 1}
										</span>
										<span className="text-gray-400">/</span>
										<span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
											{recipe.instructions.length}
										</span>
									</div>
								</div>

								<div className="relative mb-8">
									<div className="absolute left-0 top-0 w-1 h-full bg-primary-500 rounded-full"></div>
									<div className="ml-6 p-6 bg-gradient-to-r from-primary-50 to-white rounded-xl border border-primary-100 shadow-sm">
										<p className="text-xl leading-relaxed">{recipe.instructions[currentStep]}</p>
									</div>

									<div className="absolute top-1/2 -left-3 transform -translate-y-1/2 w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold animate-pulse">
										{currentStep + 1}
									</div>
								</div>

								<div className="flex items-center justify-between">
									<button
										onClick={handlePreviousStep}
										disabled={currentStep === 0}
										className={`flex items-center gap-2 px-5 py-3 rounded-lg transform transition-all duration-200 ${currentStep === 0
											? 'bg-gray-200 text-gray-400 cursor-not-allowed'
											: 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:-translate-x-1 active:translate-x-0'
											}`}
									>
										<FiArrowLeft />
										Previous
									</button>

									<button
										onClick={() => speakText(recipe.instructions[currentStep])}
										className="px-5 py-3 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-all duration-200 hover:shadow-md"
									>
										Repeat Step
									</button>

									<button
										onClick={handleNextStep}
										disabled={currentStep === recipe.instructions.length - 1}
										className={`flex items-center gap-2 px-5 py-3 rounded-lg transform transition-all duration-200 ${currentStep === recipe.instructions.length - 1
											? 'bg-gray-200 text-gray-400 cursor-not-allowed'
											: 'bg-primary-500 text-white hover:bg-primary-600 hover:translate-x-1 active:translate-x-0 shadow-md hover:shadow-lg'
											}`}
									>
										Next
										<FiArrowRight />
									</button>
								</div>
							</div>
						</div>

						{/* Right column: Timers and Ingredients */}
						<div className="space-y-6">
							{/* Timers */}
							<div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 transition-all hover:shadow-lg">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent flex items-center gap-2">
										<FiClock className="text-primary-500" />
										Timers
									</h2>
									<div className="flex items-center gap-2">
										<button
											onClick={() => {
												const minutes = customTimerInput.minutes || 0;
												const seconds = customTimerInput.seconds || 0;
												const duration = minutes * 60 + seconds;

												if (duration > 0) {
													addTimer(duration, customTimerInput.label || `Timer ${timers.length + 1}`);
													setCustomTimerInput({ minutes: "", seconds: "", label: "" });
												}
											}}
											disabled={(customTimerInput.minutes || 0) === 0 && (customTimerInput.seconds || 0) === 0}
											className={`px-4 py-2 rounded-lg text-white transition-colors ${(customTimerInput.minutes || 0) === 0 && (customTimerInput.seconds || 0) === 0
												? 'bg-gray-300 cursor-not-allowed'
												: 'bg-primary-500 hover:bg-primary-600'
												}`}
										>
											+ Add Timer
										</button>
									</div>
								</div>

								{/* Custom timer input */}
								<div className="mb-6">
									<div className="grid grid-cols-7 gap-2">
										<div className="col-span-2">
											<label className="block text-xs text-gray-500 mb-1">Minutes</label>
											<input
												type="number"
												min="0"
												max="60"
												value={customTimerInput.minutes || ""}
												onChange={(e) => setCustomTimerInput({
													...customTimerInput,
													minutes: e.target.value ? parseInt(e.target.value) : ""
												})}
												className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
												placeholder="5"
											/>
										</div>
										<div className="col-span-2">
											<label className="block text-xs text-gray-500 mb-1">Seconds</label>
											<input
												type="number"
												min="0"
												max="59"
												value={customTimerInput.seconds || ""}
												onChange={(e) => setCustomTimerInput({
													...customTimerInput,
													seconds: e.target.value ? parseInt(e.target.value) : ""
												})}
												className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
												placeholder="30"
											/>
										</div>
										<div className="col-span-3">
											<label className="block text-xs text-gray-500 mb-1">Label</label>
											<input
												type="text"
												value={customTimerInput.label || ""}
												onChange={(e) => setCustomTimerInput({ ...customTimerInput, label: e.target.value })}
												className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
												placeholder="Timer label"
											/>
										</div>
									</div>
								</div>

								{/* Timer templates */}
								<div className="flex flex-wrap gap-2 mb-4">
									{timerTemplates.map((template, index) => (
										<button
											key={index}
											onClick={() => addTimerTemplate(template.name, template.duration)}
											className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-primary-100 transition-colors"
										>
											{template.name} ({Math.floor(template.duration / 60)}:{(template.duration % 60).toString().padStart(2, '0')})
										</button>
									))}
								</div>

								{timers.length === 0 ? (
									<div className="flex flex-col items-center justify-center py-12 text-gray-400">
										<div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
											<FiClock className="text-3xl" />
										</div>
										<p className="font-medium">No active timers</p>
										<p className="text-sm mt-1">Add a timer or use voice command</p>
									</div>
								) : (
									<ul className="space-y-4">
										{timers.map(timer => (
											<li
												key={timer.id}
												className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
											>
												<div className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-bold text-lg ${timer.remaining < 10 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-white text-gray-800 shadow-sm'
													}`}>
													{formatTime(timer.remaining)}
												</div>
												<div className="flex-1">
													<p className="font-medium text-gray-800">{timer.label}</p>
													<div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
														<div
															className={`h-2 rounded-full transition-all duration-1000 ${timer.remaining < timer.duration * 0.2 ? 'bg-red-500' : 'bg-primary-500'
																}`}
															style={{ width: `${(timer.remaining / timer.duration) * 100}%` }}
														></div>
													</div>
												</div>
												<div className="flex gap-1">
													<button
														onClick={() => toggleTimer(timer.id)}
														className={`p-2 rounded-lg ${timer.isRunning
															? 'bg-primary-100 text-primary-600 hover:bg-primary-200'
															: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
															} transition-colors duration-200`}
													>
														{timer.isRunning ? <FiPause /> : <FiPlay />}
													</button>
													<button
														onClick={() => removeTimer(timer.id)}
														className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
													>
														<FiAlertCircle />
													</button>
												</div>
											</li>
										))}
									</ul>
								)}
							</div>

							{/* Quick Ingredients Reference */}
							<div className="bg-white rounded-2xl shadow-md p-6 pr-1 border border-gray-100 transition-all hover:shadow-lg">
								<h2 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent flex items-center gap-2 mb-4">
									<FiList className="text-primary-500" />
									Ingredients
								</h2>
								<ul className="space-y-3 max-h-[300px] overflow-auto pr-2">
									{recipe.ingredients.map((ingredient, index) => (
										<li
											key={index}
											className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-white border border-gray-100 hover:border-primary-200 transition-all duration-200 hover:shadow-sm group"
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
								</ul>
							</div>
						</div>
					</div>
				</>
			) : (
				<div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
					<div className="relative p-8 text-center">
						<h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Ready to Cook?</h2>

						<p className="text-gray-600 mb-8 max-w-2xl mx-auto">
							Get ready for an interactive cooking experience with step-by-step voice guidance.
							Click the Start Cooking button above to begin your culinary journey.
						</p>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
							<div className="bg-gray-50 p-5 rounded-xl">
								<div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
									<FiVolume2 className="text-blue-600" />
								</div>
								<h3 className="font-semibold mb-2">Voice Guidance</h3>
								<p className="text-sm text-gray-500">Listen to step-by-step instructions as you cook</p>
							</div>

							<div className="bg-gray-50 p-5 rounded-xl">
								<div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
									<FiMic className="text-green-600" />
								</div>
								<h3 className="font-semibold mb-2">Voice Commands</h3>
								<p className="text-sm text-gray-500">Control cooking steps hands-free with your voice</p>
							</div>

							<div className="bg-gray-50 p-5 rounded-xl">
								<div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
									<FiClock className="text-purple-600" />
								</div>
								<h3 className="font-semibold mb-2">Smart Timers</h3>
								<p className="text-sm text-gray-500">Set and manage cooking timers with voice alerts</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CookingAssistant; 
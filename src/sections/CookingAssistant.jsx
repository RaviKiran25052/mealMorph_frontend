import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	FiMic, FiMicOff, FiVolume2, FiVolumeX, FiClock, FiPlay,
	FiArrowLeft, FiHelpCircle, FiStar, FiUser
} from 'react-icons/fi';
import HelpModal from '../components/HelpModal';
import TimerComponent from '../components/TimerComponent';
import InstructionsCard from '../components/InstructionsCard';
import IngredientsCard from '../components/IngredientsCard';
import ReadyToCookCard from '../components/ReadyToCookCard';
import RecipeHeader from '../components/RecipeHeader';
import VoiceCommandTooltip from '../components/VoiceCommandTooltip';

const CookingAssistant = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [recipe, setRecipe] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [currentStep, setCurrentStep] = useState(0);
	const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
	const [isListening, setIsListening] = useState(false);
	const [lastCommand, setLastCommand] = useState('');
	const [timers, setTimers] = useState([]);
	const [showHelp, setShowHelp] = useState(false);
	const [cookingStarted, setCookingStarted] = useState(false);
	const [showInitialHelp, setShowInitialHelp] = useState(false);
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
				setLastCommand(command); // Store the recognized command
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
		// Check if recipe is loaded before processing commands
		if (!recipe) {
			speakText("I'm sorry, the recipe isn't loaded yet. Please try again in a moment.");
			return;
		}

		// Log the command for debugging
		console.log("Voice command recognized:", command);

		// Navigate between steps
		if (command.includes('next step') || command.includes('next')) {
			console.log("Next step command detected");
			if (currentStep < recipe.instructions.length - 1) {
				console.log("Moving to next step:", currentStep + 1);
				setCurrentStep(prevStep => Math.min(prevStep + 1, recipe.instructions.length - 1));
				// The useEffect will handle speaking the new step
			} else {
				console.log("Already at last step, can't go forward");
				speakText("You've reached the last step of the recipe. That was the final instruction.");

				// To add some helpfulness, suggest what they might want to do next
				setTimeout(() => {
					speakText("Would you like me to repeat this step or go back to a previous one?");
				}, 2000);
			}
		} else if (command.includes('previous step') || command.includes('back')) {
			console.log("Previous step command detected");
			if (currentStep > 0) {
				console.log("Moving to previous step:", currentStep - 1);
				setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
				// The useEffect will handle speaking the new step
			} else {
				console.log("Already at first step, can't go back");
				speakText("You're at the first step of the recipe. There are no previous steps.");
			}
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
			if (recipe.instructions && recipe.instructions.length > currentStep) {
				speakText(recipe.instructions[currentStep]);
			} else {
				speakText("I'm sorry, I can't read the current step. Please try again.");
			}
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
		if (!text) return;

		try {
			if (window.speechSynthesis) {
				window.speechSynthesis.cancel(); // Stop any current speech
				const utterance = new SpeechSynthesisUtterance(text);
				utterance.rate = 0.9; // Slightly slower rate for cooking instructions
				speechSynthesisRef.current = utterance;
				window.speechSynthesis.speak(utterance);
			}
		} catch (error) {
			console.error("Error with speech synthesis:", error);
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
		if (!recipe || !recipe.instructions) {
			speakText("I'm sorry, the recipe isn't loaded yet. Please try again in a moment.");
			return;
		}

		if (currentStep < recipe.instructions.length - 1) {
			setCurrentStep(currentStep + 1);
			if (isSpeechEnabled && cookingStarted) {
				speakText(recipe.instructions[currentStep + 1]);
			}
		} else {
			speakText("You're already on the last step of the recipe.");
		}
	};

	const handlePreviousStep = () => {
		if (!recipe || !recipe.instructions) {
			speakText("I'm sorry, the recipe isn't loaded yet. Please try again in a moment.");
			return;
		}

		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
			if (isSpeechEnabled && cookingStarted) {
				speakText(recipe.instructions[currentStep - 1]);
			}
		} else {
			speakText("You're already on the first step of the recipe.");
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

	// Helper functions for timers
	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
	};

	// Modify the startCookingAfterHelp function to handle both cases
	const startCookingAfterHelp = () => {
		setShowInitialHelp(false);

		// Only start cooking if this was called from the initial help modal
		if (!cookingStarted) {
			setCookingStarted(true);

			if (isSpeechEnabled && recipe && recipe.instructions && recipe.instructions.length > 0) {
				speakText(`Let's start cooking ${recipe.title}. ${recipe.instructions[currentStep]}`);
			} else if (isSpeechEnabled) {
				speakText(`Let's start cooking. Please wait while the recipe loads.`);
			}
		}
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
			<RecipeHeader
				recipe={recipe}
				id={id}
				navigate={navigate}
				isSpeechEnabled={isSpeechEnabled}
				setIsSpeechEnabled={setIsSpeechEnabled}
				isListening={isListening}
				toggleVoiceRecognition={toggleVoiceRecognition}
				setShowHelp={setShowHelp}
				cookingStarted={cookingStarted}
				startCooking={startCooking}
			/>

			{/* Voice Command Tooltip */}
			<VoiceCommandTooltip isListening={isListening} lastCommand={lastCommand} />

			{/* Help Modal */}
			<HelpModal
				isOpen={showHelp || showInitialHelp}
				onClose={() => showInitialHelp ? setShowInitialHelp(false) : setShowHelp(false)}
				isInitialHelp={showInitialHelp}
				onStartCooking={startCookingAfterHelp}
			/>

			{/* Main content grid */}
			{cookingStarted ? (
				<>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Left column: Instructions and Ingredients */}
						<div className="lg:col-span-2 space-y-6">
							{/* Instructions Card */}
							<InstructionsCard
								instructions={recipe.instructions}
								currentStep={currentStep}
								onPrevious={handlePreviousStep}
								onNext={handleNextStep}
								onRepeat={() => speakText(recipe.instructions[currentStep])}
							/>

							{/* Ingredients Card */}
							<IngredientsCard ingredients={recipe.ingredients} />
						</div>

						{/* Right column: Timers - unchanged position */}
						<div className="space-y-6">
							{/* Timers - using the TimerComponent */}
							<TimerComponent
								timers={timers}
								onAddTimer={addTimer}
								onToggleTimer={toggleTimer}
								onRemoveTimer={removeTimer}
								timerTemplates={timerTemplates}
								formatTime={formatTime}
							/>
						</div>
					</div>
				</>
			) : (
				<ReadyToCookCard />
			)}
		</div>
	);
};

export default CookingAssistant; 
import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiArrowRight, FiAlertCircle } from 'react-icons/fi';

const InstructionsCard = ({
	instructions,
	currentStep,
	onPrevious,
	onNext,
	onRepeat
}) => {
	const [showBoundaryAlert, setShowBoundaryAlert] = useState(false);
	const [boundaryMessage, setBoundaryMessage] = useState('');

	// Log step changes for debugging
	useEffect(() => {
		console.log("InstructionsCard - Current step updated:", currentStep);
	}, [currentStep]);

	// Safety check for currentStep being in bounds
	const safeCurrentStep = Math.max(0, Math.min(currentStep, instructions.length - 1));

	// If currentStep is out of bounds, correct it and log the issue
	useEffect(() => {
		if (currentStep !== safeCurrentStep) {
			console.error(`Step index out of bounds: ${currentStep}. Corrected to ${safeCurrentStep}`);

			// Show boundary alert
			if (currentStep > instructions.length - 1) {
				setBoundaryMessage("You've reached the end of the recipe!");
				setShowBoundaryAlert(true);
			} else if (currentStep < 0) {
				setBoundaryMessage("You're at the beginning of the recipe!");
				setShowBoundaryAlert(true);
			}

			// Hide the alert after 3 seconds
			const timer = setTimeout(() => {
				setShowBoundaryAlert(false);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [currentStep, safeCurrentStep, instructions.length]);

	return (
		<div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 overflow-hidden transform transition-all hover:shadow-lg relative">
			{/* Boundary alert */}
			{showBoundaryAlert && (
				<div className="absolute top-0 left-0 right-0 bg-amber-100 text-amber-800 px-4 py-2 flex items-center gap-2 animate-fadeIn z-10 border-b border-amber-200">
					<FiAlertCircle className="text-amber-600" />
					<p>{boundaryMessage}</p>
				</div>
			)}

			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Instructions</h2>
				<div className="flex items-center gap-2">
					<span className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
						{safeCurrentStep + 1}
					</span>
					<span className="text-gray-400">/</span>
					<span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
						{instructions.length}
					</span>
				</div>
			</div>

			<div className="relative mb-8">
				<div className="absolute left-0 top-0 w-1 h-full bg-primary-500 rounded-full"></div>
				<div className="ml-6 p-6 bg-gradient-to-r from-primary-50 to-white rounded-xl border border-primary-100 shadow-sm">
					<p className="text-xl leading-relaxed">{instructions[safeCurrentStep]}</p>
				</div>

				<div className="absolute top-1/2 -left-3 transform -translate-y-1/2 w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold animate-pulse">
					{safeCurrentStep + 1}
				</div>
			</div>

			<div className="flex items-center justify-between">
				<button
					onClick={onPrevious}
					disabled={safeCurrentStep === 0}
					className={`flex items-center gap-2 px-5 py-3 rounded-lg transform transition-all duration-200 ${safeCurrentStep === 0
						? 'bg-gray-200 text-gray-400 cursor-not-allowed'
						: 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:-translate-x-1 active:translate-x-0'
						}`}
				>
					<FiArrowLeft />
					Previous
				</button>

				<button
					onClick={onRepeat}
					className="px-5 py-3 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-all duration-200 hover:shadow-md"
				>
					Repeat Step
				</button>

				<button
					onClick={onNext}
					disabled={safeCurrentStep === instructions.length - 1}
					className={`flex items-center gap-2 px-5 py-3 rounded-lg transform transition-all duration-200 ${safeCurrentStep === instructions.length - 1
						? 'bg-gray-200 text-gray-400 cursor-not-allowed'
						: 'bg-primary-500 text-white hover:bg-primary-600 hover:translate-x-1 active:translate-x-0 shadow-md hover:shadow-lg'
						}`}
				>
					Next
					<FiArrowRight />
				</button>
			</div>
		</div>
	);
};

export default InstructionsCard; 
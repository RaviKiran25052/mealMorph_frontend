import React from 'react';
import { FiVolume2, FiMic, FiClock } from 'react-icons/fi';

const ReadyToCookCard = () => {
	return (
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
	);
};

export default ReadyToCookCard; 
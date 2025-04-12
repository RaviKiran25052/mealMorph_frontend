import { FiArrowRight, FiClock, FiInfo, FiHelpCircle } from 'react-icons/fi';

const HelpModal = ({
	isOpen,
	onClose,
	isInitialHelp = false,
	onStartCooking = null
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm">
			<div className="bg-white rounded-2xl shadow-xl max-w-2xl overflow-hidden w-full m-4 animate-fadeIn">
				<div className="px-6 py-2 border-b border-gray-100 sticky top-0 bg-white z-10">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
							Voice Command Guide
						</h2>
						<button
							onClick={onClose}
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
						{isInitialHelp ? (
							<button
								onClick={onStartCooking}
								className="px-5 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
							>
								Got it, Start Cooking
							</button>
						) : (
							<button
								onClick={onClose}
								className="px-5 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
							>
								Got it
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HelpModal; 
import { useState } from 'react';
import { FiClock, FiPlay, FiPause, FiAlertCircle } from 'react-icons/fi';

const TimerComponent = ({
	timers = [],
	onAddTimer,
	onToggleTimer,
	onRemoveTimer,
	timerTemplates = [],
	formatTime
}) => {
	const [customTimerInput, setCustomTimerInput] = useState({ minutes: "", seconds: "", label: "" });

	// Handle adding a custom timer
	const handleAddCustomTimer = () => {
		const minutes = customTimerInput.minutes || 0;
		const seconds = customTimerInput.seconds || 0;
		const duration = minutes * 60 + seconds;

		if (duration > 0) {
			onAddTimer(duration, customTimerInput.label || `Timer ${timers.length + 1}`);
			setCustomTimerInput({ minutes: "", seconds: "", label: "" });
		}
	};

	// Handle adding a timer from templates
	const handleAddTimerTemplate = (name, duration) => {
		onAddTimer(duration, name);
	};

	return (
		<div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 transition-all hover:shadow-lg">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent flex items-center gap-2">
					<FiClock className="text-primary-500" />
					Timers
				</h2>
				<div className="flex items-center gap-2">
					<button
						onClick={handleAddCustomTimer}
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
			{timerTemplates.length > 0 && (
				<div className="flex flex-wrap gap-2 mb-4">
					{timerTemplates.map((template, index) => (
						<button
							key={index}
							onClick={() => handleAddTimerTemplate(template.name, template.duration)}
							className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-primary-100 transition-colors"
						>
							{template.name} ({Math.floor(template.duration / 60)}:{(template.duration % 60).toString().padStart(2, '0')})
						</button>
					))}
				</div>
			)}

			{/* Timer display */}
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
									onClick={() => onToggleTimer(timer.id)}
									className={`p-2 rounded-lg ${timer.isRunning
										? 'bg-primary-100 text-primary-600 hover:bg-primary-200'
										: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
										} transition-colors duration-200`}
								>
									{timer.isRunning ? <FiPause /> : <FiPlay />}
								</button>
								<button
									onClick={() => onRemoveTimer(timer.id)}
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
	);
};

export default TimerComponent; 
import React, { useState, useEffect } from 'react';
import { FiMic, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const VoiceCommandTooltip = ({ isListening, lastCommand }) => {
	const [commandStatus, setCommandStatus] = useState('waiting'); // 'waiting', 'success', 'error'
	const [statusMessage, setStatusMessage] = useState('');

	// Determine command status based on content
	useEffect(() => {
		if (!lastCommand) {
			setCommandStatus('waiting');
			setStatusMessage('');
			return;
		}

		// Reset status first
		setCommandStatus('processing');
		setStatusMessage('Processing command...');

		// Check if the command is recognized
		setTimeout(() => {
			const isNavigationCommand = lastCommand.includes('next') ||
				lastCommand.includes('back') ||
				lastCommand.includes('previous') ||
				lastCommand.includes('repeat');

			const isTimerCommand = lastCommand.includes('timer') ||
				lastCommand.includes('minute') ||
				lastCommand.includes('second');

			const isSpeechCommand = lastCommand.includes('mute') ||
				lastCommand.includes('unmute') ||
				lastCommand.includes('speak');

			if (isNavigationCommand || isTimerCommand || isSpeechCommand) {
				setCommandStatus('success');
				setStatusMessage('Command executed');
			} else {
				setCommandStatus('error');
				setStatusMessage('Command not recognized. Try again.');
			}
		}, 800); // Simulate processing delay
	}, [lastCommand]);

	if (!isListening) return null;

	return (
		<div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-lg overflow-hidden animate-slideUp z-50 max-w-sm w-full">
			<div className="bg-primary-500 px-4 py-2 flex items-center justify-between text-white">
				<div className="flex items-center gap-2">
					<FiMic className="animate-pulse" />
					<span className="font-medium">Listening...</span>
				</div>
				{lastCommand && (
					<div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
						{commandStatus === 'success' && <FiCheckCircle className="text-green-300" />}
						{commandStatus === 'error' && <FiAlertCircle className="text-red-300" />}
						<span>{commandStatus === 'processing' ? 'Processing...' : statusMessage}</span>
					</div>
				)}
			</div>
			<div className="p-4">
				<div className="mb-3">
					<p className="text-sm text-gray-500 mb-1">Last recognized command:</p>
					<p className={`font-medium text-lg ${commandStatus === 'success' ? 'text-green-600' :
							commandStatus === 'error' ? 'text-red-600' : 'text-gray-800'
						}`}>
						{lastCommand ? `"${lastCommand}"` : "Say a command..."}
					</p>
				</div>
				<div className="mt-3 text-xs text-gray-500">
					<p className="mb-1">Try saying:</p>
					<ul className="space-y-1 pl-4 list-disc">
						<li>"Next step" or "Next"</li>
						<li>"Previous step" or "Back"</li>
						<li>"Repeat" to hear the current step</li>
						<li>"Set timer for 5 minutes"</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default VoiceCommandTooltip; 
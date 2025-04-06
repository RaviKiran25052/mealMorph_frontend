import { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaTimes } from "react-icons/fa";

export default function AuthPopup({ isOpen, onClose }) {
	const [isSignUp, setIsSignUp] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loginData, setLoginData] = useState({ email: "", password: "" });
	const [signUpData, setSignUpData] = useState({ email: "", password: "", confirmPassword: "" });

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (isSignUp) {
			setSignUpData((prev) => ({ ...prev, [name]: value }));
		} else {
			setLoginData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const toggleForm = () => {
		setIsSignUp(!isSignUp);
		setSignUpData({ email: "", password: "", confirmPassword: "" });
		setLoginData({ email: "", password: "" });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(isSignUp ? "Signing Up..." : "Logging In...", isSignUp ? signUpData : loginData);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Overlay */}
			<div
				className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
				onClick={onClose}
			></div>

			{/* Popup Card */}
			<div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300 scale-100">
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
				>
					<FaTimes className="w-5 h-5" />
				</button>

				<div className="p-8">
					<h2 className="text-3xl font-bold text-center text-primary-600 mb-2">
						{isSignUp ? "Create Account" : "Welcome Back"}
					</h2>
					<p className="text-center text-gray-500 mb-6">
						{isSignUp ? "Join MealMorph today" : "Sign in to continue"}
					</p>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="relative">
							<input
								type="email"
								id="email"
								name="email"
								value={isSignUp ? signUpData.email : loginData.email}
								onChange={handleChange}
								required
								autoComplete="off"
								className="w-full px-4 pl-10 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-primary-500 transition-colors duration-200"
								placeholder="Email"
							/>
							<FaEnvelope className="absolute left-3 top-4 text-gray-400" />
						</div>

						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								value={isSignUp ? signUpData.password : loginData.password}
								onChange={handleChange}
								required
								autoComplete="off"
								className="w-full px-4 pl-10 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-primary-500 transition-colors duration-200"
								placeholder="Password"
							/>
							<FaLock className="absolute left-3 top-4 text-gray-400" />
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>

						{isSignUp && (
							<div className="relative">
								<input
									type={showConfirmPassword ? "text" : "password"}
									id="confirmPassword"
									name="confirmPassword"
									value={signUpData.confirmPassword}
									onChange={handleChange}
									required
									autoComplete="off"
									className="w-full px-4 pl-10 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-primary-500 transition-colors duration-200"
									placeholder="Confirm Password"
								/>
								<FaLock className="absolute left-3 top-4 text-gray-400" />
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
								>
									{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
								</button>
							</div>
						)}

						<button
							type="submit"
							className="w-full bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 active:scale-95 transition-all duration-200 font-semibold text-lg shadow-md"
						>
							{isSignUp ? "Sign Up" : "Login"}
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-gray-600 text-sm">
							{isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
							<button
								onClick={toggleForm}
								className="text-primary-600 font-semibold hover:underline"
							>
								{isSignUp ? "Login" : "Sign Up"}
							</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
} 
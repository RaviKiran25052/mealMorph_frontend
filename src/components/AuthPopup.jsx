import { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaTimes, FaUser } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/mealmorph/auth`;

export default function AuthPopup({ isOpen, onClose, onAuthSuccess }) {
	const [isSignUp, setIsSignUp] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loginData, setLoginData] = useState({ email: "", password: "" });
	const [signUpData, setSignUpData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		firstName: "",
		lastName: ""
	});
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

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
		setSignUpData({ email: "", password: "", confirmPassword: "", firstName: "", lastName: "" });
		setLoginData({ email: "", password: "" });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		try {
			if (isSignUp) {
				// Validate passwords match
				if (signUpData.password !== signUpData.confirmPassword) {
					throw new Error('Passwords do not match');
				}

				// Register new user
				const { data } = await axios.post(`${API_BASE_URL}/register`, {
					email: signUpData.email,
					password: signUpData.password,
					username: signUpData.email.split('@')[0], // Using email prefix as username
					firstName: signUpData.firstName || '',
					lastName: signUpData.lastName || ''
				});

				// Store token and user data
				localStorage.setItem('token', data.token);
				localStorage.setItem('user', JSON.stringify(data.user));
				toast.success('Account created successfully!', {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
				onAuthSuccess(data.user);
				onClose();
			} else {
				// Login existing user
				const { data } = await axios.post(`${API_BASE_URL}/login`, {
					email: loginData.email,
					password: loginData.password,
				});

				// Store token and user data
				localStorage.setItem('token', data.token);
				localStorage.setItem('user', JSON.stringify(data.user));
				toast.success('Logged in successfully!', {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
				setSignUpData({ email: "", password: "", confirmPassword: "", firstName: "", lastName: "" });
				setLoginData({ email: "", password: "" });
				onAuthSuccess(data.user);
				onClose();
			}
		} catch (error) {
			const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
			toast.error(errorMessage, {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<>
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
							{error && (
								<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
									{error}
								</div>
							)}
							{isSignUp && (
								<div className="grid grid-cols-2 gap-4">
									<div className="relative">
										<input
											type="text"
											id="firstName"
											name="firstName"
											value={signUpData.firstName}
											onChange={handleChange}
											required
											className="w-full px-4 pl-10 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-primary-500 transition-colors duration-200"
											placeholder="First Name"
										/>
										<FaUser className="absolute left-3 top-4 text-gray-400" />
									</div>
									<div className="relative">
										<input
											type="text"
											id="lastName"
											name="lastName"
											value={signUpData.lastName}
											onChange={handleChange}
											required
											className="w-full px-4 pl-10 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-primary-500 transition-colors duration-200"
											placeholder="Last Name"
										/>
										<FaUser className="absolute left-3 top-4 text-gray-400" />
									</div>
								</div>
							)}
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
								disabled={isLoading}
								className={`w-full bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 active:scale-95 transition-all duration-200 font-semibold text-lg shadow-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
							>
								{isLoading ? (
									<span className="flex items-center justify-center">
										<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										{isSignUp ? "Signing up..." : "Logging in..."}
									</span>
								) : (
									isSignUp ? "Sign Up" : "Login"
								)}
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
		</>
	);
} 
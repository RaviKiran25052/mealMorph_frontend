import { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";

export default function AuthForm() {
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
		setIsSignUp(!isSignUp)
		setSignUpData({ email: "", password: "" })
		setLoginData({ email: "", password: "", confirmPassword: "" })
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(isSignUp ? "Signing Up..." : "Logging In...", isSignUp ? signUpData : loginData);
	};

	return (
		<div className="font-bai flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
			<div className="w-96 bg-white p-8 rounded-2xl shadow-xl">
				<h2 className="text-3xl font-bold text-center text-gray-800">
					{isSignUp ? "Create Account" : "Welcome Back"}
				</h2>

				<form onSubmit={handleSubmit} className="mt-6 space-y-6">
					<div className="relative">
						<input
							type="email"
							id="email"
							name="email"
							value={isSignUp ? signUpData.email : loginData.email}
							onChange={handleChange}
							required
							autoComplete="off"
							className="peer w-full px-4 pl-10 py-3 border-2 border-gray-300 rounded-xl outline-none bg-transparent focus:border-indigo-500"
						/>
						<label htmlFor="email" className={`absolute left-10 top-3 text-gray-500 transition-all duration-200 bg-white px-2 ${
										(isSignUp ? signUpData.email : loginData.email)
											? "top-[-10px] text-sm text-indigo-600"
											: "peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-indigo-600"
									}`}>
							Email
						</label>
						<FaEnvelope className="absolute left-3 top-4 text-gray-500" />
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
							className="peer w-full px-4 pl-10 py-3 border-2 border-gray-300 rounded-xl outline-none bg-transparent focus:border-indigo-500"
						/>
						<label htmlFor="password" className={`absolute left-10 top-3 text-gray-500 transition-all duration-200 bg-white px-2 ${
										(isSignUp ? signUpData.password : loginData.password)
											? "top-[-10px] text-sm text-indigo-600"
											: "peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-indigo-600"
									}`}>
							Password
						</label>
						<FaLock className="absolute left-3 top-4 text-gray-500" />
						<span
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-4 text-gray-500 cursor-pointer"
						>
							{showPassword ? <FaEye /> : <FaEyeSlash />}
						</span>
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
								className="peer w-full px-4 pl-10 py-3 border-2 border-gray-300 rounded-xl outline-none bg-transparent focus:border-indigo-500"
							/>
							<label htmlFor="confirmPassword" className={`absolute left-10 top-3 text-gray-500 transition-all duration-200 bg-white px-2 ${
										signUpData.confirmPassword
											? "top-[-10px] text-sm text-indigo-600"
											: "peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-indigo-600"
									}`}>
								Confirm Password
							</label>
							<FaLock className="absolute left-3 top-4 text-gray-500" />
							<span
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								className="absolute right-3 top-4 text-gray-500 cursor-pointer"
							>
								{showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
							</span>
						</div>
					)}

					<button
						type="submit"
						className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 active:scale-95 transition duration-200 font-semibold text-lg shadow-md"
					>
						{isSignUp ? "Sign Up" : "Login"}
					</button>
				</form>

				<p className="text-center text-gray-600 text-sm mt-4">
					{isSignUp ? "Already have an account?" : "Don't have an account?"} {" "}
					<button
						onClick={toggleForm}
						className="text-indigo-600 font-semibold hover:underline"
					>
						{isSignUp ? "Login" : "Sign Up"}
					</button>
				</p>
			</div>
		</div>
	);
}
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import AuthPopup from './AuthPopup';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Navbar = ({ items }) => {
	const location = useLocation();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		// Check if user is logged in on component mount
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
			setIsLoggedIn(true);
		}
	}, []);

	const handleAuthSuccess = (userData) => {
		setUser(userData);
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setUser(null);
		setIsLoggedIn(false);
		toast.success('Logged out successfully!', {
			position: "top-center",
			autoClose: 3000,
			theme: "dark",
		});
	};

	return (
		<>
			<nav className="bg-white shadow-lg sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex justify-between items-center h-16">
						{/* Logo and Desktop Navigation */}
						<div className="flex-shrink-0">
							<Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-200">
								MealMorph
							</Link>
						</div>
						<div className="hidden md:flex items-center ml-10 space-x-8">
							{items.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${location.pathname === item.path
										? 'text-primary-600'
										: 'text-gray-600 hover:text-gray-900'
										}`}
								>
									<span className="text-lg">{item.icon}</span>
									<span>{item.label}</span>
								</Link>
							))}
						</div>

						{/* Right side items */}
						<div className="flex items-center space-x-4">
							{/* Profile Menu */}
							<div className="relative">
								{isLoggedIn ? (
									<>
										<button
											className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
											onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
										>
											<div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
												<FiUser className="text-primary-600" />
											</div>
										</button>
										{/* Profile Dropdown */}
										{isProfileMenuOpen && (
											<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
												<div className="px-4 py-2 border-b border-gray-200">
													<p className="text-sm font-medium text-gray-900">
														{user?.firstName} {user?.lastName}
													</p>
													<p className="text-xs text-gray-500">{user?.email}</p>
												</div>
												<div className="py-1">
													<Link
														to="/profile"
														className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
														onClick={() => setIsProfileMenuOpen(false)}
													>
														<FiUser className="mr-2" />
														Profile
													</Link>
													<button
														className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
														onClick={handleLogout}
													>
														<FiLogOut className="mr-2" />
														Sign out
													</button>
												</div>
											</div>
										)}
									</>
								) : (
									<button
										onClick={() => setIsAuthPopupOpen(true)}
										className="group relative px-4 py-2 text-sm font-medium text-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
									>
										<div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-300"></div>
										<div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0"></div>
										<span className="relative flex items-center space-x-2">
											<FaUser className="text-lg" />
											<span>Login</span>
										</span>
									</button>
								)}
							</div>

							{/* Mobile menu button */}
							<div className="md:hidden">
								<button
									type="button"
									className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
									onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								>
									<span className="sr-only">Open main menu</span>
									{isMobileMenuOpen ? (
										<FiX className="block h-6 w-6" />
									) : (
										<FiMenu className="block h-6 w-6" />
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile menu - Slide in from right */}
			<div className={`md:hidden fixed inset-0 z-40 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
				{/* Overlay */}
				<div
					className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
						}`}
					onClick={() => setIsMobileMenuOpen(false)}
				></div>

				{/* Slide menu */}
				<div
					className={`fixed right-0 top-0 bottom-0 w-64 bg-white shadow-xl transform transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
						}`}
				>
					<div className="flex flex-col h-full">
						{/* Menu header */}
						<div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
							<Link
								to="/"
								className="text-xl font-bold text-primary-600 transition-colors duration-200 hover:text-primary-700"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								MealMorph
							</Link>
							<button
								onClick={() => setIsMobileMenuOpen(false)}
								className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
							>
								<FiX className="h-6 w-6" />
							</button>
						</div>

						{/* Menu items */}
						<div className="flex-1 overflow-y-auto py-4">
							{items.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									className={`flex items-center space-x-3 px-4 py-3 text-base font-medium transition-colors duration-200 ${location.pathname === item.path
										? 'text-primary-600 bg-primary-50'
										: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
										}`}
									onClick={() => setIsMobileMenuOpen(false)}
								>
									<span className="text-lg">{item.icon}</span>
									<span>{item.label}</span>
								</Link>
							))}
						</div>

						{/* Menu footer */}
						<div className="px-4 py-4 border-t border-gray-200 space-y-3">
							{isLoggedIn ? (
								<>
									<div className="flex items-center space-x-3 mb-4">
										<div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
											<FiUser className="text-primary-600" />
										</div>
										<div>
											<p className="text-sm font-medium text-gray-900">
												{user?.firstName} {user?.lastName}
											</p>
											<p className="text-xs text-gray-500">{user?.email}</p>
										</div>
									</div>
									<Link
										to="/profile"
										className="flex items-center space-x-3 px-4 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										<FiUser className="text-lg text-primary-600" />
										<span>Profile</span>
									</Link>
									<button
										className="flex items-center space-x-3 w-full px-4 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
										onClick={handleLogout}
									>
										<FiLogOut className="text-lg text-red-500" />
										<span>Sign out</span>
									</button>
								</>
							) : (
								<button
									onClick={() => setIsAuthPopupOpen(true)}
									className="group relative w-full flex items-center justify-center space-x-2 px-4 py-3 text-base font-medium text-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
								>
									<div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-300"></div>
									<div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0"></div>
									<span className="relative flex items-center space-x-2">
										<FaUser className="text-lg" />
										<span>Login</span>
									</span>
								</button>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Auth Popup */}
			<AuthPopup
				isOpen={isAuthPopupOpen}
				onClose={() => setIsAuthPopupOpen(false)}
				onAuthSuccess={handleAuthSuccess}
			/>
		</>
	);
};

export default Navbar;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage, UserRegistrationPage } from './pages';

const RoutesNav = () => {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<LoginPage />}
				/>
				<Route
					path='/registration'
					element={<UserRegistrationPage />}
				/>
			</Routes>
		</Router>
	);
};

export default RoutesNav;

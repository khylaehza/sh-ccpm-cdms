import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage, UserRegistrationPage, GeneralDepPage } from './pages';

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
				<Route
					path='/general'
					element={<GeneralDepPage />}
				/>
			</Routes>
		</Router>
	);
};

export default RoutesNav;

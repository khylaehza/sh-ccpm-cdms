import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	Outlet,
} from 'react-router-dom';
import { LoginPage, UserRegistrationPage, GeneralDepPage } from './pages';
import { useData } from './DataContext';
import { useState, useEffect } from 'react';

const PrivateRoute = () => {
	const { curUser, setCurUser } = useData();
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		const storedUser = localStorage.getItem('curUser');
		if (storedUser) {
			setCurUser(JSON.parse(storedUser));
		}
		setIsChecked(true);
	}, [setCurUser]);

	if (!isChecked) {
		return null;
	}

	return curUser ? <Outlet /> : <Navigate to='/' />;
};

const RoutesNav = () => {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<LoginPage />}
				/>

				<Route element={<PrivateRoute />}>
					<Route
						path='/registration'
						element={<UserRegistrationPage />}
					/>
					<Route
						path='/projects'
						element={<GeneralDepPage />}
					/>
				</Route>
			</Routes>
		</Router>
	);
};

export default RoutesNav;

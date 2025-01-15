import RoutesNav from './RoutesNav';
import './App.css';
import { DataProvider } from './DataContext';
function App() {
	return (
		<DataProvider>
			<RoutesNav />
		</DataProvider>
	);
}

export default App;

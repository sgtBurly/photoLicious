import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import LoginComponent from "./components/LoginComponent";
import Navbar from "./components/Navbar";
import RegisterComponent from "./components/RegisterComponent";
import { RouteAuthentication } from "./components/RouteAuthentication";
import UserPage from "./pages/UserPage";
import ViewAlbum from "./pages/ViewAlbum";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/gallery/:docId"
					element={
						<RouteAuthentication redirectTo="/">
							<Gallery />
						</RouteAuthentication>
					}
				/>
				<Route path="/album/:id" element={<ViewAlbum />} />
				<Route
					path="/user"
					element={
						<RouteAuthentication redirectTo="/">
							<UserPage />
						</RouteAuthentication>
					}
				/>
				<Route />
			</Routes>
		</div>
	);
}

export default App;

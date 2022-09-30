import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import JobMain from "./components/JobMain";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route exact path="/register" element={<Register />} />
				<Route exact path="/reset" element={<Reset />} />
				<Route exact path="/main" element={<JobMain />} />
			</Routes>
		</div>
	);
}

export default App;

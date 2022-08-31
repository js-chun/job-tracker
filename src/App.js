import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import Reset from "./Reset"
import JobMain from "./JobMain"

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
	)
}

export default App

import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase"
import { logOut } from "./authentication"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Button from "react-bootstrap/Button"

function JobMain() {
	const [user, loading, error] = useAuthState(auth)
	const navigate = useNavigate()

	useEffect(() => {
		if (loading) {
			//loading screen
			return
		}
		if (!user) navigate("/")
	}, [user, loading])

	return (
		<div>
			<Navbar bg="dark" expand="lg">
				<Container>
					<Navbar.Brand href="#home">simple-job-tracker</Navbar.Brand>
					<Button onClick={logOut}>
						<ion-icon name="log-out-outline"></ion-icon> Sign Out
					</Button>
				</Container>
			</Navbar>
		</div>
	)
}

export default JobMain

import React from "react"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import { logOut } from "./authentication"

function JobNav() {
	return (
		<Navbar bg="dark" expand="lg">
			<Container>
				<Navbar.Brand href="#home" className="text-primary">
					simple-job-tracker
				</Navbar.Brand>
				<Button onClick={logOut}>
					<ion-icon name="log-out-outline"></ion-icon> Sign Out
				</Button>
			</Container>
		</Navbar>
	)
}

export default JobNav

import React from "react"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"
import { logOut } from "../authentication"

function JobNav(props) {
	const { viewMode, setView } = props

	const handleActiveClick = () => {
		if (viewMode !== "active") {
			setView("active")
		}
	}

	const handleArchiveClick = () => {
		if (viewMode !== "archive") {
			setView("archive")
		}
	}

	return (
		<Navbar bg="dark" expand="lg">
			<Container>
				<Navbar.Brand href="#home" className="text-primary">
					simple-job-tracker
				</Navbar.Brand>
				<Stack direction="horizontal" gap={3}>
					<Button
						variant={viewMode === "active" ? "primary" : "outline-primary"}
						onClick={handleActiveClick}>
						Active Jobs
					</Button>
					<Button
						variant={viewMode === "archive" ? "primary" : "outline-primary"}
						onClick={handleArchiveClick}>
						Archived Jobs
					</Button>
				</Stack>
				<Button variant="danger" onClick={logOut}>
					<ion-icon name="log-out-outline"></ion-icon>&nbsp;Sign Out
				</Button>
			</Container>
		</Navbar>
	)
}

export default JobNav

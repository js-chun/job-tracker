import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase"
import { logOut } from "./authentication"
import { getJobs } from "./crud"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import JobForm from "./JobForm"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Button from "react-bootstrap/Button"

function JobMain() {
	const [userJobs, setUserJobs] = useState([])
	const [user, loading, error] = useAuthState(auth)
	const navigate = useNavigate()

	useEffect(() => {
		if (loading) {
			//loading screen
			return
		}
		if (user) {
			const getJobsData = async () => {
				setUserJobs(await getJobs())
			}
			getJobsData()
		}
		if (!user) navigate("/")
	}, [user, loading])

	return (
		<div>
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
			<Container>
				<JobForm />
				<Row></Row>
			</Container>
		</div>
	)
}

export default JobMain

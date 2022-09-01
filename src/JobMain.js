import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase"
import { getJobs } from "./crud"
import JobForm from "./JobForm"
import JobNav from "./JobNavbar"
import JobBoard from "./JobBoard"
import JobArchive from "./JobArchive"
import Container from "react-bootstrap/Container"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"

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

	const activeJobs = userJobs.filter((job) => job.archived === false)
	const archivedJobs = userJobs.filter((job) => job.archived === true)

	return (
		<div>
			<JobNav />
			<Container>
				<JobForm />
			</Container>
			<Tabs defaultActiveKey="home" className="mb-3">
				<Tab eventKey="home" title="Active Jobs">
					<JobBoard jobs={activeJobs} />
				</Tab>
				<Tab eventKey="archived" title="Archived Jobs">
					<JobArchive jobs={archivedJobs} />
				</Tab>
			</Tabs>
		</div>
	)
}

export default JobMain

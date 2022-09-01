import React, { useState } from "react"
import JobList from "./JobList"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"

function JobBoard(props) {
	const [mode, setMode] = useState("view")
	const { jobs } = props
	const categorizedJobs = {
		interested: jobs.filter((job) => job.status === "interested"),
		applied: jobs.filter((job) => job.status === "applied"),
		interview: jobs.filter((job) => job.status === "interview"),
		offer: jobs.filter((job) => job.status === "offer"),
	}

	const handleViewMode = () => {
		setMode("view")
	}

	const handleRemoveMode = () => {
		setMode("remove")
	}

	const handleMoveMode = () => {
		setMode("move")
	}

	return (
		<Container fluid>
			<Row>
				<ButtonGroup className="mt-3 mb-4 mx-auto" aria-label="Basic example">
					<Button
						variant={mode === "view" ? "primary" : "light"}
						onClick={handleViewMode}>
						View
					</Button>
					<Button
						variant={mode === "move" ? "primary" : "light"}
						onClick={handleMoveMode}>
						Quick Move Jobs
					</Button>
					<Button
						variant={mode === "remove" ? "primary" : "light"}
						onClick={handleRemoveMode}>
						Remove or Archive Jobs
					</Button>
				</ButtonGroup>
			</Row>
			<Row>
				<Col>
					<JobList
						status="interested"
						jobs={categorizedJobs["interested"]}
						mode={mode}
					/>
				</Col>
				<Col>
					<JobList
						status="applied"
						jobs={categorizedJobs["applied"]}
						mode={mode}
					/>
				</Col>
				<Col>
					<JobList
						status="interview"
						jobs={categorizedJobs["interview"]}
						mode={mode}
					/>
				</Col>
				<Col>
					<JobList status="offer" jobs={categorizedJobs["offer"]} mode={mode} />
				</Col>
			</Row>
		</Container>
	)
}

export default JobBoard
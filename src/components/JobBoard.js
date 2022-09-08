import React, { useState } from "react"
import JobList from "./JobList"
import JobDeclined from "./JobDeclined"
import JobSearchBar from "./JobSearchBar"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"

function JobBoard(props) {
	const { interested, applied, interview, offer, declined } = props
	const [btnMode, setBtnMode] = useState("edit")
	const [viewMode, setViewMode] = useState("all")
	const [isFiltering, setIsFiltering] = useState(false)
	const [interestJobs, setInterestJobs] = useState([])
	const [appliedJobs, setAppliedJobs] = useState([])
	const [interviewJobs, setInterviewJobs] = useState([])
	const [offerJobs, setOfferJobs] = useState([])

	const handleRemoveBtnMode = () => {
		setBtnMode("remove")
	}

	const handleEditBtnMode = () => {
		setBtnMode("edit")
	}

	const handleAllViewMode = () => {
		setViewMode("all")
	}

	const handleCompactViewMode = () => {
		setViewMode("compact")
	}

	const filterJobsByStatus = (results, keyword) => {
		return results.filter(
			(job) =>
				job.title.toLowerCase().includes(keyword.toLowerCase()) ||
				job.company.toLowerCase().includes(keyword.toLowerCase())
		)
	}

	const handleFilterChange = (searchTerm) => {
		if (searchTerm.trim() == "") {
			setIsFiltering(false)
		} else {
			setInterestJobs(filterJobsByStatus(interested, searchTerm))
			setAppliedJobs(filterJobsByStatus(applied, searchTerm))
			setInterviewJobs(filterJobsByStatus(interview, searchTerm))
			setOfferJobs(filterJobsByStatus(offer, searchTerm))
			setIsFiltering(true)
		}
	}

	return (
		<Container fluid>
			<Container className="d-flex justify-content-around align-items-center mb-3">
				<ion-icon name="eye"></ion-icon>
				<ButtonGroup className="mx-3" aria-label="Job board view options">
					<Button
						variant={viewMode === "all" ? "primary" : "light"}
						onClick={handleAllViewMode}>
						All Details
					</Button>
					<Button
						variant={viewMode === "compact" ? "primary" : "light"}
						onClick={handleCompactViewMode}>
						Compact
					</Button>
				</ButtonGroup>
				<ion-icon name="hammer"></ion-icon>
				<ButtonGroup className="mx-3" aria-label="Job board buttons">
					<Button
						variant={btnMode === "edit" ? "primary" : "light"}
						onClick={handleEditBtnMode}>
						Edit/Move Jobs
					</Button>
					<Button
						variant={btnMode === "remove" ? "primary" : "light"}
						onClick={handleRemoveBtnMode}>
						Remove or Archive Jobs
					</Button>
				</ButtonGroup>
				<JobDeclined jobs={declined} />
				<JobSearchBar filterChange={handleFilterChange} />
			</Container>
			<Row>
				<Col>
					<JobList
						status="interested"
						jobs={isFiltering ? interestJobs : interested}
						btnMode={btnMode}
						viewMode={viewMode}
					/>
				</Col>
				<Col>
					<JobList
						status="applied"
						jobs={isFiltering ? appliedJobs : applied}
						btnMode={btnMode}
						viewMode={viewMode}
					/>
				</Col>
				<Col>
					<JobList
						status="interview"
						jobs={isFiltering ? interviewJobs : interview}
						btnMode={btnMode}
						viewMode={viewMode}
					/>
				</Col>
				<Col>
					<JobList
						status="offer"
						jobs={isFiltering ? offerJobs : offer}
						btnMode={btnMode}
						viewMode={viewMode}
					/>
				</Col>
			</Row>
		</Container>
	)
}

export default JobBoard

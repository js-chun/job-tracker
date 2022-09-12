import React, { useState } from "react"
import JobSearchBar from "./JobSearchBar"
import JobArchiveRow from "./JobArchiveRow"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Table from "react-bootstrap/Table"

function JobArchive(props) {
	const { jobs } = props
	const [isFiltering, setIsFiltering] = useState(false)
	const [filteredJobs, setFilteredJobs] = useState([])

	const handleFilterChange = (searchTerm) => {
		if (searchTerm.trim() == "") {
			setIsFiltering(false)
		} else {
			setFilteredJobs(
				jobs.filter(
					(job) =>
						job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
						job.company.toLowerCase().includes(searchTerm.toLowerCase())
				)
			)
			setIsFiltering(true)
		}
	}
	return (
		<Container fluid>
			<Container fluid="md">
				<Row className="d-flex justify-content-center align-items-center mb-3">
					<JobSearchBar filterChange={handleFilterChange} />
				</Row>
			</Container>

			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>Added</th>
						<th>Archived</th>
						<th>Title</th>
						<th>Company</th>
						<th>Location</th>
						<th>Application Status</th>
						<th>Remote/Hybrid/Onsite</th>
						<th>URL</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{isFiltering
						? filteredJobs.map((fJob) => (
								<JobArchiveRow key={fJob.id} job={fJob} />
						  ))
						: jobs.map((job) => <JobArchiveRow key={job.id} job={job} />)}
				</tbody>
			</Table>
		</Container>
	)
}

export default JobArchive

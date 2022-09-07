import React from "react"
import JobArchiveRow from "./JobArchiveRow"
import Container from "react-bootstrap/Container"
import Table from "react-bootstrap/Table"

function JobArchive(props) {
	const { jobs } = props
	return (
		<Container fluid>
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
					{jobs.map((job) => (
						<JobArchiveRow job={job} />
					))}
				</tbody>
			</Table>
		</Container>
	)
}

export default JobArchive

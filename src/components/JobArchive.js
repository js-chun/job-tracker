import React from "react";
import JobSearchBar from "./JobSearchBar";
import JobArchiveRow from "./JobArchiveRow";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

function JobArchive(props) {
	const { jobs, handleFilterChange, searchTerm } = props;

	return (
		<Container fluid>
			<Container fluid="md">
				<Row className="d-flex justify-content-center align-items-center mb-3">
					<JobSearchBar filterChange={handleFilterChange} />
				</Row>
				<Row className="my-3">
					<small>
						<b>
							{searchTerm
								? `All archived jobs containing '${searchTerm}'`
								: "All archived jobs"}
						</b>
					</small>
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
					{jobs.map((job) => (
						<JobArchiveRow key={job.id} job={job} />
					))}
				</tbody>
			</Table>
		</Container>
	);
}

export default JobArchive;

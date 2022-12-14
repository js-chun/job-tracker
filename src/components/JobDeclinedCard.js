import React from "react";
import JobEditForm from "./JobEditForm";
import JobArchiveButton from "./JobButtons/JobArchiveButton";
import JobDeleteButton from "./JobButtons/JobDeleteButton";
import JobLinkButton from "./JobButtons/JobLinkButton";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

function JobDeclinedCard(props) {
	const { job } = props;
	return (
		<Card>
			<Card.Body>
				<Card.Title>
					<h6>{job.title}</h6>
				</Card.Title>
				<small>
					{job.company} - {job.location}
				</small>
				<Stack className="mt-1" direction="horizontal" gap={1}>
					<JobLinkButton src={job.url} />
					<JobEditForm job={job} noCaptions />
					<JobArchiveButton type="archive" id={job.id} noCaptions />
					<JobDeleteButton id={job.id} noCaptions />
				</Stack>
			</Card.Body>
		</Card>
	);
}

export default JobDeclinedCard;

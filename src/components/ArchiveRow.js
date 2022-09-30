import React from "react";
import JobEditForm from "./JobEditForm";
import JobArchiveButton from "./JobButtons/JobArchiveButton";
import JobDeleteButton from "./JobButtons/JobDeleteButton";
import JobLinkButton from "./JobButtons/JobLinkButton";
import Stack from "react-bootstrap/Stack";

function ArchiveRow(props) {
	const { job } = props;

	return (
		<tr>
			<td>{job.created.toDate().toString().substr(0, 15)}</td>
			<td>
				{job.archivedDate && job.archivedDate.toDate().toString().substr(0, 15)}
			</td>
			<td>{job.title}</td>
			<td>{job.company}</td>
			<td>{job.location.toUpperCase()}</td>
			<td>{job.status.toUpperCase()}</td>
			<td>{job.type.toUpperCase()}</td>
			<td>
				<JobLinkButton src={job.url} />
			</td>
			<td>
				<Stack direction="horizontal" gap={1}>
					<JobEditForm job={job} noCaptions />
					<JobArchiveButton type="unarchive" id={job.id} noCaptions />
					<JobDeleteButton id={job.id} noCaptions />
				</Stack>
			</td>
		</tr>
	);
}

export default ArchiveRow;

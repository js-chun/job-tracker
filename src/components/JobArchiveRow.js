import React from "react"
import JobArchiveButton from "./JobArchiveButton"
import JobDeleteButton from "./JobDeleteButton"
import JobLinkButton from "./JobLinkButton"
import JobEditForm from "./JobEditForm"
import JobNotes from "./JobNotes"
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"

function JobArchiveRow(props) {
	const { job } = props

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
				<Stack direction="horizontal" gap={1}>
					<JobLinkButton src={job.url} />
					<JobNotes job={job} noCaptions />
				</Stack>
			</td>
			<td>
				<Stack direction="horizontal" gap={1}>
					<JobEditForm job={job} noCaptions />
					<JobArchiveButton type="unarchive" id={job.id} noCaptions />
					<JobDeleteButton id={job.id} noCaptions />
				</Stack>
			</td>
		</tr>
	)
}

export default JobArchiveRow

import React from "react"
import JobLinkButton from "./JobLinkButton"
import Button from "react-bootstrap/Button"
import { updateJob } from "./crud"

function JobArchiveRow(props) {
	const { job } = props

	const handleUnarchive = async () => {
		await updateJob(job.id, { archived: true })
	}

	return (
		<tr>
			<td>{job.title}</td>
			<td>{job.company}</td>
			<td>{job.location}</td>
			<td>{job.status}</td>
			<td>{job.type.toUpperCase()}</td>
			<td>{job.notes}</td>
			<td>
				<JobLinkButton src={job.url} />
				<Button
					variant="success"
					size="sm"
					onClick={handleUnarchive}
					className="ms-2">
					<ion-icon name="arrow-undo-circle"></ion-icon>
				</Button>
			</td>
		</tr>
	)
}

export default JobArchiveRow

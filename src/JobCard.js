import React from "react"
import JobEditForm from "./JobEditForm"
import JobNotes from "./JobNotes"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Badge from "react-bootstrap/Badge"
import Stack from "react-bootstrap/Stack"
import { updateJob, deleteJob } from "./crud"

function JobCard(props) {
	const { job, mode, placement } = props

	const openLinkInTab = () => {
		window.open(job.url, "_blank").focus()
	}

	const handleDelete = async () => {
		await deleteJob(job.id)
	}

	const handleNextStage = async () => {
		let nextStage = "interested"
		if (job.status === "interested") {
			nextStage = "applied"
		} else if (job.status === "applied") {
			nextStage = "interview"
		} else if (job.status === "interview") {
			nextStage = "offer"
		}
		await updateJob(job.id, { status: nextStage })
	}

	const handleArchive = async () => {
		await updateJob(job.id, { archived: true })
	}

	const handleDeclined = async () => {
		await updateJob(job.id, { archived: true, status: "declined" })
	}

	return (
		<Card>
			<Card.Body>
				<Card.Title>
					{job.title}{" "}
					{job.type !== "unknown" && (
						<Badge bg="secondary">{job.type.toUpperCase()}</Badge>
					)}
				</Card.Title>
				<Card.Text>
					<Button variant="primary" size="sm" onClick={openLinkInTab}>
						<ion-icon name="link"></ion-icon>
					</Button>{" "}
					<small>{job.company}</small> - <small>{job.location}</small>
				</Card.Text>

				{mode === "view" && (
					<Stack direction="horizontal" gap={3} className="justify-content-end">
						<JobEditForm job={job} />
						<JobNotes notes={job.notes} placement={placement} />
					</Stack>
				)}

				{mode === "move" && (
					<Stack direction="horizontal" gap={3} className="justify-content-end">
						<Button
							variant="primary"
							size="sm"
							onClick={handleNextStage}
							disabled={job.status === "offer"}>
							<ion-icon name="arrow-forward-circle-outline"></ion-icon> move to
							next stage
						</Button>
						<Button variant="primary" size="sm">
							<ion-icon name="move-outline"></ion-icon> drag and drop
						</Button>
					</Stack>
				)}

				{mode === "remove" && (
					<Stack direction="horizontal" gap={3} className="justify-content-end">
						<Button variant="danger" size="sm" onClick={handleArchive}>
							<ion-icon name="archive"></ion-icon> archive/no longer interested
						</Button>
						<Button variant="danger" size="sm" onClick={handleDeclined}>
							<ion-icon name="close-circle"></ion-icon> declined
						</Button>
						<Button variant="danger" size="sm" onClick={handleDelete}>
							<ion-icon name="trash"></ion-icon> delete
						</Button>
					</Stack>
				)}
			</Card.Body>
		</Card>
	)
}

export default JobCard

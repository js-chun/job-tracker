import React from "react"
import JobEditForm from "./JobEditForm"
import JobNotes from "./JobNotes"
import JobLinkButton from "./JobLinkButton"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Badge from "react-bootstrap/Badge"
import Stack from "react-bootstrap/Stack"
import { useDrag } from "react-dnd"
import { updateJob, deleteJob } from "./crud"

function JobCard(props) {
	const { job, mode, placement } = props
	const [{ opacity }, drag, preview] = useDrag(() => ({
		type: job.status,
		item: { id: job.id },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.3 : 1,
		}),
	}))

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

	const createdDate = job.created.toDate().toString()

	return (
		<Card ref={preview} style={{ opacity }}>
			<Card.Body>
				<Card.Title>
					<h6>
						<JobLinkButton src={job.url} /> &nbsp;
						{job.title}{" "}
					</h6>
				</Card.Title>
				<Card.Text>
					<small>
						{job.type !== "unknown" && (
							<Badge bg="secondary">{job.type.toUpperCase()}</Badge>
						)}
					</small>
					<ul>
						<li>
							<small>Company: {job.company}</small>
						</li>
						<li>
							<small>Location: {job.location}</small>
						</li>
					</ul>
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
							variant="warning"
							size="sm"
							onClick={handleNextStage}
							disabled={job.status === "offer"}>
							<ion-icon name="arrow-forward-circle-outline"></ion-icon>
							&nbsp;next stage
						</Button>
						<div ref={drag}>
							<Button variant="warning" size="sm">
								<ion-icon name="move-outline"></ion-icon> &nbsp;drag and drop
							</Button>
						</div>
					</Stack>
				)}

				{mode === "remove" && (
					<Stack direction="horizontal" gap={3} className="justify-content-end">
						<Button variant="danger" size="sm" onClick={handleArchive}>
							<ion-icon name="archive"></ion-icon> &nbsp;archive
						</Button>
						<Button variant="danger" size="sm" onClick={handleDeclined}>
							<ion-icon name="close-circle"></ion-icon> &nbsp;declined
						</Button>
						<Button variant="danger" size="sm" onClick={handleDelete}>
							<ion-icon name="trash"></ion-icon> &nbsp;delete
						</Button>
					</Stack>
				)}
			</Card.Body>
			<Card.Footer>
				<small>
					Added <strong>{createdDate}</strong>
				</small>
			</Card.Footer>
		</Card>
	)
}

export default JobCard

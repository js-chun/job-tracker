import React from "react"
import JobEditForm from "./JobEditForm"
import JobArchiveButton from "./JobArchiveButton"
import JobDeleteButton from "./JobDeleteButton"
import JobLinkButton from "./JobLinkButton"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Badge from "react-bootstrap/Badge"
import Stack from "react-bootstrap/Stack"
import { useDrag } from "react-dnd"
import { updateJob } from "../crud"

function JobCard(props) {
	const { job, btnMode, viewMode } = props
	const [{ opacity }, drag, preview] = useDrag(() => ({
		type: job.status,
		item: { id: job.id },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.3 : 1,
		}),
	}))

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

	return (
		<Card ref={preview} style={{ opacity }}>
			<Card.Body>
				<Card.Title>
					<h6>
						<JobLinkButton src={job.url} /> &nbsp;
						{job.title.length <= 50
							? job.title
							: job.title.substr(0, 46) + "..."}
					</h6>
				</Card.Title>
				{viewMode === "all" && (
					<>
						{job.time !== "unknown" && (
							<Badge bg="secondary">{job.time.toUpperCase()} </Badge>
						)}{" "}
						{job.type !== "unknown" && (
							<Badge bg="secondary">{job.type.toUpperCase()}</Badge>
						)}{" "}
						{job.salary && <Badge bg="secondary">{job.salary}</Badge>}
						<ul>
							<li>
								<small>Company: {job.company} </small>
							</li>
							<li>
								<small>Location: {job.location}</small>
							</li>
							<li>
								<small>Notes: {job.notes || "None"}</small>
							</li>
						</ul>
					</>
				)}

				{viewMode === "compact" && (
					<div className="mb-1">
						<small>
							{job.company} / {job.location}
							{job.type !== "unknown" && ` (${job.type.toUpperCase()})`} /{" "}
							{job.time.toUpperCase()}
						</small>
					</div>
				)}

				{btnMode === "edit" && (
					<Stack direction="horizontal" gap={3} className="justify-content-end">
						<JobEditForm
							job={job}
							noCaptions={viewMode === "compact" ? true : false}
						/>
						<Button
							variant="warning"
							size="sm"
							onClick={handleNextStage}
							disabled={job.status === "offer"}>
							<ion-icon name="arrow-forward-circle-outline"></ion-icon>
							{viewMode === "all" && <small>&nbsp;next stage</small>}
						</Button>
						<div ref={drag}>
							<Button variant="warning" size="sm">
								<ion-icon name="move-outline"></ion-icon>
								{viewMode === "all" && <small>&nbsp;drag and drop</small>}
							</Button>
						</div>
					</Stack>
				)}

				{btnMode === "remove" && (
					<Stack direction="horizontal" gap={3} className="justify-content-end">
						<JobArchiveButton
							type="archive"
							id={job.id}
							noCaptions={viewMode === "compact" ? true : false}
						/>
						<JobArchiveButton
							type="declined"
							id={job.id}
							noCaptions={viewMode === "compact" ? true : false}
						/>
						<JobDeleteButton
							id={job.id}
							noCaptions={viewMode === "compact" ? true : false}
						/>
					</Stack>
				)}
			</Card.Body>
			<Card.Footer>
				<small>
					Added <strong>{job.created.toDate().toString().substr(0, 24)}</strong>
				</small>
			</Card.Footer>
		</Card>
	)
}

export default JobCard

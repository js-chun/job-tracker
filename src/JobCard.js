import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Badge from "react-bootstrap/Badge"
import Stack from "react-bootstrap/Stack"

function JobCard(props) {
	const { job, mode } = props

	const openLinkInTab = () => {
		window.open(job.url, "_blank").focus()
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
					<Button size="sm" onClick={openLinkInTab}>
						<ion-icon name="link"></ion-icon>
					</Button>{" "}
					<small>{job.company}</small> - <small>{job.location}</small>
				</Card.Text>

				{mode === "view" && (
					<Stack direction="horizontal" gap={3} className="justify-content-end">
						<Button variant="primary" size="sm">
							<ion-icon name="create-outline"></ion-icon> edit
						</Button>
						<Button variant="primary" size="sm">
							<ion-icon name="information-circle-outline"></ion-icon> notes
						</Button>
					</Stack>
				)}

				{mode === "move" && (
					<Stack direction="horizontal" gap={3} className="justify-content-end">
						<Button variant="primary" size="sm">
							<ion-icon name="arrow-forward-circle-outline"></ion-icon> move to
							next stage
						</Button>
						<Button variant="primary" size="sm">
							<ion-icon name="archive-outline"></ion-icon> drag and drop
						</Button>
					</Stack>
				)}

				{mode === "remove" && (
					<Stack direction="horizontal" gap={3} className="justify-content-end">
						<Button variant="primary" size="sm">
							<ion-icon name="archive-outline"></ion-icon> archive
						</Button>
						<Button variant="primary" size="sm">
							<ion-icon name="archive-outline"></ion-icon> declined
						</Button>
						<Button variant="primary" size="sm">
							<ion-icon name="information-circle-outline"></ion-icon> delete
						</Button>
					</Stack>
				)}
			</Card.Body>
		</Card>
	)
}

export default JobCard

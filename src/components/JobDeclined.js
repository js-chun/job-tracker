import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Offcanvas from "react-bootstrap/Offcanvas"
import JobDeclinedCard from "./JobDeclinedCard"
import { updateJob } from "../crud"
import { Timestamp } from "firebase/firestore"

function JobDeclined(props) {
	const { jobs } = props
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const handleArchiveAll = () => {
		jobs.forEach(async (job) => {
			await updateJob(job.id, { archived: true, archivedDate: Timestamp.now() })
		})
	}

	return (
		<>
			<ion-icon name="ban"></ion-icon>
			<Button className="mx-3" variant="outline-danger" onClick={handleShow}>
				Show Declined Jobs (Unarchived)
			</Button>

			<Offcanvas show={show} onHide={handleClose} placement="end">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Declined Jobs (Unarchived)</Offcanvas.Title>
					{jobs && (
						<Button variant="danger" size="sm" onClick={handleArchiveAll}>
							<ion-icon name="archive"></ion-icon> &nbsp;All
						</Button>
					)}
				</Offcanvas.Header>
				<Offcanvas.Body>
					{jobs ? (
						jobs.map((job) => <JobDeclinedCard key={job.id} job={job} />)
					) : (
						<h5>NONE</h5>
					)}
				</Offcanvas.Body>
			</Offcanvas>
		</>
	)
}

export default JobDeclined

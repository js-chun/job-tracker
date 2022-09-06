import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Offcanvas from "react-bootstrap/Offcanvas"
import JobDeclinedCard from "./JobDeclinedCard"

function JobDeclined(props) {
	const { jobs } = props
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	return (
		<>
			<Button
				className="mt-0 mb-3 ms-5"
				variant="outline-danger"
				onClick={handleShow}>
				Show Declined Jobs (Unarchived)
			</Button>

			<Offcanvas show={show} onHide={handleClose} placement="end">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Declined Jobs (Unarchived)</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					{jobs.map((job) => (
						<JobDeclinedCard job={job} />
					))}
				</Offcanvas.Body>
			</Offcanvas>
		</>
	)
}

export default JobDeclined

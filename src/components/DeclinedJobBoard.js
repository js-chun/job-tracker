import React, { useState } from "react";
import { updateJob } from "../utils/crud";
import { Timestamp } from "firebase/firestore";
import JobDeclinedCard from "./JobDeclinedCard";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

function DeclinedJobBoard(props) {
	const { jobs } = props;
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleArchiveAll = () => {
		jobs.forEach(async (job) => {
			await updateJob(job.id, {
				archived: true,
				archivedDate: Timestamp.now(),
			});
		});
	};

	return (
		<>
			<ion-icon name="ban"></ion-icon>
			<Button className="mx-2" variant="outline-danger" onClick={handleShow}>
				Show Declined&nbsp;
				<Badge pill bg="secondary">
					{jobs.length}
				</Badge>
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
					<p>Total: {jobs.length}</p>
					{jobs ? (
						jobs.map((job) => <JobDeclinedCard key={job.id} job={job} />)
					) : (
						<h5>NONE</h5>
					)}
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

export default DeclinedJobBoard;

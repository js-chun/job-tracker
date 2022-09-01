import React, { useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"

function JobForm() {
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	return (
		<>
			<Row>
				<Col className="d-flex">
					<Button onClick={handleShow} className="ms-auto my-3">
						<ion-icon name="add-circle-outline"></ion-icon> Add a Job Posting
					</Button>
				</Col>
			</Row>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add a Job Posting</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Row>
							<Form.Group className="mb-3">
								<Form.Label>Job Title</Form.Label>
								<Form.Control type="text" placeholder="Title" autoFocus />
							</Form.Group>
						</Row>
						<Row>
							<Form.Group className="mb-3">
								<Form.Label>Company Name</Form.Label>
								<Form.Control type="text" placeholder="Company" />
							</Form.Group>
						</Row>
						<Row>
							<Form.Group className="mb-3">
								<Form.Label>Location</Form.Label>
								<Form.Control type="text" placeholder="Location" />
							</Form.Group>
						</Row>
						<Row>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>Application Status</Form.Label>
									<Form.Select aria-label="Application Status">
										<option value="interested">Interested</option>
										<option value="applied">Applied</option>
										<option value="interview">Interview</option>
										<option value="offered">Offer</option>
										<option value="declined">Declined</option>
									</Form.Select>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>Remote / Hybrid / Onsite</Form.Label>
									<Form.Select aria-label="Application Status">
										<option value="unknown">I don't know</option>
										<option value="remote">Remote</option>
										<option value="hybrid">Hybrid</option>
										<option value="onsite">Onsite</option>
									</Form.Select>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Form.Group className="mb-3">
								<Form.Label>Description (Optional)</Form.Label>
								<Form.Control as="textarea" rows={2} />
							</Form.Group>
						</Row>
						<Row>
							<Form.Group className="mb-3">
								<Form.Label>Notes (Optional)</Form.Label>
								<Form.Control as="textarea" rows={2} />
							</Form.Group>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Create Job Posting
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default JobForm

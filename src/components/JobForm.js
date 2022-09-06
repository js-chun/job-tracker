import React, { useState } from "react"
import { useFormik } from "formik"
import { createJob } from "../crud"
import * as Yup from "yup"
import { Timestamp } from "firebase/firestore"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import { auth } from "../firebase"

function JobForm() {
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const formik = useFormik({
		initialValues: {
			title: "",
			url: "",
			company: "",
			location: "",
			status: "interested",
			type: "unknown",
			notes: "",
		},
		validationSchema: Yup.object({
			title: Yup.string()
				.required("Required")
				.max(50, "Must be 50 characters or less"),
			url: Yup.string().url("Invalid URL").required("Required"),
			company: Yup.string()
				.required("Required")
				.max(50, "Must be 50 characters or less"),
			location: Yup.string().optional(),
			status: Yup.string()
				.required("Required")
				.oneOf(
					["interested", "applied", "interview", "offered", "declined"],
					"Must be a valid application status"
				),
			type: Yup.string()
				.required("Required")
				.oneOf(
					["unknown", "remote", "hybrid", "onsite"],
					"Must be a valid job type"
				),
			notes: Yup.string().optional().max(200, "Must be 200 characters or less"),
		}),
		onSubmit: (values) => {
			createJob({
				...values,
				archived: false,
				created: Timestamp.now(),
				user: auth.currentUser.uid,
			})
			handleClose()
			formik.handleReset()
		},
	})

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
				<Form
					noValidate
					onSubmit={formik.handleSubmit}
					onReset={formik.handleReset}>
					<Modal.Body>
						<Row>
							<Form.Group className="mb-3">
								<Form.Label>Job Title</Form.Label>
								<Form.Control
									type="text"
									placeholder="Title"
									autoFocus
									isInvalid={formik.errors.title}
									{...formik.getFieldProps("title")}
								/>
								<Form.Control.Feedback type="invalid">
									{formik.errors.title}
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
						<Row>
							<Form.Group className="mb-3">
								<Form.Label>URL</Form.Label>
								<Form.Control
									type="text"
									placeholder="URL"
									isInvalid={formik.errors.url}
									{...formik.getFieldProps("url")}
								/>
								<Form.Control.Feedback type="invalid">
									{formik.errors.url}
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
						<Row>
							<Form.Group className="mb-3">
								<Form.Label>Company Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Company"
									isInvalid={formik.errors.company}
									{...formik.getFieldProps("company")}
								/>
								<Form.Control.Feedback type="invalid">
									{formik.errors.company}
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
						<Row>
							<Form.Group className="mb-3">
								<Form.Label>Location (Optional)</Form.Label>
								<Form.Control
									type="text"
									placeholder="Location"
									isInvalid={formik.errors.location}
									{...formik.getFieldProps("location")}
								/>
								<Form.Control.Feedback type="invalid">
									{formik.errors.location}
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
						<Row>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>Application Status</Form.Label>
									<Form.Select
										aria-label="Application Status"
										isInvalid={formik.errors.status}
										{...formik.getFieldProps("status")}>
										<option value="interested">Interested</option>
										<option value="applied">Applied</option>
										<option value="interview">Interview</option>
										<option value="offered">Offer</option>
										<option value="declined">Declined</option>
									</Form.Select>
									<Form.Control.Feedback type="invalid">
										{formik.errors.status}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>Remote / Hybrid / Onsite</Form.Label>
									<Form.Select
										aria-label="Application Status"
										isInvalid={formik.errors.type}
										{...formik.getFieldProps("type")}>
										<option value="unknown">I don't know</option>
										<option value="remote">Remote</option>
										<option value="hybrid">Hybrid</option>
										<option value="onsite">Onsite</option>
									</Form.Select>
									<Form.Control.Feedback type="invalid">
										{formik.errors.type}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Form.Group className="mb-3">
								<Form.Label>Notes (Optional)</Form.Label>
								<Form.Control
									as="textarea"
									rows={2}
									isInvalid={formik.errors.notes}
									{...formik.getFieldProps("notes")}
								/>
								<Form.Control.Feedback type="invalid">
									{formik.errors.notes}
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button type="submit" variant="primary">
							Create Job Posting
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	)
}

export default JobForm

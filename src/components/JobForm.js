import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { createJob } from "../utils/crud";
import { auth } from "../utils/firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

function JobForm() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const formik = useFormik({
		initialValues: {
			title: "",
			url: "",
			company: "",
			location: "",
			status: "interested",
			type: "unknown",
			time: "unknown",
			salary: "",
			notes: "",
		},
		validationSchema: Yup.object({
			title: Yup.string()
				.required("Required")
				.max(70, "Must be 70 characters or less"),
			url: Yup.string().url("Invalid URL").required("Required"),
			company: Yup.string()
				.required("Required")
				.max(70, "Must be 70 characters or less"),
			location: Yup.string().required("Required"),
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
					"Must be a valid selection"
				),
			time: Yup.string()
				.required()
				.oneOf(
					["unknown", "ft", "pt", "contract"],
					"Must be a valid selection"
				),
			salary: Yup.string().optional().max(30, "Must be 30 characters or less"),
			notes: Yup.string().optional().max(500, "Must be 500 characters or less"),
		}),
		onSubmit: (values) => {
			createJob({
				...values,
				archived: false,
				created: Timestamp.now(),
				user: auth.currentUser.uid,
			});
			handleClose();
			formik.handleReset();
		},
	});

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
								<Form.Label>Location</Form.Label>
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
									<Form.Label>FT / PT / Contract</Form.Label>
									<Form.Select
										aria-label="FT / PT /Contract"
										isInvalid={formik.errors.time}
										{...formik.getFieldProps("time")}>
										<option value="unknown">I don't know</option>
										<option value="ft">Full-Time</option>
										<option value="pt">Part-Time</option>
										<option value="contract">Contract</option>
									</Form.Select>
									<Form.Control.Feedback type="invalid">
										{formik.errors.time}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>Remote / Hybrid / Onsite</Form.Label>
									<Form.Select
										aria-label="Remote / Hybrid / Onsite"
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
									<Form.Label>Salary Expectations</Form.Label>
									<Form.Control
										type="text"
										placeholder="Salary Expectations"
										isInvalid={formik.errors.salary}
										{...formik.getFieldProps("salary")}
									/>
									<Form.Control.Feedback type="invalid">
										{formik.errors.salary}
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
	);
}

export default JobForm;

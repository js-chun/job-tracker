import React, { useState } from "react";
import { useFormik } from "formik";
import { updateJob } from "../utils/crud";
import * as Yup from "yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function JobEditForm(props) {
	const { job, noCaptions } = props;
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const formik = useFormik({
		initialValues: {
			title: job.title,
			url: job.url,
			company: job.company,
			location: job.location,
			status: job.status,
			type: job.type,
			time: job.time,
			salary: job.salary,
			notes: job.notes,
			archived: job.archived,
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
			archived: Yup.boolean(),
		}),
		onSubmit: (values) => {
			updateJob(job.id, values);
			handleClose();
			formik.handleReset();
		},
	});

	return (
		<>
			<Button variant="warning" size="sm" onClick={handleShow}>
				<ion-icon name="create-outline"></ion-icon>
				{noCaptions ? "" : <small>&nbsp;edit</small>}
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Job Posting</Modal.Title>
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
						<Row>
							<Form.Group className="mb-3">
								<Form.Label>Archived</Form.Label>
								<Form.Check
									type="switch"
									{...formik.getFieldProps("archived")}
								/>
							</Form.Group>
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button type="submit" variant="primary">
							Save Changes
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
}

export default JobEditForm;

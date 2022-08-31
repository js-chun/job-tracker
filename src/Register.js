import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { registerWithEmailAndPassword } from "./authentication"
import { useFormik } from "formik"
import * as Yup from "yup"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"

function Register() {
	const formik = useFormik({
		initialValues: {
			fName: "",
			lName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object({
			fName: Yup.string()
				.required("Required")
				.max(15, "Must be 15 characters or less"),
			lName: Yup.string()
				.required("Required")
				.max(20, "Must be 20 characters or less"),
			email: Yup.string().email("Invalid email address").required("Required"),
			password: Yup.string()
				.required("Password is required")
				.min(6, "Must be at least 6 characters"),
			confirmPassword: Yup.string()
				.required("Must re-type password")
				.oneOf([Yup.ref("password")], "Passwords must match"),
		}),
		onSubmit: (values) => {
			const fullName = values.fName.trim() + values.lName.trim()
			registerWithEmailAndPassword(fullName, values.email, values.password)
		},
	})
	const [user, loading, error] = useAuthState(auth)
	const navigate = useNavigate()

	useEffect(() => {
		if (loading) {
			//loading screen
			return
		}
		if (user) navigate("/main")
	}, [user, loading])

	return (
		<Container>
			<Row
				className="justify-content-center align-content-center"
				style={{ height: "100vh" }}>
				<Col xl={6} lg={8} mg={10} sm={12}>
					<h1 className="mb-3">Get started</h1>
					<Link to="/">
						<ion-icon name="caret-back-circle-outline"></ion-icon> Back to login
						page
					</Link>
					<Form noValidate onSubmit={formik.handleSubmit}>
						<Row className="mt-4">
							<Col>
								<FloatingLabel
									controlId="floatingFirstName"
									label="First name"
									className="mb-3">
									<Form.Control
										type="text"
										{...formik.getFieldProps("fName")}
										placeholder="First name"
										isInvalid={formik.touched.fName && formik.errors.fName}
									/>
									<Form.Control.Feedback type="invalid">
										{formik.errors.fName}
									</Form.Control.Feedback>
								</FloatingLabel>
							</Col>
							<Form.Group as={Col}>
								<FloatingLabel
									controlId="floatingLastName"
									label="Last name"
									className="mb-3">
									<Form.Control
										type="text"
										{...formik.getFieldProps("lName")}
										placeholder="Last name"
										isInvalid={formik.touched.lName && formik.errors.lName}
									/>
									<Form.Control.Feedback type="invalid">
										{formik.errors.lName}
									</Form.Control.Feedback>
								</FloatingLabel>
							</Form.Group>
						</Row>
						<Row>
							<Col>
								<FloatingLabel
									controlId="floatingUser"
									label="Email address"
									className="mb-3">
									<Form.Control
										type="email"
										{...formik.getFieldProps("email")}
										placeholder="name@example.com"
										isInvalid={formik.touched.email && formik.errors.email}
									/>
									<Form.Control.Feedback type="invalid">
										{formik.errors.email}
									</Form.Control.Feedback>
								</FloatingLabel>
							</Col>
						</Row>
						<Row>
							<Col>
								<FloatingLabel
									controlId="floatingPassword"
									label="Password"
									className="mb-3">
									<Form.Control
										type="password"
										{...formik.getFieldProps("password")}
										placeholder="Password"
										isInvalid={
											formik.touched.password && formik.errors.password
										}
									/>
									<Form.Control.Feedback type="invalid">
										{formik.errors.password}
									</Form.Control.Feedback>
								</FloatingLabel>
							</Col>
						</Row>
						<Row>
							<Col>
								<FloatingLabel
									controlId="floatingConfirmPassword"
									label="Confirm password"
									className="mb-3">
									<Form.Control
										type="password"
										{...formik.getFieldProps("confirmPassword")}
										placeholder="Confirm password"
										isInvalid={
											formik.touched.confirmPassword &&
											formik.errors.confirmPassword
										}
									/>
									<Form.Control.Feedback type="invalid">
										{formik.errors.confirmPassword}
									</Form.Control.Feedback>
								</FloatingLabel>
							</Col>
						</Row>
						<Row>
							<Button variant="primary" size="lg" type="submit">
								Create Account
							</Button>
						</Row>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default Register

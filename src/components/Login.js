import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import {
	logInWithEmailAndPassword,
	logInWithGoogle,
} from "../utils/authentication";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

function Login() {
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().required("Username is required"),
			password: Yup.string().required("Password is required"),
		}),
		onSubmit: (values) => {
			logInWithEmailAndPassword(values.email, values.password);
		},
	});
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (loading) {
			//loading screen
			return;
		}
		if (user) navigate("/main");
	}, [user, loading]);

	return (
		<Container>
			<Row
				className="justify-content-center align-content-center"
				style={{ height: "100vh" }}>
				<Col xl={4} lg={6} md={8} sm={10}>
					<div className="d-flex align-content-center">
						<Image
							src={process.env.PUBLIC_URL + "/job-logo.png"}
							className="mx-auto"
							thumbnail={true}
							width={300}
						/>
					</div>
					<div className="d-grid gap-2 my-3 d-flex flex-column align-items-center">
						<span>Login using social networks:</span>
						<button onClick={logInWithGoogle} className="btn btn-sns">
							<ion-icon name="logo-google"></ion-icon>
						</button>
					</div>
					<hr />
					<Form
						noValidate
						className="text-start"
						onSubmit={formik.handleSubmit}>
						<FloatingLabel
							controlId="floatingUser"
							label="Email address"
							className="mb-3">
							<Form.Control
								type="email"
								placeholder="Email address"
								{...formik.getFieldProps("email")}
								isInvalid={formik.touched.email && formik.errors.email}
							/>
							<Form.Control.Feedback type="invalid">
								{formik.errors.email}
							</Form.Control.Feedback>
						</FloatingLabel>

						<FloatingLabel
							controlId="floatingPassword"
							label="Password"
							className="mb-3">
							<Form.Control
								type="password"
								placeholder="Password"
								{...formik.getFieldProps("password")}
								isInvalid={formik.touched.password && formik.errors.password}
							/>
							<Form.Control.Feedback type="invalid">
								{formik.errors.password}
							</Form.Control.Feedback>
						</FloatingLabel>

						<div className="mb-3">
							<Link to="/reset">Forgot your password?</Link>
						</div>
						<div className="d-grid gap-2">
							<Button variant="primary" type="submit" size="lg">
								Sign In
							</Button>
						</div>
					</Form>
					<hr />
					<Link to="/register">
						<div className="d-grid gap-2">
							<Button variant="secondary" size="lg">
								Sign Up
							</Button>
						</div>
					</Link>
				</Col>
			</Row>
		</Container>
	);
}

export default Login;

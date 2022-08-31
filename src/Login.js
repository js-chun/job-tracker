import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useInput } from "./hooks/useInput"
import { auth } from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { logInWithEmailAndPassword, logInWithGoogle } from "./authentication"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function Login() {
	const [emailInput, handleEmailChange, resetEmail] = useInput("")
	const [passwordInput, handlePasswordChange, resetPassword] = useInput("")
	const [user, loading, error] = useAuthState(auth)
	const navigate = useNavigate()

	useEffect(() => {
		if (loading) {
			//loading screen
			return
		}
		if (user) navigate("/main")
	}, [user, loading])

	const handleSubmit = (evt) => {
		evt.preventDefault()
		logInWithEmailAndPassword(emailInput, passwordInput)
		resetEmail()
		resetPassword()
	}

	return (
		<Container>
			<Row
				className="justify-content-center align-content-center"
				style={{ height: "100vh" }}>
				<Col xl={4} lg={6} md={8} sm={10}>
					<div className="d-flex align-content-center">
						<Image
							src={process.env.PUBLIC_URL + "/job-logo.png"}
							className="mx-auto img-thumbnail"
							width={300}
						/>
					</div>
					<div className="d-grid gap-2 my-3 d-flex">
						<span>Login using social networks:</span>
						<button onClick={logInWithGoogle}>
							<ion-icon name="logo-google"></ion-icon>
						</button>
					</div>
					<hr />
					<Form className="text-start" onSubmit={handleSubmit}>
						<FloatingLabel
							controlId="floatingUser"
							label="Email address"
							className="mb-3">
							<Form.Control
								type="email"
								placeholder="Email address"
								value={emailInput}
								onChange={handleEmailChange}
							/>
						</FloatingLabel>

						<FloatingLabel
							controlId="floatingPassword"
							label="Password"
							className="mb-3">
							<Form.Control
								type="password"
								placeholder="Password"
								value={passwordInput}
								onChange={handlePasswordChange}
							/>
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
	)
}

export default Login

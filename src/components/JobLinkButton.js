import React from "react"
import Button from "react-bootstrap/Button"

function JobLinkButton(props) {
	const { src } = props

	const openLinkInTab = () => {
		window.open(src, "_blank").focus()
	}

	return (
		<>
			<Button variant="primary" size="sm" onClick={openLinkInTab}>
				<ion-icon name="link"></ion-icon>
			</Button>
		</>
	)
}

export default JobLinkButton

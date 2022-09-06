import React from "react"
import Button from "react-bootstrap/Button"
import { deleteJob } from "../crud"

function JobDeleteButton(props) {
	const { id, noCaptions } = props

	const handleDelete = async () => {
		await deleteJob(id)
	}

	return (
		<Button size="sm" variant="danger" onClick={handleDelete}>
			<ion-icon name={"trash"}></ion-icon>{" "}
			{!noCaptions && <small>&nbsp;delete</small>}
		</Button>
	)
}

export default JobDeleteButton

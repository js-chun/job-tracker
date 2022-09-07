import React from "react"
import Button from "react-bootstrap/Button"
import { updateJob } from "../crud"
import { Timestamp } from "firebase/firestore"

const configs = {
	variant: {
		declined: "danger",
		archive: "danger",
		unarchive: "success",
	},
	icon: {
		declined: "close-circle",
		archive: "archive",
		unarchive: "arrow-undo-circle",
	},
}

function JobArchiveButton(props) {
	const { id, type, noCaptions } = props

	const handleClick = async () => {
		if (type === "unarchive") {
			await updateJob(id, { archived: false, archivedDate: "" })
		} else if (type === "archive") {
			await updateJob(id, { archived: true, archivedDate: Timestamp.now() })
		} else if (type === "declined") {
			await updateJob(id, {
				status: "declined",
			})
		}
	}

	return (
		<Button size="sm" variant={configs.variant[type]} onClick={handleClick}>
			<ion-icon name={configs.icon[type]}></ion-icon>{" "}
			{!noCaptions && (
				<small>
					&nbsp;
					{type}
				</small>
			)}
		</Button>
	)
}

export default JobArchiveButton

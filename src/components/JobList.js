import React from "react"
import JobCard from "./JobCard"
import Badge from "react-bootstrap/Badge"
import Stack from "react-bootstrap/Stack"
import { useDrop } from "react-dnd"
import { updateJob } from "../crud"

const allowedTypes = {
	interested: ["applied", "interview", "offer"],
	applied: ["interested", "interview", "offer"],
	interview: ["interested", "applied", "offer"],
	offer: ["interested", "applied", "interview"],
}

const alignment = {
	interested: "right",
	applied: "right",
	interview: "left",
	offer: "left",
}

function JobList(props) {
	const { jobs, mode, status } = props

	const [{ isOver, canDrop }, drop] = useDrop({
		accept: allowedTypes[status],
		drop: (item) => {
			updateJob(item.id, { status })
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	})

	const isActive = isOver && canDrop

	let border = "none"
	if (isActive) {
		border = "4px dashed #9ce3d6"
	} else if (canDrop) {
		border = "3px dashed #777"
	}

	return (
		<div ref={drop} style={{ border }} className="list">
			<h4 className="text-center">
				{status.toUpperCase()} <Badge bg="secondary">{jobs.length}</Badge>
			</h4>
			<div>
				<Stack gap={3}>
					{jobs &&
						jobs.map((job) => (
							<JobCard
								key={job.id}
								job={job}
								mode={mode}
								placement={alignment[props.status]}
							/>
						))}
				</Stack>
			</div>
		</div>
	)
}

export default JobList

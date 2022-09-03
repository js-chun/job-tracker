import React from "react"
import JobCard from "./JobCard"
import Stack from "react-bootstrap/Stack"

const alignment = {
	interested: "right",
	applied: "right",
	interview: "left",
	offer: "left",
}

function JobList(props) {
	const { jobs, mode } = props

	return (
		<div>
			<h4 className="text-center">{props.status.toUpperCase()}</h4>
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

import React from "react"
import JobCard from "./JobCard"
import Stack from "react-bootstrap/Stack"

function JobList(props) {
	const { jobs, mode } = props
	return (
		<div>
			<h3 className="text-center">{props.status.toUpperCase()}</h3>
			<div>
				<Stack gap={3}>
					{jobs && jobs.map((job) => <JobCard job={job} mode={mode} />)}
				</Stack>
			</div>
		</div>
	)
}

export default JobList

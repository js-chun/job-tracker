import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

function JobSearchBar(props) {
	const { filterChange } = props
	const [searchInput, setSearchInput] = useState("")

	const handleSearchChange = (evt) => {
		setSearchInput(evt.target.value)
	}

	const handleSubmit = (evt) => {
		evt.preventDefault()
		filterChange(searchInput)
	}

	return (
		<>
			<ion-icon name="filter"></ion-icon>

			<Form className="d-flex mx-3 w-25" onSubmit={handleSubmit}>
				<Form.Control
					type="text"
					placeholder="Search keywords..."
					onChange={handleSearchChange}
				/>
				<Button type="submit" variant="secondary">
					<ion-icon name="search"></ion-icon>
				</Button>
			</Form>
		</>
	)
}

export default JobSearchBar

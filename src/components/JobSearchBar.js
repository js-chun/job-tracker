import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"

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

	const handleReset = () => {
		filterChange("")
		setSearchInput("")
	}

	return (
		<>
			<ion-icon name="filter"></ion-icon>

			<Form className="d-flex mx-3 w-25" onSubmit={handleSubmit}>
				<Stack direction="horizontal" gap={1}>
					<Form.Control
						type="text"
						placeholder="Search keywords..."
						value={searchInput}
						onChange={handleSearchChange}
					/>
					<Button type="submit" variant="secondary">
						<ion-icon name="search" size="small"></ion-icon>
					</Button>
					<Button variant="secondary" onClick={handleReset}>
						<ion-icon name="backspace" size="small"></ion-icon>
					</Button>
				</Stack>
			</Form>
		</>
	)
}

export default JobSearchBar

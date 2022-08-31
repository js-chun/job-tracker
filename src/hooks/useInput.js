import { useState } from "react"

export const useInput = (initialValue) => {
	const [input, setInput] = useState(initialValue)

	const handleInputChange = (evt) => {
		setInput(evt.target.value)
	}

	const resetInput = () => {
		setInput("")
	}

	return [input, handleInputChange, resetInput]
}

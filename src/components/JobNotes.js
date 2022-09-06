import Button from "react-bootstrap/Button"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

//Might add TOAST instead

function JobNotes(props) {
	const { notes, placement, noCaptions } = props

	return (
		<OverlayTrigger
			placement={placement ? "top" : "top"}
			overlay={<Tooltip id="button-tooltip-2">{notes || "No notes"}</Tooltip>}>
			{({ ref, ...triggerHandler }) => (
				<Button
					ref={ref}
					variant="info"
					size="sm"
					{...triggerHandler}
					className="d-inline-flex align-items-center">
					<ion-icon name="chatbox-ellipses"></ion-icon>
					{noCaptions ? "" : <small>&nbsp;hover for notes</small>}
				</Button>
			)}
		</OverlayTrigger>
	)
}

export default JobNotes

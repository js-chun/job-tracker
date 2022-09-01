import Button from "react-bootstrap/Button"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

function JobNotes(props) {
	const { notes, placement } = props
	return (
		<OverlayTrigger
			placement={placement ? placement : "top"}
			overlay={<Tooltip id="button-tooltip-2">{notes || "N/A"}</Tooltip>}>
			{({ ref, ...triggerHandler }) => (
				<Button
					ref={ref}
					variant="primary"
					size="sm"
					{...triggerHandler}
					className="d-inline-flex align-items-center">
					<ion-icon name="information-circle-outline"></ion-icon> &nbsp;hover to
					see notes
				</Button>
			)}
		</OverlayTrigger>
	)
}

export default JobNotes

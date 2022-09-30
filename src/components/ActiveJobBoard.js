import React, { useState } from "react";
import JobStatusList from "./JobStatusList";
import JobDeclined from "./DeclinedJobBoard";
import JobSearchBar from "./JobSearchBar";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function JobBoard(props) {
	const { handleFilterChange, searchTerm } = props;
	const { interested, applied, interview, offer, declined } = props;
	const [btnMode, setBtnMode] = useState("edit");
	const [viewMode, setViewMode] = useState("all");

	const handleRemoveBtnMode = () => {
		setBtnMode("remove");
	};

	const handleEditBtnMode = () => {
		setBtnMode("edit");
	};

	const handleAllViewMode = () => {
		setViewMode("all");
	};

	const handleCompactViewMode = () => {
		setViewMode("compact");
	};

	return (
		<Container fluid>
			<Container className="mb-3">
				<Row fluid="md" className="justify-content-md-center gy-3">
					<Col
						className="d-flex align-items-center justify-content-sm-center justify-content-end"
						xs={12}
						sm={6}
						md={4}
						lg={3}
						xxl={2}>
						<ion-icon name="eye"></ion-icon>
						<ButtonGroup className="mx-2" aria-label="Job board view options">
							<Button
								variant={viewMode === "all" ? "primary" : "light"}
								onClick={handleAllViewMode}>
								Details
							</Button>
							<Button
								variant={viewMode === "compact" ? "primary" : "light"}
								onClick={handleCompactViewMode}>
								Compact
							</Button>
						</ButtonGroup>
					</Col>
					<Col
						className="d-flex align-items-center justify-content-sm-center justify-content-end"
						xs={12}
						sm={6}
						md={4}
						lg={3}>
						<ion-icon name="hammer"></ion-icon>
						<ButtonGroup className="mx-2" aria-label="Job board buttons">
							<Button
								variant={btnMode === "edit" ? "primary" : "light"}
								onClick={handleEditBtnMode}>
								Edit/Move
							</Button>
							<Button
								variant={btnMode === "remove" ? "primary" : "light"}
								onClick={handleRemoveBtnMode}>
								Remove/Archive
							</Button>
						</ButtonGroup>
					</Col>
					<Col
						className="d-flex align-items-center justify-content-sm-center justify-content-end"
						xs={12}
						sm={5}
						md={4}
						lg={3}
						xxl={2}>
						<JobDeclined jobs={declined} />
					</Col>
					<Col xs={12} sm={7} md={11} lg={8} xxl={5}>
						<JobSearchBar filterChange={handleFilterChange} />
					</Col>
				</Row>
				<Row className="mt-3">
					<small>
						<b>
							{searchTerm
								? `All active jobs containing '${searchTerm}'`
								: "All active jobs"}
						</b>
					</small>
				</Row>
			</Container>
			<Row>
				<Col>
					<JobStatusList
						status="interested"
						jobs={interested}
						btnMode={btnMode}
						viewMode={viewMode}
					/>
				</Col>
				<Col>
					<JobStatusList
						status="applied"
						jobs={applied}
						btnMode={btnMode}
						viewMode={viewMode}
					/>
				</Col>
				<Col>
					<JobStatusList
						status="interview"
						jobs={interview}
						btnMode={btnMode}
						viewMode={viewMode}
					/>
				</Col>
				<Col>
					<JobStatusList
						status="offer"
						jobs={offer}
						btnMode={btnMode}
						viewMode={viewMode}
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default JobBoard;

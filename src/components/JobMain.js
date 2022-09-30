import React, { useEffect, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import ActiveJobBoard from "./ActiveJobBoard";
import ArchiveJobBoard from "./ArchiveJobBoard";
import JobForm from "./JobForm";
import JobNav from "./JobNavbar";
import Container from "react-bootstrap/Container";

function JobMain() {
	const [viewMode, setViewMode] = useState("active");
	const [userJobs, setUserJobs] = useState([]);
	const [activeSearchWord, setActiveSearchWord] = useState("");
	const [archiveSearchWord, setArchiveSearchWord] = useState("");
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (loading) {
			//loading screen
			return;
		}
		if (user) {
			const q = query(
				collection(db, "jobs"),
				where("user", "==", auth.currentUser.uid)
			);
			onSnapshot(q, (querySnapshot) => {
				setUserJobs(
					querySnapshot.docs.map((doc) => ({
						...doc.data(),
						id: doc.id,
					}))
				);
			});
		}
		if (!user) navigate("/");
	}, [user, loading]);

	const filterJobsByStatus = (results, status, keyword = "") => {
		return results.filter(
			(job) =>
				((status !== "archived" &&
					job.status === status &&
					job.archived === false) ||
					(status === "archived" && job.archived === true)) &&
				(job.title.toLowerCase().includes(keyword.toLowerCase()) ||
					job.company.toLowerCase().includes(keyword.toLowerCase()))
		);
	};

	const jobCategories = {
		archived: [],
		interested: [],
		applied: [],
		interview: [],
		offer: [],
		declined: [],
	};

	Object.keys(jobCategories).forEach((jobType) => {
		jobCategories[jobType] = filterJobsByStatus(
			userJobs,
			jobType,
			jobType === "archived" ? archiveSearchWord : activeSearchWord
		);
	});

	const handleActiveFilterChange = (searchTerm) => {
		if (searchTerm.trim() === "") {
			searchTerm = "";
		}
		setActiveSearchWord(searchTerm);
	};

	const handleArchiveFilterChange = (searchTerm) => {
		if (searchTerm.trim() === "") {
			searchTerm = "";
		}
		setArchiveSearchWord(searchTerm);
	};

	const setView = (mode) => {
		setViewMode(mode);
	};

	return (
		<div>
			<JobNav setView={setView} viewMode={viewMode} />
			<Container>
				<JobForm />
			</Container>
			{viewMode === "active" && (
				<DndProvider backend={HTML5Backend}>
					<ActiveJobBoard
						searchTerm={activeSearchWord}
						handleFilterChange={handleActiveFilterChange}
						interested={jobCategories.interested}
						applied={jobCategories.applied}
						interview={jobCategories.interview}
						offer={jobCategories.offer}
						declined={jobCategories.declined}
					/>
				</DndProvider>
			)}
			{viewMode === "archive" && (
				<ArchiveJobBoard
					searchTerm={archiveSearchWord}
					jobs={jobCategories.archived}
					handleFilterChange={handleArchiveFilterChange}
				/>
			)}
		</div>
	);
}

export default JobMain;

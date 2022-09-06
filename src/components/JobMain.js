import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase"
import JobForm from "./JobForm"
import JobNav from "./JobNavbar"
import JobBoard from "./JobBoard"
import JobArchive from "./JobArchive"
import Container from "react-bootstrap/Container"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

function JobMain() {
	const [viewMode, setViewMode] = useState("active")
	const [userJobs, setUserJobs] = useState([])
	const [user, loading, error] = useAuthState(auth)
	const navigate = useNavigate()

	useEffect(() => {
		if (loading) {
			//loading screen
			return
		}
		if (user) {
			const q = query(
				collection(db, "jobs"),
				where("user", "==", auth.currentUser.uid)
			)
			onSnapshot(q, (querySnapshot) => {
				setUserJobs(
					querySnapshot.docs.map((doc) => ({
						...doc.data(),
						id: doc.id,
					}))
				)
			})
		}
		if (!user) navigate("/")
	}, [user, loading])

	const activeJobs = userJobs.filter((job) => job.archived === false)
	const archivedJobs = userJobs.filter((job) => job.archived === true)

	const setView = (mode) => {
		setViewMode(mode)
	}

	return (
		<div>
			<JobNav setView={setView} viewMode={viewMode} />
			<Container>
				<JobForm />
			</Container>
			{viewMode === "active" && (
				<DndProvider backend={HTML5Backend}>
					<JobBoard jobs={activeJobs} />
				</DndProvider>
			)}
			{viewMode === "archive" && <JobArchive jobs={archivedJobs} />}
		</div>
	)
}

export default JobMain

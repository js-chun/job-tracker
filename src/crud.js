import { auth } from "./firebase"
import {
	collection,
	query,
	where,
	addDoc,
	Timestamp,
	getDocs,
} from "firebase/firestore"
import { db } from "./firebase"

export const createJob = async (data) => {
	try {
		await addDoc(collection(db, "jobs"), {
			...data,
			archived: false,
			created: Timestamp.now(),
			user: auth.currentUser.uid,
		})
	} catch (err) {
		alert(err)
	}
}

export const getJobs = async () => {
	// get all jobs related to user
	try {
		const result = []
		const q = query(
			collection(db, "jobs"),
			where("user", "==", auth.currentUser.uid)
		)
		const querySnapshot = await getDocs(q)
		querySnapshot.forEach((doc) => {
			result.push(doc.data())
		})
		return result
	} catch (err) {
		alert(err)
	}
}

export const updateJob = async () => {
	// update an existing job under user
}

export const deleteJob = async () => {
	// delete an existing job under user
}

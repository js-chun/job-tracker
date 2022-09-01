import { auth } from "./firebase"
import { doc, collection, addDoc, deleteDoc } from "firebase/firestore"
import { db } from "./firebase"

export const createJob = async (data) => {
	try {
		await addDoc(collection(db, "jobs"), data)
	} catch (err) {
		alert(err)
	}
}

export const updateJob = async (jobId, updateData) => {
	// update an existing job under user
}

export const deleteJob = async (jobId) => {
	try {
		await deleteDoc(doc(db, "jobs", jobId))
	} catch (err) {
		alert(err)
	}
}

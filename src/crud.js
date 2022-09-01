import {
	doc,
	collection,
	addDoc,
	updateDoc,
	deleteDoc,
} from "firebase/firestore"
import { db } from "./firebase"

export const createJob = async (data) => {
	try {
		await addDoc(collection(db, "jobs"), data)
	} catch (err) {
		alert(err)
	}
}

export const updateJob = async (jobId, updateData) => {
	let data = {}
	if ("user" in updateData) {
		for (let updateKey in updateData) {
			if (updateKey !== "user") {
				data[updateKey] = updateData[updateKey]
			}
		}
	}
	const updateDocRef = doc(db, "jobs", jobId)
	await updateDoc(updateDocRef, updateData)
}

export const deleteJob = async (jobId) => {
	try {
		await deleteDoc(doc(db, "jobs", jobId))
	} catch (err) {
		alert(err)
	}
}

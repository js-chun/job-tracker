# job-tracker

Simple job tracker web app meant to track applied jobs and interested jobs. Built using React, React Bootstrap, Firebase. Other packages: Formik, Yup and Sass.

Covers: 
* Firebase Authentication to sign in and log in locally or to sign in using Google
* Firebase Firestore to manage data in real time and perform CRUD operations. Firestore updated with security rules so that data can only be updated by the appropriate user
* Formik and Yup used for form validation before submission.
* Custom SCSS file to override Bootstrap CSS variables.
* React DnD to drag and drop jobs into different status containers and send Update requests based on the drop.

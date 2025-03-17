// firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

let app;
try {
  // Check if Firebase is already initialized
  if (!admin.apps.length) {
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: "smartedu-collegemanagement"
    });
    console.log('Firebase Admin initialized successfully');
  } else {
    app = admin.app();
    console.log('Using existing Firebase Admin instance');
  }
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
  throw error;
}

module.exports = admin;

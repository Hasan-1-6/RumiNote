/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {onSchedule} = require("firebase-functions/v2/scheduler")
const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()

exports.deleteOldData = onSchedule("every 24 hours", async () =>{
    const now = admin.firestore.Timestamp.now();

    const twentyFourHoursAgo = new Date(now.toDate().getTime() - 24*60*60*1000);

    const snapshot = await db.collection("diary").where('timestamp', '<', admin.firestore.Timestamp.fromDate(twentyFourHoursAgo)).get();

    if(!snapshot.empty)
    {
        const batch = db.batch()
        snapshot.forEach((doc) =>{
            batch.delete(doc.ref);
        });
        await batch.commit();
        console.log(`Deleted ${snapshot.size} succesfully`)
    }


})

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

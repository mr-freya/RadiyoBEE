const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const adminToken = ["admin token here"];

exports.sendLikeNotification = functions.firestore.document('notifications/{docid}').onWrite((change, context) => {
    const payload = {
        notification: {
            title: 'Someone Just Liked Your Post!',
        }
    }

    const data = change.after.data();

    if (data.type == "like") {
        admin.messaging().sendToDevice(data.to, payload)    
        .then(function(response) {
            console.log("Successfully sent message:", response);
        })
        .catch(function(error) {
            console.log("Error sending message:", error);
        });
    }
})

exports.sendCommentNotification = functions.firestore.document('notifications/{docid}').onWrite((change, context) => {
    const payload = {
        notification: {
            title: 'Someone Just Commented on Your Post!',
        }
    }

    const data = change.after.data();

    if (data.type == "comment") {
        admin.messaging().sendToDevice(data.to, payload)    
        .then(function(response) {
            console.log("Successfully sent message:", response);
        })
        .catch(function(error) {
            console.log("Error sending message:", error);
        });
    }
})

exports.sendReportNotification = functions.firestore.document('reportLog/{docid}').onWrite((change, context) => {
    const payload = {
        notification: {
            title: 'Someone Just Reported a Post!',
        }
    }

    const data = change.after.data();

    admin.messaging().sendToDevice(adminToken, payload)    
    .then(function(response) {
        console.log("Successfully sent message:", response);
    })
    .catch(function(error) {
        console.log("Error sending message:", error);
    });
})
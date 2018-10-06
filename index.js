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

exports.checkForBadWords = functions.firestore.document('jod/{docId}').onCreate((change, context) => {
    const payload = {
        notification: {
            title: 'A post has been flagged',
        }
    }

    const data = change.after.data;
    var text = data.text;
    var whitespaces = /\s*(;|$)\s*/;
    var textArray = text.split(whitespaces).toLowerCase();
    
    textArray.forEach(function(element) {
        //separate function to check substring against ProfanityArray
        if (profanityPresent(element)){ //only checks if it's a substring of an element in ProfanityArray
            //sendReportNotification
            admin.messaging().sendToDevice(adminToken, payload);
        }
    });
})

function profanityPresent(element){

    const profString = "ass bitch face";

    if (profString.includes(element)) {
        return true;
    }
    else {
        return false;
    }
}
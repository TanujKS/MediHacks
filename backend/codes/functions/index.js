const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const db = admin.firestore();

exports.addCode = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const { name, email, phone } = req.query;

        if (!name || !email || !phone) {
            return res.status(400).send('Missing name, email, or phone number');
        }

        try {
            // Check if the user with the provided email already exists
            const userRef = db.collection('users').doc(email);
            const doc = await userRef.get();

            if (doc.exists) {
                return res.status(409).send(doc.data().code);
            }

            // Get the available codes document
            const codesDoc = await db.collection('users').doc('available_codes').get();
            if (!codesDoc.exists) {
                return res.status(500).send('No available codes found');
            }

            const codes = codesDoc.data().codes;
            if (codes.length === 0) {
                return res.status(500).send('No more available codes');
            }

            // Get a code from the array and remove it
            const code = codes.pop();

            // Update the available codes document
            await db.collection('users').doc('available_codes').update({ codes });

            // Add the new user to the users collection
            await userRef.set({
                name: name,
                phone: phone,
                code: code
            });

            // Return the assigned code
            return res.status(200).send(code);
        } catch (error) {
            console.error('Error adding user:', error);
            return res.status(500).send('Internal Server Error');
        }
    });
});

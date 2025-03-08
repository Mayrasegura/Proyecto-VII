require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');


const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());




app.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name
        });

        await db.collection('users').doc(userRecord.uid).set({
            name,
            email
        });

        res.status(201).json({ message: 'Usuario registrado', userId: userRecord.uid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.post('/login', async (req, res) => {
    const { email } = req.body;
    try {
        const userSnapshot = await db.collection('users').where('email', '==', email).get();
        if (userSnapshot.empty) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/appointments', async (req, res) => {
    const { userId, date, time, service } = req.body;
    try {
        const newAppointment = await db.collection('appointments').add({
            userId,
            date,
            time,
            service
        });
        res.status(201).json({ message: 'Cita creada', appointmentId: newAppointment.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/appointments/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const snapshot = await db.collection('appointments').where('userId', '==', userId).get();
        const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.delete('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.collection('appointments').doc(id).delete();
        res.status(200).json({ message: 'Cita eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

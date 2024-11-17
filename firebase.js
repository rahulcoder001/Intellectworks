const express = require('express');
const cors = require('cors');
const { z } = require('zod'); // Import Zod for validation
const { 
  User, 
  Notes, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} = require('./config');

const app = express();
app.use(express.json());
app.use(cors());

// Define Zod schemas

//userschema
const userSchema = z.object({
  email: z.string().email(), // Email is required and must be valid
  name: z.string().min(1, 'Name is required'), // Name is required
  age: z.number().optional() // Age is optional
});

//notesschema
const noteSchema = z.object({
  userId: z.string().min(1, 'User ID is required'), // User ID is required
  title: z.string().min(1, 'Title is required'), // Title is required
  content: z.string().min(1, 'Content is required') // Content is required
});

// User Management APIs

// Create User API
app.post('/createuser', async (req, res) => {
  try {
    const validatedData = userSchema.parse(req.body); // Validate input data
    const docRef = await addDoc(User, validatedData); // Add document to Firestore
    res.send({ msg: 'User created successfully', userId: docRef.id }); // Return the document ID
  } catch (error) {
    console.error('Error adding user:', error);
    const errorMessage = error.errors ? error.errors[0].message : 'Failed to add user';
    res.status(400).send({ error: errorMessage });
  }
});


// Update User API
app.put('/updateuser', async (req, res) => {
  try {
    const { email, updateData } = req.body;

    if (!email || !updateData) {
      return res.status(400).send({ error: 'Email and updateData are required' });
    }

    userSchema.pick({ email: true }).parse({ email }); // Validate email only
    const userQuery = query(User, where('email', '==', email));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      return res.status(404).send({ error: 'User not found' });
    }

    userSnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, updateData);
    });

    res.send({ msg: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    const errorMessage = error.errors ? error.errors[0].message : 'Failed to update user';
    res.status(500).send({ error: errorMessage });
  }
});


// Delete User API
app.delete('/deleteuser', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ error: 'Email is required' });
    }

    userSchema.pick({ email: true }).parse({ email }); // Validate email only
    const userQuery = query(User, where('email', '==', email));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      return res.status(404).send({ error: 'User not found' });
    }

    userSnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    res.send({ msg: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    const errorMessage = error.errors ? error.errors[0].message : 'Failed to delete user';
    res.status(500).send({ error: errorMessage });
  }
});


// Notes Management APIs

// Save Note API
app.post('/savenote', async (req, res) => {
  try {
    const validatedData = noteSchema.parse(req.body); // Validate input data
    const timestamp = new Date().toISOString();
    const noteData = { ...validatedData, timestamp };

    await addDoc(Notes, noteData);
    res.send({ msg: 'Note saved successfully', note: noteData });
  } catch (error) {
    console.error('Error saving note:', error);
    const errorMessage = error.errors ? error.errors[0].message : 'Failed to save note';
    res.status(400).send({ error: errorMessage });
  }
});

// Get Notes API
app.get('/getnotes', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).send({ error: 'User ID is required' });
    }

    noteSchema.pick({ userId: true }).parse({ userId }); // Validate userId only
    const notesQuery = query(Notes, where('userId', '==', userId));
    const notesSnapshot = await getDocs(notesQuery);

    const notes = [];
    notesSnapshot.forEach((doc) => {
      notes.push({ id: doc.id, ...doc.data() });
    });

    res.send({ notes });
  } catch (error) {
    console.error('Error retrieving notes:', error);
    const errorMessage = error.errors ? error.errors[0].message : 'Failed to retrieve notes';
    res.status(500).send({ error: errorMessage });
  }
});


// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});


// Thank you so much to give me a chance,
// If you dont like it and want to reject me please give your feedback which is very important to me

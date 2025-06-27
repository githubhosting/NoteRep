import firebase from 'firebase/compat/app'
import { firebaseConfig } from '../firebaseconfig.js'
import { getDatabase, ref, set } from 'firebase/database'

// Initialize Firebase if not already done
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const db = getDatabase()

// Predefined chat rooms
const chatRooms = [
  { id: 'general-auth', name: 'General (Authenticated)', type: 'authenticated', description: 'General chat for authenticated users' },
  { id: 'general-anon', name: 'General (Anonymous)', type: 'anonymous', description: 'General chat for everyone' },
]

// Function to initialize chat rooms in the database
async function initChatRooms() {
  if (!firebaseConfig.projectId) {
    console.error('Firebase configuration is incomplete. Missing projectId. Ensure environment variables are set correctly.');
    console.error('Please run this script within the Next.js environment or manually set the Firebase configuration.');
    return;
  }

  try {
    for (const room of chatRooms) {
      const roomRef = ref(db, `chatRooms/${room.id}`)
      await set(roomRef, {
        name: room.name,
        type: room.type,
        description: room.description,
        createdAt: Date.now()
      })
      console.log(`Initialized room: ${room.name}`)
    }
    console.log('All chat rooms initialized successfully.')
  } catch (error) {
    console.error('Error initializing chat rooms:', error)
  }
}

// Run the initialization
initChatRooms()

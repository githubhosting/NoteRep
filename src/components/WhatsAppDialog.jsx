import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { firebaseConfig } from '@/firebaseconfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function WhatsAppDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const incrementDialogCount = async () => {
      try {
        const countRef = doc(db, 'metrics', 'whatsappDialog');
        const countDoc = await getDoc(countRef);
        
        if (!countDoc.exists()) {
          // Initialize counter if it doesn't exist
          await setDoc(countRef, { count: 1 });
        } else {
          // Increment existing counter
          await setDoc(countRef, { count: increment(1) }, { merge: true });
        }
      } catch (error) {
        console.error('Error updating dialog count:', error);
      }
    };

    // Show dialog after 2 seconds
    const timer = setTimeout(() => {
      setOpen(true);
      incrementDialogCount();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp number
    window.open('https://wa.me/+919876543210?text=Hi,%20I%20am%20interested%20in%20maintaining%20NoteRep', '_blank');
    handleClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      PaperProps={{
        style: {
          borderRadius: '16px',
          padding: '16px',
          maxWidth: '400px'
        }
      }}
    >
      <DialogTitle sx={{ 
        textAlign: 'center',
        color: '#1a73e8',
        fontWeight: 'bold'
      }}>
        🎓 Help Maintain NoteRep!
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          As I'll be graduating soon, I'm looking for passionate students who would like to continue maintaining and improving NoteRep for future batches.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          If you're interested in taking this project forward, let's connect on WhatsApp!
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
        <Button
          variant="contained"
          startIcon={<WhatsAppIcon />}
          onClick={handleWhatsAppClick}
          sx={{
            background: '#25D366',
            '&:hover': {
              background: '#128C7E',
            },
            width: '80%',
            borderRadius: '20px',
            textTransform: 'none'
          }}
        >
          Contact on WhatsApp
        </Button>
        <Button 
          onClick={handleClose}
          sx={{ 
            color: 'text.secondary',
            textTransform: 'none'
          }}
        >
          Maybe later
        </Button>
      </DialogActions>
    </Dialog>
  );
}
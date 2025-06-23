import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { firebaseConfig } from '@/firebaseconfig';
import { getOrCreateUserId } from '@/utils/user';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function WhatsAppDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const trackDialogShow = async () => {
      try {
        const deviceId = getOrCreateUserId();
        const lastShownKey = `whatsapp_dialog_last_shown_${deviceId}`;
        const lastShown = localStorage.getItem(lastShownKey);
        const now = new Date();
        
        // Check if we should show the dialog (once per 24 hours)
        if (lastShown) {
          const lastShownDate = new Date(lastShown);
          const hoursSinceLastShow = (now - lastShownDate) / (1000 * 60 * 60);
          if (hoursSinceLastShow < 24) {
            return;
          }
        }

        // Update metrics with both count and last timestamp in one operation
        const metricsRef = doc(db, 'metrics', deviceId);
        await setDoc(metricsRef, {
          deviceId,
          whatsappDialog: {
            count: increment(1),
            lastShown: now.toISOString()
          },
          updatedAt: now.toISOString()
        }, { merge: true });

        // Update local storage
        localStorage.setItem(lastShownKey, now.toISOString());
        
        // Show the dialog
        setOpen(true);
      } catch (error) {
        console.error('Error tracking dialog:', error);
      }
    };

    // Show dialog after 2 seconds if conditions are met
    const timer = setTimeout(trackDialogShow, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp number
    window.open('https://wa.me/+919945332995?text=Hi,%20I%20am%20interested%20in%20maintaining%20NoteRep', '_blank');
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

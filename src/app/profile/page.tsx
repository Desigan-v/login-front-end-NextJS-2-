'use client';

import { Container, Typography, Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter();
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch the user profile on component mount
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching profile:', error);
        router.push('/login');
      }
    };

    fetchUserProfile();
  }, [router]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    router.push('/login'); // Redirect to login page
  };

  // Open the reset password dialog
  const handleResetPassword = () => {
    setResetDialogOpen(true);
  };

  // Submit the reset password form
  const submitResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setResetError('You need to log in to reset your password.');
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:3000/api/resetPassword',
        { username, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert('Password reset successfully!');
        setResetDialogOpen(false);
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error(error);
      setResetError('Password reset failed. Try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="h6">Username: {username}</Typography>
        <Typography variant="h6">Email: {email}</Typography>
        <Button variant="contained" color="primary" onClick={handleLogout} style={{ marginTop: 16 }}>
          Logout
        </Button>
        <Button variant="contained" color="secondary" onClick={handleResetPassword} style={{ marginTop: 16 }}>
          Reset Password
        </Button>
      </Box>

      {/* Reset Password Dialog */}
      <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Confirm New Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {resetError && (
            <Typography color="error" variant="body2" style={{ marginTop: 8 }}>
              {resetError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={submitResetPassword} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;

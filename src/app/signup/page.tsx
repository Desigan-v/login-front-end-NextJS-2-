'use client';
import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:3000/api/signup', {
        username,
        password,
        email,
      });
      alert(response.data.message);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Signup
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField 
          label="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          variant="outlined" 
          fullWidth 
        />
        <TextField 
          label="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          variant="outlined" 
          fullWidth 
        />
        <TextField 
          label="Password" 
          type="" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          variant="outlined" 
          fullWidth 
        />
        <TextField 
          label="Confirm Password" 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          variant="outlined" 
          fullWidth 
        />
        {error && <Typography variant="body2" color="error">{error}</Typography>}
        <Button 
          onClick={handleSignup} 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;

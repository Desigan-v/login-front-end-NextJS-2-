'use client';
import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

interface ErrorResponse {
  error: string;
}

const Signup = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    try {
      const response = await axios.post<{ message: string }>('http://localhost:3000/api/signup', {
        username,
        password,
        email,
      });
      alert(response.data.message);
    } catch (error: any) {
      // Handling axios error, assuming the error has response data of type ErrorResponse
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred.');
      }
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
          type="password" 
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

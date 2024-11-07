"use client";

import axios from 'axios';
import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

interface LoginResponse {
  token: string;
  username: string;
  email: string;
}

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<LoginResponse>('http://localhost:3000/api/login', {
        username,
        password,
      });

      const { token, username: user, email } = response.data;

      if (!token || !user) {
        throw new Error("Missing token or username in response data");
      }

      // Store token in local storage
      localStorage.setItem('token', token);

      // Notify success
      alert(`Successfully logged in! Hello, ${user}`);
      console.log('Login successful:', response.data);

      // Redirect to profile page
      router.push('/profile');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          Log In
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%', marginTop: 16 }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 16 }}>
            Log In
          </Button>
          {error && (
            <Typography color="error" variant="body2" style={{ marginTop: 8 }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;

'use client';

import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Our Application
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => router.push('/login')} 
        style={{ margin: '10px' }}
      >
        Login
      </Button>
      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={() => router.push('/signup')} 
        style={{ margin: '10px' }}
      >
        Sign Up
      </Button>
    </Container>
  );
};

export default HomePage;

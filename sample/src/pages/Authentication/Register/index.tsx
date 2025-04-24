/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Link, Stack, TextField, Typography, CircularProgress } from "@mui/material";
import { register, checkRegistrationStatus } from '@/redux/features/auth/actions.auth.ts';
import { AppDispatch } from '@/redux/app/store.ts';
import { clearMessage, resetAuth } from '../../../redux/features/auth/slice.auth';

export const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { 
    status, 
    success, 
    error, 
    message, 
    streamingUrl, 
    registrationComplete,
    redirectToLogin 
  } = useSelector((state: any) => state.auth);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [registrationOngoing, setRegistrationOngoing] = useState(false);

  // Clear all states when component mounts
  useEffect(() => {
    dispatch(resetAuth());
        dispatch(clearMessage());
  }, [dispatch]);

  // Poll registration status when streaming URL is available
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (registrationOngoing) {
      if (streamingUrl && status === 'streaming') {
        intervalId = setInterval(() => {
          void dispatch(checkRegistrationStatus(streamingUrl));
        }, 2000);
      }
  
      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }
    
    
  }, [streamingUrl, status, dispatch, registrationOngoing]);

  // Navigate only after success and showing success message
  useEffect(() => {
    if (registrationComplete) {
      setRegistrationOngoing(false);
      if (success && redirectToLogin) {
        const timeoutId = setTimeout(() => {
          navigate('/session/login');
        }, 2000);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [registrationComplete, success, redirectToLogin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setRegistrationOngoing(false);
    
    try {
      await dispatch(register(formData));
      setRegistrationOngoing(true);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Stack 
      component="form"
      onSubmit={handleSubmit}
      direction="column"
      spacing={3}
      sx={{ maxWidth: 400, margin: '0 auto', p: 2 }}
    >
      <Typography variant="h4" align="center">Register</Typography>

      {status === 'loading' && (
        <CircularProgress sx={{ alignSelf: 'center' }} />
      )}

      {(success || error) && (
        <Typography 
          color={success ? "success.main" : "error"} 
          align="center"
          sx={{ fontWeight: 'medium' }}
        >
          {message}
          {success && redirectToLogin && (
            <span style={{ display: 'block', marginTop: '8px' }}>
              Redirecting to login...
            </span>
          )}
        </Typography>
      )}

      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          required
          label="First Name"
          value={formData.firstname}
          onChange={(e) => setFormData({...formData, firstname: e.target.value})}
        />
        <TextField
          fullWidth
          required
          label="Last Name"
          value={formData.lastname}
          onChange={(e) => setFormData({...formData, lastname: e.target.value})}
        />
      </Stack>

      <TextField
        fullWidth
        required
        label="Username"
        value={formData.username}
        onChange={(e) => setFormData({...formData, username: e.target.value})}
      />

      <TextField
        fullWidth
        required
        type="email"
        label="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />

      <TextField
        fullWidth
        required
        type="password"
        label="Password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
      />

      <TextField
        fullWidth
        required
        type="password"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={status === 'loading' || status === 'streaming'}
      >
        {status === 'loading' ? 'Registering...' : 
         status === 'streaming' ? 'Registration in progress...' : 
         'Register'}
      </Button>

      <Stack direction="row" justifyContent="center" spacing={1}>
        <Typography>Already registered?</Typography>
        <Link href="/session/login" underline="hover">Login</Link>
      </Stack>
    </Stack>
  );
};

export default Register;
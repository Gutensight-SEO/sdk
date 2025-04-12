import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Link, Stack, TextField, Typography, CircularProgress } from "@mui/material";
import { login } from '@/redux/features/auth/actions.auth.ts';
import { resetAuth } from '@/redux/features/auth/slice.auth.ts';
import { AppDispatch } from '@/redux/app/store.ts';

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, success, error, message, isAuthenticated } = useSelector((state: any) => state.auth);

  const [formData, setFormData] = useState({
    detail: '',
    password: ''
  });

  // Clear states on mount
  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    
    try {
      await dispatch(login(formData));
    } catch (error) {
      console.error('Login failed:', error);
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
      <Typography variant="h4" align="center">Login</Typography>

      {status === 'loading' && (
        <CircularProgress sx={{ alignSelf: 'center' }} />
      )}

      {error && (
        <Typography color="error" align="center">{message}</Typography>
      )}

      <TextField
        fullWidth
        required
        label="Email or Username"
        value={formData.detail}
        onChange={(e) => setFormData({...formData, detail: e.target.value})}
      />

      <TextField
        fullWidth
        required
        type="password"
        label="Password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Logging in...' : 'Login'}
      </Button>

      <Stack direction="row" justifyContent="center" spacing={1}>
        <Typography>Don't have an account?</Typography>
        <Link href="/session/register" underline="hover">Register</Link>
      </Stack>
    </Stack>
  );
};

export default Login;
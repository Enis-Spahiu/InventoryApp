
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// eslint-disable-next-line
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette:{
    login:{
      main: "#9093ea",
      contrastText:"#FFFFFF"
    }
  }
});

export default function Register() {


    const navigate = useNavigate()
    // eslint-disable-next-line
  const [confirmReg, setConfirmReg]=useState('');
  const [errs, setErrs]= useState([]);
  const [user, setUser]= useState({
      name:"",
      lastname:"",
      email:"",
      password:"",
      confirmPassword:""
  })


  const handleChange = (e)=>{
    setUser({
        ...user,
        [e.target.name]: e.target.value
    })
}

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post("http://localhost:8000/api/register",
    user, {withCredentials: true})
    .then(res=>{
        console.log(res.data);
        navigate('/login')

        setErrs({});
    })
    .catch((err)=>{
        console.log(err);
        setErrs(err.response.data.error.errors)
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 12,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#9093ea' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={(e)=> handleChange(e)}
                  id="name"
                  label="First Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                {
                    errs.name ?
                        <Typography color="red">{errs.name.message}</Typography>
                        :null
                }
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={(e)=> handleChange(e)}
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lastname"
                  autoFocus
                />
                {
                    errs.lastname ?
                        <Typography color="red">{errs.lastname.message}</Typography>
                        :null
                }
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={(e)=> handleChange(e)}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                {
                    errs.email ?
                        <Typography color="red">{errs.email.message}</Typography>
                        :null
                }
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={user.password}
                  onChange={(e)=> handleChange(e)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {
                    errs.password ?
                        <Typography color="red">{errs.password.message}</Typography>
                        :null
                }
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={(e)=> handleChange(e)}
                  name="cpassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  autoComplete="confirm-password"
                />
                <Button
                  type="submit"
                  color="login"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign up
                </Button>
                <Grid container>
                  <Grid item xs>
                  </Grid>
                  <Grid item>
                    <Link component={RouterLink} to='/login' variant="body2">
                      {"Already have an account? Sign in"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://assets-global.website-files.com/612f4c781c90a5752d371287/62714a56692878381d6fe894_Hero_Image-p-1600.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import AuthLayout from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"

const RegisterPage = () => {

  const formData = {
    email: 'lucasgmedina96@gmail.com',
    password: '123456',
    displayName: 'Lucas Medina'
  }

  const formValidations = {
    email: [(value) => value.includes('@'), 'The email must contain @'],
    password: [(value) => value.length >= 6, 'The password must contain at least 6 characters'],
    displayName: [(value) => value.length >= 2, 'The name is mandatory'],
  }

  const {
    onInputChange,
    formState,   email,        password,        displayName, 
    isFormValid, isEmailValid, isPasswordValid, isDisplayNameValid,
  } = useForm( formData, formValidations )

  const onSubmit = (event) => {
    event.preventDefault()
    console.log(formState)
  }

  return (
    <AuthLayout title="Register">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Full name'
              type="text"
              placeholder="Your Name"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!isDisplayNameValid}
              helperText={isDisplayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Email'
              type="email"
              placeholder="Set an email"
              fullWidth 
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Password'
              type="password"
              placeholder="Set a password"
              fullWidth 
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} justifyContent='end'>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" fullWidth>
                Create Account
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr: 1}}>Do you have already an account?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Sign in
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage

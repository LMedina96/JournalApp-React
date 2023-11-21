import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import AuthLayout from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks"

const RegisterPage = () => {

  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const {status, errorMessage} = useSelector(state => state.auth)
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const formData = {
    email: '',
    password: '',
    displayName: ''
  }

  const formValidations = {
    displayName: [(value) => value.length >= 2, 'The name is mandatory'],
    password: [(value) => value.length >= 6, 'The password must contain at least 6 characters'],
    email: [(value) => value.includes('@'), 'The email must contain @'],
  }

  const {
    onInputChange,
    formState,   email,        password,        displayName, 
    isFormValid, emailValid, passwordValid, displayNameValid,
  } = useForm( formData, formValidations )

  const onSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true)

    if( !isFormValid ) return

    dispatch( startCreatingUserWithEmailPassword( formState ) )
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
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
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
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
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
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} justifyContent='end'>

            <Grid 
              item xs={12} 
              sm={6}
              display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button 
                disabled={isCheckingAuthentication}
                type="submit" 
                variant="contained" 
                fullWidth>
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

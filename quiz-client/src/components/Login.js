import { Button, TextField, Box,Card, CardContent, Typography } from '@mui/material'
import {React, useEffect} from 'react'
import Center from './Center'
import useForm from '../hooks/useForm'
import { createAPIEndpoint, ENDPOINTS } from '../api/Index'
import useStateContext from '../hooks/useStateContext'
import { useNavigate } from 'react-router-dom'
import { FirstPage } from '@mui/icons-material'

const getFreshModelObject= () => ({
    name:'',
    email: ''
})

const Login = () => {

  const { context, setContext, resetContext} = useStateContext();
  const navigate = useNavigate();

  const {
      values,
      setValues,
      errors,
      setErrors,
      handleInputChange
  } = useForm(getFreshModelObject);

  useEffect(() => {
    resetContext()
  }, [])

  const login = e =>{
    e.preventDefault();
    if(validate())
      createAPIEndpoint(ENDPOINTS.participant)
      .post(values)
      .then(res => {
        setContext({participantId:res.data.participantId})
        navigate('/quiz');
      })
      .catch(err => console.log(err));
  }

  const validate = () => {
        let temp = {}
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid."
        temp.name = values.name !== "" ? "" : "This field is required."
        setErrors(temp)
        return Object.values(temp).every(x => x === "")
  }

  return (
    <Center>
    <Card sx={{width:400}}>
      <CardContent sx={{textAlign:'center'}}>
    <Typography variant="h3" sx={{my:3}}>Quiz App</Typography>
    <Box sx={{
      '& .MuiTextField-root':{
        m:1,
        width:'90%'
      }
    }}>
    <form noValidate autoComplete='on' onSubmit={login}>
        <TextField 
          label="Email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
          variant="outlined" 
          {...(errors.email && {error:true, helperText:errors.email})} />
        <TextField 
          label="Name"
          name="name"
          value={values.name}
          onChange={handleInputChange}
          variant="outlined" 
          {...(errors.name && {error:true, helperText:errors.name})} />
          <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{width:'90%'}}>Start</Button>
    </form>
    </Box>
    </CardContent>
    </Card>
    </Center>
  )
}

export default Login

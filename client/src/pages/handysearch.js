//Imports
import React, { useEffect, useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Api from '../utils/API'
import { Redirect } from 'react-router-dom'
import GoogleMaps from '../components/Location/index'
import { AuthContext } from '../utils/auth-context'
import SearchBar from '../components/Searchbar'
//Styling
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  links: {
    '&:hover': {
      color: 'black'
    },
    color: 'black',
    textDecoration: 'none'
  }
}))

//SignUp component
export default function SignUp () {
  const classes = useStyles()
  const auth = useContext(AuthContext)

  //Redirect hook
  const [redirect, setRedirect] = useState('')

 

 

  // //location hook
  // const [location, setLocation] = useState('')

  // //Handle input change for location
  // const handleInputChangeLocation = event => {
  //   setLocation(event.target.innerText)
  //   console.log(location)
  // }

  const [servicelist, setService] = useState([])

  useEffect(() => {
    // For demonstration purposes, we mock an API call.
    Api.getService().then(res => {
      setService(res.data)
      console.log(res.data)
      console.log('service list:')
    })
  }, [])
//const service = [];
  const [service, setServiceN] = React.useState([]);

  const onServiceChange = event => {
      setServiceN(event);
  }


  //const [location, setLocation] = useState('')
  var location = '';

  //Handle input change for location
  const handleInputChangeLocation = event => {
    console.log(event);
    //console.log(event.target.value)
    //setLocation(event)
    location = event;
   
    console.log(location)
  
  }

  //Saving person in database
  const handleSubmit = event => {
    event.preventDefault()
    console.log('clicked')
    console.log(location)
  
    // const locationa = 'Nepean'
    

    Api.getHandymans({location: location},service).then(res => {
        console.log(res.data)
        if(res.data.length !== 0) {
          console.log('handyman found');
           auth.login(res.data.handymanId, res.data.token);
        } else {
          console.log('no handyman found');
        }
        //setRedirect("/home");
      })
      .catch(error => {
        console.log(error)
      })
  }

  //If redirect is true redirect, or else show signup page
  if (redirect) {
    return <Redirect to={{ pathname: redirect }} />
  } else {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Find a Handyman
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <p>Choose the servics you can provide:</p>
                <SearchBar items={servicelist} onChange={onServiceChange} />
              </Grid>
              <Grid item xs={12}>
                <GoogleMaps
                  items={location}
                  onChange={handleInputChangeLocation}
                />
              </Grid>

              {/* <Grid item xs={12}>
               <p>Choose the services you can provide:</p> 
                     {servicesOptions} 
               </Grid>    */}
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={handleSubmit}
            >
              Search
            </Button>
           
          </form>
        </div>
        <Box mt={8}>{/* <Copyright /> */}</Box>
      </Container>
    )
  }
}











//   //Saving person in database
//   const handleSubmit = event => {
//     event.preventDefault()
//     console.log('clicked')
//     console.log(name + ' ' + email + ' ' + phoneNumber)
//     console.log(service)
//     Api.saveHandyman({
//       name,
//       email,
//       password,
//       phoneNumber,
//       location,
//       service
//     })
//       .then(res => {
//         console.log('handyman created')
//         console.log(res.data.token)
//         auth.login(res.data.handymanId, res.data.token)
//         setRedirect('/login')
//       })
//       .catch(error => {
//         console.log(error)
//       })
//   }

//   //If redirect is true redirect, or else show signup page
//   if (redirect) {
//     return <Redirect to={{ pathname: redirect }} />
//   } else {
//     return (
//       <Container component='main' maxWidth='xs'>
//         <CssBaseline />
//         <div className={classes.paper}>
//           <Avatar className={classes.avatar}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component='h1' variant='h5'>
//             Are you a Handyman? Join our family!
//           </Typography>
//           <form className={classes.form} noValidate>
//             <Grid container spacing={2}>
//               {/* <Grid item xs={12}>
//                 <TextField
//                   variant="outlined"
//                   required
//                   fullWidth
//                   name="location"
//                   label="location"
//                   type="location"
//                   id="location"
//                   onChange={handleInputChangeLocation}
//                   autoComplete="current-location"
//                 />
//               </Grid> */}
//               <Grid item xs={12}>
//                 <GoogleMaps
//                   items={location}
//                   onChange={handleInputChangeLocation}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <p>Choose the services you can provide:</p>
//                 <SearchBar items={servicelist} onChange={onServiceChange} />
//               </Grid>
//             </Grid>
//             <Button
//               type='submit'
//               fullWidth
//               variant='contained'
//               color='primary'
//               className={classes.submit}
//               onClick={handleSubmit}
//             >
//               Sign Up
//             </Button>
           
//           </form>
//         </div>
//         <Box mt={8}>{/* <Copyright /> */}</Box>
//       </Container>
//     )
//   }
//  }

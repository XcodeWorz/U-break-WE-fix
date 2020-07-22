//Imports
import React, { useEffect, useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
// import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Api from '../utils/API'
import { Link,Redirect } from 'react-router-dom'
import GoogleMaps from '../components/Location/index'
import { AuthContext } from '../utils/auth-context'
import SearchBar from '../components/Searchbar'
import HandyResult from '../components/HandyResult'
import { List } from '../components/List'
import Card from '../components/Card'
import ReqNav from '../components/ReqNav'
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
    margin: theme.spacing(3, 0, 2),
    background: "#ef9a9a"

  },
  links: {
    '&:hover': {
      color: 'black'
    },
    color: 'black',
    textDecoration: 'none'
  }
}))

//Handysearch component
export default function HandySearch () {
  const classes = useStyles()
  const auth = useContext(AuthContext)

  //Redirect hook
  const [redirect, setRedirect] = useState('')

  const [servicelist, setService] = useState([])

  useEffect(() => {
    Api.getService().then(res => {
      setService(res.data)
      // console.log(res.data)
      // console.log('service list:')
    })
  }, [])
  //const service = [];
  const [service, setServiceN] = React.useState([])

  const onServiceChange = event => {
    if(!auth.isLoggedIn) {
      setRedirect('/login');
    }
    setServiceN(event)
  }

  //const [location, setLocation] = useState('')
  var location = ''

  //Handle input change for location
  const handleInputChangeLocation = event => {
    console.log(event);
    location = event;
    console.log(location);
  }
  const [showDiv, setshowDiv] = React.useState(false)
  const [handymanlists, setHandymanLists] = useState([])
  const [message, setMessage] = useState('Search For A Handyman!')
  //Saving person in database
  const handleSubmit = event => {
    event.preventDefault()
    setshowDiv(true)
    console.log('clicked')
    console.log(location)

    Api.getHandymans({ location: location }, service)
      .then(res => {
        console.log(res.data)
        if (res.data.length !== 0) {
          console.log(res.data.length + ' handyman found');
          // setMessage(res.data.length + ' handyman found');
          const message = setMessage("For the opted services and Location " + res.data.length + ' handyman found');
          //auth.login(res.data.handymanId, res.data.token)
          setHandymanLists(res.data);
          auth.setloc(location);
          //auth.setslist(res.data[0].service);
          //auth.setshid(res.data[0]._id);
        } else {
          console.log('no handyman found');
          setMessage('No Handyman found')
        }
        //setRedirect("/home");
      })
      .catch(error => {
        console.log(error)
      })
  }

  const saveHandyInfo = (hidx) => {
    //event.preventDefault()
   console.log(hidx)
   auth.setshid(hidx._id);
   auth.setslist(hidx.service);
  }

  //If redirect is true redirect, or else show signup page
  if (redirect) {
    return <Redirect to={{ pathname: redirect }} />
  } else {
    return (
      <div>
        <ReqNav/>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            {/* <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component='h1' variant='h5'>
              Find a Handyman
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <h3>
                    <p>Choose the services you are looking for:</p>
                  </h3>
                  <SearchBar items={servicelist} onChange={onServiceChange} />
                </Grid>
                <Grid item xs={12}>
                  <GoogleMaps
                    items={location}
                    onChange={handleInputChangeLocation}
                  />
                </Grid>
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
            {showDiv && 

            <div>
            <Grid>
              <Grid item xs={12} style={{ width: 1000 }}>
                <Card> {message}
                  {handymanlists.length ? (
                    <List>
                      {handymanlists.map(handymanlist => (
                        <HandyResult
                          key={handymanlist.id}
                          email={handymanlist.email}
                          location={handymanlist.location}
                          name={handymanlist.name}
                          phoneNumber={handymanlist.phoneNumber}
                          service={handymanlist.service.join(' ,')}
                          //Button={() =><Link to='/servicerequest'> <button>Submit Request</button></Link>} 
                          // Button={() => <button>Submit Request</button>}
                          Button={() => (
                            <Link to='/servicerequest'>
                            <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color="primary"
                            className={classes.submit}
                              onClick={() => saveHandyInfo(handymanlist)                              
                             }                             
                            >
                              Create Request
                            </Button>
                            </Link>
                          )}
                        />
                      ))}
                    </List>
                  ) : (
                    <h2 className='text-center'>{message}</h2>
                  )}
                </Card>
              </Grid>
            </Grid>
            </div>}
          </div>
          <Box mt={8}>{/* <Copyright /> */}</Box>
        </Container>
      </div>
    )
  }
}

import React, {useState} from 'react'
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import ImageUploader from '../components/imageUploader/singleImageUploader';
import TextField from '../components/textFields/textField'
import SelectField from '../components/textFields/selectFields'
import firebase from 'firebase/app'
import RoutingPath from '../routes/RoutingPath'
import { useHistory } from 'react-router-dom'
import {useAuth} from '../shared/global/provider/UserProvider'
import 'firebase/firestore'
import './newAccountView.css'

const useQontoStepIconStyles = makeStyles({
    root: {
      color: '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    active: {
      color: '#784af4',
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
  })
  
  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
      </div>
    )
  }
  
  QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
  }
  
  const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
        'linear-gradient( 95deg,#aa9bff 0%, #8677db 50%, #8e7fe0 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,#aa9bff 0%, #8677db 50%, #8e7fe0 100%)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector)
  
  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundImage:
        'linear-gradient( 136deg, #aa9bff 0%, #8677db 50%, #8e7fe0 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:
        'linear-gradient( 136deg, #aa9bff 0%, #8677db 50%, #8e7fe0 100%)',
    },
  })
  
  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles()
    const { active, completed } = props
  
    const icons = {
      1: <MailOutlineIcon />,
      2: <PermIdentityIcon />,
      3: <FavoriteBorderIcon />,
    }
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    )
  }
  
  ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }))

  const getSteps = () => {
    return ['About you', 'Images', 'Your preferences']
  }

  export const NewAccountView = () => {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const history = useHistory()
  const {currentUser} = useAuth()
  const firestore = firebase.firestore()
  const [error, setError] = useState("")

  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState()
  const [sex, setSex] = useState()
  const [maxAge, setMaxAge] = useState("")
  const [minAge, setMinAge] = useState("")
  const [searchSex, setSearchSex] = useState("")
  const [profileImage, setProfileImage] = useState("")

  const setUserData = (e) => {

    firestore.collection("users").doc(currentUser.uid).set({
      name: name,
      lastName: lastName,
      age: age,
      sex: sex,
      profileImage: profileImage,
      searchMaxAge: maxAge,
      searchMinAge: minAge,
      searchSex: searchSex,
      aboutMeText: "",
      favoriteGame: "",
      games: [],
      images: [],
      matchRequests: [],
      userId: currentUser.uid
    })
    .then(function() {
      console.log("Document successfully written!")
      history.push("/home")
    })
    .catch(function(error) {
      console.error("Error writing document: ", error)
      setError("Something went wrong, try again later")
    })
  }

  const handleNext = () => {
    if (activeStep === 2) {
      setUserData()
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const getStepperButtons = () => {
    return (
      <div className="stepperButtons">
        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
      </div>
    )
  }

  const getStepData = () => {
    if(activeStep === 0){
      return <div className="stepperDataCard">
      <div className="stepperContent">
      <h1>About you:</h1>
       <div className="stepperLeft">
          <TextField type="standard-basic" text="First name*" onChange={event => setName(event.target.value)}/>
          <TextField type="standard-basic" text="Age*" onChange={event => setAge(event.target.value)}/>
       </div>
       <div className="stepperRight">
          <TextField type="standard-basic" text="Last name*" onChange={event => setLastName(event.target.value)}/>
          <br /> <br />
          <input type="radio" value="Female" name="gender" onChange={event => setSex(event.target.value)} /> Female 
          <input type="radio" value="Male" name="gender" onChange={event => setSex(event.target.value)} /> Male 
        </div>
       {getStepperButtons()}
       </div>
      </div>
    }
    else if(activeStep === 1){
      return <div className="stepperDataCard">
        <h1>Images:</h1>
        <div className="stepperContent">
          <p>OBS! Tillfälligt tar jag bilder via deras bildadress. </p>
          <input
          type='text'
          onChange={event => setProfileImage(event.target.value)}
          />
          <ImageUploader />
        </div>
        {getStepperButtons()}
      </div>
    }
    else return <div className="stepperDataCard">
    <h2>I look for someone with these stats:</h2>
      <div className="stepperContent">
        <TextField type="standard-basic" text="Min age" onChange={event => setMinAge(event.target.value)}/>
        <TextField type="standard-basic" text="Max age" onChange={event => setMaxAge(event.target.value)}/>
        <div>
        <br />
          <input type="radio" value="Female" name="gender"onChange={event => setSearchSex(event.target.value)} /> Female 
          <input type="radio" value="Male" name="gender" onChange={event => setSearchSex(event.target.value)} /> Male 
          <input type="radio" value="Both" name="gender" onChange={event => setSearchSex(event.target.value)} /> Both     
        </div>    
        {getStepperButtons()}
      </div>
    </div>
  }

  return (
    <div className={classes.root}>
      <div className="activeStepCard">
        {getStepData()}
      </div>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

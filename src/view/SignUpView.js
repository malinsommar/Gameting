import React, {useState, useRef} from 'react'
import firebase from 'firebase/app'
import {useAuth} from '../shared/global/provider/UserProvider'
import {useHistory} from 'react-router-dom';
import TextField from '../components/textFields/textField'
import 'firebase/firestore'

const firestore = firebase.firestore()

export const SignUpView = () => {

  const history = useHistory();
  const {signUp, currentUser} = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sex, setSex] = useState("");
  const [partnerSex, setPartnerSex] = useState("");
  const partnerGender = useRef(null);
  const [partnerMinAge, setPartnerMinAge] = useState("");
  const [partnerMaxAge, setPartnerMaxAge] = useState("");
  const [profileImage, setprofileImage] = useState("");

  async function handleSubmit() {

    if (password !== controlPassword) {
      return setError("Passwords do not match")
    }
    try {
        setError("")
        setLoading(true)
        signUp(mail, password)
        history.push("/home")
      } catch {
        setError("Failed to create an account")
      }
      setLoading(false)
      setUserData()
  }

  const setUserData = () => {

    firestore.collection("users").doc(currentUser.uid).set({
      /*birthday: birthday,*/
      lastName: "malin",
      name: "name"
      /*profileImage: profileImage,
      searchMaxAge: partnerMaxAge,
      searchMinAge: partnerMinAge,
      searchSex: partnerSex,
      sex: sex,
      userId: currentUser.uid*/
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
  }

  return(
    <div style={{display: "flex"}}>
      <form onSubmit={handleSubmit}>
        <div style={{display: "inline-block", margin: "30px"}}>
            <p>Mail</p>
            <input
              type='text'
              text="Mail"
              onChange={event => setMail(event.target.value)}
            />
            <br />
            <p>Password</p>
            <input
              type='password'
              onChange={event => setPassword(event.target.value)}
            />
            <br />
            <p>Confirm password</p>
            <input
              type='password'
              onChange={event => setControlPassword(event.target.value)}
            />
          </div>
          <div style={{display: "inline-block", margin: "30px"}}>
              <p>Name</p>
              <input
                type='text'
                text="Mail"
                onChange={event => setName(event.target.value)}
              />
              <br />
              <p>Last name</p>
              <input
                type='text'
                text="Mail"
                onChange={event => setLastName(event.target.value)}
              />
              <br />
              <p>Sex</p>
              <input
                type='text'
                text="Mail"
                onChange={event => setSex(event.target.value)}
              />
              <br />
              <p>Birthday</p>
              <input
                type='text'
                text="Mail"
                onChange={event => setBirthday(event.target.value)}
              />
              <br />
              <p>Profile image</p>
              <input
                type='text'
                text="Mail"
                onChange={event => setprofileImage(event.target.value)}
              />
            </div>
            <div style={{display: "inline-block", margin: "30px"}}>
              <p>Sex</p>
              <input
                type='text'
                text="Mail"
                onChange={event => setPartnerSex(event.target.value)}
              />
              <br />
              <p>Min age</p>
              <input
                type='text'
                text="Mail"
                onChange={event => setPartnerMinAge(event.target.value)}
              />
              <br />
              <p>Max age</p>
              <input
                type='text'
                text="Mail"
                onChange={event => setPartnerMaxAge(event.target.value)}
              />
            </div>
       
        <input
         type='submit'
        />
      </form>
    </div>
  )
  }

  /*
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
import DatePicker from '../components/datePicker/datePicker';
import ImageUploader from '../components/imageUploader/singleImageUploader';
import PasswordField from '../components/textFields/passwordField'
import SelectField from '../components/textFields/selectFields'
  */

/*
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
  });
  
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
    );
  }
  
  QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
  };
  
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
  })(StepConnector);
  
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
  });
  
  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    const icons = {
      1: <MailOutlineIcon />,
      2: <PermIdentityIcon />,
      3: <FavoriteBorderIcon />,
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }
  
  ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
  };
  
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
  }));
  
  const getSteps = () => {
    return ['Account', 'About you', 'Your preferences'];
  }
*/

/*
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();


  const handleNext = () => {
    if (activeStep === 2) {
        handleSubmit()
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
      <Button disabled={activeStep <2 } type="submit" className={classes.button}>
          Finish
        </Button>
      </div>
    )
  }

  const getStepData = () => {
    if(activeStep === 0){
      return <div className="stepperDataCard">
        <h1>Account:</h1>
        <div className="stepperContent">
          <TextField type="standard-basic" text="Mail" onChange={event => setMail(event.target.value)}/>
          <div className="stepperRight">
            <TextField type="standard-basic" text="Password" onChange={event => setPassword(event.target.value)}/>
            <TextField type="standard-basic" text="Repeat password" onChange={event => setControlPassword(event.target.value)}/>

            <PasswordField text="Password" /> 
            <PasswordField text="Repeat password" /> 
          </div>
          <p className="stepperLeft">Terms and agreemenst? [  ]</p>
          {getStepperButtons()}
        </div>
      </div>
    }
    else if(activeStep === 1){
      return <div className="stepperDataCard">
       <div className="stepperContent">
        <div className="stepperLeft">
        <h1>About you:</h1>
          <TextField type="standard-basic" text="First name" onChange={event => setName(event.target.value)}/>
          <SelectField onChange={event => setSex(event.target.value)} />
          <div className="stepperDatePicker">
            <DatePicker text="Birthday" />
          </div>
          <p>{birthday}</p>
        </div>
        <div className="stepperRight">
        <ImageUploader id="stepperImageUploader"/>
        </div>
        {getStepperButtons()}
        </div>
       </div>
    }
    else return <div className="stepperDataCard">
    <h2>I look for someone with these stats:</h2>
      <div className="stepperContent">
        <TextField type="standard-basic" text="Min age" onChange={event => setPartnerMinAge(event.target.value)}/>
        <TextField type="standard-basic" text="Max age" onChange={event => setPartnerMaxAge(event.target.value)}/>
        <SelectField onChange={event => setPartnerSex(event.target.value)} />
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
*/
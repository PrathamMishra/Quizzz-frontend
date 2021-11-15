import React from "react";
import GoogleIcon from "../Icons/GoogleIcon";
import FbIcon from "../Icons/FbIcon";
import {GoogleLogin} from "react-google-login";
import {Button} from "@material-ui/core";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {useDispatch} from "react-redux";
import {loginAction} from "../../actions/authActions";
import { useHistory } from "react-router";
 
function Auth() {
  const dispatch = useDispatch();
  const history = useHistory();
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log({profile: result, token});
    dispatch(loginAction({profile: result, token}));
    history.push('/createRoom');
  }
  const googleFailure = (error) => {
      console.log(error);
      console.log("Google Sign In Unsuccessful. Try Again Later");
  }

  const responseFacebook = (response) => {
    console.log(response);
  }

  return (
    <>
      <GoogleLogin 
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
            <Button 
                color="primary" 
                fullWidth 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled} 
                startIcon={<GoogleIcon />}
                variant="contained"
            >
                Google Sign In
            </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
    />
    <FacebookLogin
      appId={process.env.REACT_APP_FB_APP_ID}
      autoload
      fields="name,email,picture"
      callback={responseFacebook}
      render={(renderProps) => (
        <Button 
            color="primary" 
            fullWidth 
            onClick={renderProps.onClick} 
            disabled={renderProps.isDisabled}
            startIcon={<FbIcon />}
            variant="contained"
        >
            Facebook Sign In
        </Button>
      )}
    />
  </>
  );
}

export default Auth;
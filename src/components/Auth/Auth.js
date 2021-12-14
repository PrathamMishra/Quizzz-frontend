import React from "react";
import GoogleIcon from "../Icons/GoogleIcon";
import FbIcon from "../Icons/FbIcon";
import { GoogleLogin } from "react-google-login";
import { Button } from "@material-ui/core";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch } from "react-redux";
import { loginAction } from "../../actions/authActions";
import { useHistory } from "react-router";
import { useState, useEffect, useRef } from "react";
import { logIn, signUp } from "../../redux/auth/authAction";

function Auth() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [check, setCheck] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setName] = useState("");
  const roleElement = useRef(null);

  async function handleLogin() {
    const data = {
      email: email,
      password: password,
    };
    console.log(data)

    dispatch(logIn(data));

  }
  async function handleSignIn() {
    const data = {
      name: fullname,
      email: email,
      password: password,
      // this is not define yet
      passwordConfirm:password,
      role: roleElement.current.value,
    };
    console.log(data);
    dispatch(signUp(data))
    
  }
  function handleSignUp() {
    setCheck((prevState) => {
      return !prevState;
    });
  }
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log({ profile: result, token });
    dispatch(loginAction({ profile: result, token }));
    history.push("/");
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In Unsuccessful. Try Again Later");
  };

  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <>
      <div>
        <div>
          {check ? (
            <button className="btn btn-primary" onClick={handleSignUp}>
              login
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSignUp}>
              sign up
            </button>
          )}
        </div>
        <div className="container">
          {check ? (
            <div>
              <input
                value={fullname}
                type="text"
                name="fullname"
                placeholder="full name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                align="left"
              />

              <input
                value={email}
                type="text"
                name="email"
                placeholder="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                align="left"
              />
              <input
                value={password}
                type="text"
                name="password"
                placeholder="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                align="left"
              />
              <select ref={roleElement}>
                <option value="student">student</option>
                <option value="teacher">teacher</option>
                <option value="institute">institute/organisation</option>
              </select>
              <button className="btn btn-primary" onClick={handleSignIn}>
                Sign up
              </button>
            </div>
          ) : (
            <div>
              <input
                value={email}
                type="text"
                name="email"
                placeholder="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                align="left"
              />
              <input
                value={password}
                type="text"
                name="password"
                placeholder="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                align="left"
              />
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          )}
        </div>
        <div>
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
        </div>
      </div>
    </>
  );
}




export default Auth;

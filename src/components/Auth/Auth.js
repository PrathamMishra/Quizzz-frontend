import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { logIn, signUp } from "../../redux/auth/authAction";


function Auth(){
    const dispatch = useDispatch();
    let [change,setChange]=useState("out")

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role,setRole]=useState("")
    const [idProof,setIdproof]=useState("")

    async function handleLogin() {
        const data = {
            email: email,
            password: password,
        };
        console.log(data);

        dispatch(logIn(data));
    }
    async function handleSignIn() {
        // TODO pass and confirm password funtion

        const data = {
            name: name,
            email: email,
            password: password,
            passwordConfirm: confirmPassword,
            idProof:idProof,
            role: role,
        };
        console.log(data);
        dispatch(signUp(data));
    }
    function changeSection(){
        setChange(e=>e==="in"?"out":"in")
    }
    function uploadDoc(e){
        e.preventDefault()
        setIdproof(e.target.files[0])
    }
    // const formData = new FormData();
    
    //   // Update the formData object
    //   formData.append(
    //     "myFile",
    //     idProof,
    //     idProof.name
    //   );
    
    //   // Request made to the backend api
    //   // Send formData object
    //   axios.post("api/uploadfile", formData);
    // };
    return (
        <div className="container_auth login_box">
            <div className="auth_container">
                <div className="auth_nav" onClick={changeSection}>sign-Up</div>
                <div className="auth_section">
                    <div className={`login_container`}>
                        <h3 className="auth_header">Sign in</h3>
                        <p className="auth_p">Loream ealkjdljfljdfflasjdfljasdlfjasddsfskdfhiurb fjsagduyfg sjdgf;lfjasdljflsd</p>
                        <input type="email" className="input_field email" onChange={e=>setEmail(e.target.value)} placeholder="Email" />
                        <input type="password" className="input_field password" onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
                        <div className="login_btn">
                            <h3 className="btn btn-outline-dark" onClick={handleLogin}>Login</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`auth_container signup_box  ${change==="in"?"signup_box_insert":" "}`}>
                <div className="auth_nav" onClick={changeSection}>sign-In</div>
                <div className="auth_section">
                    <div className={`sign_container`}>
                        <h3 className="auth_header">Sign Up</h3>
                        <p className="auth_p">Loream ealkjdljfljdfflasjdfljasdlfjasddsfskdfhiurb fjsagduyfg sjdgf;lfjasdljflsd</p>
                        <input type="text" className="input_field email" onChange={e=>setName(e.target.value)} placeholder="Name" />
                        <input type="email" className="input_field email" onChange={e=>setEmail(e.target.value)} placeholder="Email" />
                        <input type="password" className="input_field password" onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
                        <input type="password" className="input_field password" onChange={e=>setConfirmPassword(e.target.value)} placeholder="Confirm Password"/>
                        <input type="file" name="uploadFile" onChange={uploadDoc} className="upload_field"/>
                        <div className="login_btn">
                            <h3 className="btn btn-outline-dark" onClick={handleSignIn}>sign up</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;

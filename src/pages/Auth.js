import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({ setActive, setUser }) => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const { email, password, firstName, lastName, confirmPassword } = state;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(user);
        setActive("home");
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error("Password don't match");
      }
      if (firstName && lastName && email && password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
        setActive("home");
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    }
    navigate("/");
  };
  const handleaddclass = event => {
    setIsActive(current => !current);
  };
  return (
    // <div className="container-fluid mb-4">
    //   <div className="container">
    //     <div className="col-12 text-center">
    //       <div className="text-center heading py-2">
    //         {!signUp ? "Sign-In" : "Sign-Up"}
    //       </div>
    //     </div>
    //     <div className="row h-100 justify-content-center align-items-center">
    //       <div className="col-10 col-md-8 col-lg-6">
    //         <form className="row" onSubmit={handleAuth}>
    //           {signUp && (
    //             <>
    //               <div className="col-6 py-3">
    //                 <input
    //                   type="text"
    //                   className="form-control input-text-box"
    //                   placeholder="First Name"
    //                   name="firstName"
    //                   value={firstName}
    //                   onChange={handleChange}
    //                 />
    //               </div>
    //               <div className="col-6 py-3">
    //                 <input
    //                   type="text"
    //                   className="form-control input-text-box"
    //                   placeholder="Last Name"
    //                   name="lastName"
    //                   value={lastName}
    //                   onChange={handleChange}
    //                 />
    //               </div>
    //             </>
    //           )}
    //           <div className="col-12 py-3">
    //             <input
    //               type="email"
    //               className="form-control input-text-box"
    //               placeholder="Email"
    //               name="email"
    //               value={email}
    //               onChange={handleChange}
    //             />
    //           </div>
    //           <div className="col-12 py-3">
    //             <input
    //               type="password"
    //               className="form-control input-text-box"
    //               placeholder="Password"
    //               name="password"
    //               value={password}
    //               onChange={handleChange}
    //             />
    //           </div>
    //           {signUp && (
    //             <div className="col-12 py-3">
    //               <input
    //                 type="password"
    //                 className="form-control input-text-box"
    //                 placeholder="Confirm Password"
    //                 name="confirmPassword"
    //                 value={confirmPassword}
    //                 onChange={handleChange}
    //               />
    //             </div>
    //           )}

    //           <div className="col-12 py-3 text-center">
    //             <button
    //               className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
    //               type="submit"
    //             >
    //               {!signUp ? "Sign-in" : "Sign-up"}
    //             </button>
    //           </div>
    //         </form>
    //         <div>
    //           {!signUp ? (
    //             <>
    //               <div className="text-center justify-content-center mt-2 pt-2">
    //                 <p className="small fw-bold mt-2 pt-1 mb-0">
    //                   Don't have an account ?&nbsp;
    //                   <span
    //                     className="link-danger"
    //                     style={{ textDecoration: "none", cursor: "pointer" }}
    //                     onClick={() => setSignUp(true)}
    //                   >
    //                     Sign Up
    //                   </span>
    //                 </p>
    //               </div>
    //             </>
    //           ) : (
    //             <>
    //               <div className="text-center justify-content-center mt-2 pt-2">
    //                 <p className="small fw-bold mt-2 pt-1 mb-0">
    //                   Already have an account ?&nbsp;
    //                   <span
    //                     style={{
    //                       textDecoration: "none",
    //                       cursor: "pointer",
    //                       color: "#298af2",
    //                     }}
    //                     onClick={() => setSignUp(false)}
    //                   >
    //                     Sign In
    //                   </span>
    //                 </p>
    //               </div>
    //             </>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <div class="loginsignupform">
        <div className={`containerloginform  ${isActive ? "" :"right-panel-active"}`} id="containerloginform">
          <div class="form-containerloginform sign-up-containerloginform">
            <form onSubmit={handleAuth}>
              <h1 class="Loginsignupheader">Create Account</h1>
              <div class="social-containerloginform">
                <a href="" class="social">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="" class="social">
                  <i class="fab fa-google-plus-g"></i>
                </a>
                <a href="" class="social">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span class="loginspan">or use your email for registration</span>
              <div class="adjustname">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                />
              </div>
              <input
                type="email"
                className="form-control input-text-box"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <input
                type="password"
                className="form-control input-text-box"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <input
                type="password"
                className="form-control input-text-box"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
              <button onClick={() =>setSignUp(true)}>Sign Up</button>
            </form>
          </div>
          <div class="form-containerloginform sign-in-containerloginform">
            <form onSubmit={handleAuth}>
              <h1>Sign in</h1>
              <div class="social-containerloginform">
                <a href="" class="social">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="" class="social">
                  <i class="fab fa-google-plus-g"></i>
                </a>
                <a href="" class="social">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span class="loginspan">or use your account</span>
              <input type="email"
                className="form-control input-text-box"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange} />
              <input  type="password"
                className="form-control input-text-box"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange} />
              <a href="">Forgot your password?</a>
              <button     onClick={() =>setSignUp(false)}>Sign In</button>
            </form>
          </div>
          <div class="overlay-containerloginform">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                 onClick={() => {handleaddclass();}} 
                class="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button 
                onClick={() => {handleaddclass();}}
                class="ghost" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = (event) => {
    event.preventDefault();
    const message = checkValidData(
      isSignUp ? fullName.current.value : "",
      email.current.value,
      password.current.value,
      isSignUp,
    );
    setErrMessage(message);
    if (message) return;
    if (isSignUp) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then(async (userCredential) => {
          const user = userCredential.user;
          try {
            await updateProfile(user, {
              displayName: fullName.current.value.trim(),
              photoURL:
                "https://lh3.googleusercontent.com/ogw/AF2bZyhWyfiYxgQloy4ZObzsKOVIjc9XSSW8bpJn9dDAWveoTgs=s32-c-mo",
            });
            const { uid, email, displayName, photoURL } = user;
            dispatch(addUser({ uid, email, displayName, photoURL }));
            navigate("/browse");
          } catch (error) {
            setErrMessage(`${error.code}: ${error.message}`);
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + ": " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error signing in:", errorCode, errorMessage);
          setErrMessage(errorCode + ": " + errorMessage);
        });
    }
  };

  const toggleSignUp = () => {
    setIsSignUp((currentValue) => !currentValue);
    setErrMessage("");
  };

  return (
    <div>
      <Header />
      <div>
        <img
          className="w-full h-screen object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ab1fe332-993a-44d1-b60b-cd4f8d11b96e/web/IN-en-20260928-TRIFECTA-perspective_85aef51c-94d6-41ea-a1ea-1e77199158f1_large.jpg"
          alt="login background"
        />
      </div>
      <div className="fixed inset-0 z-10 overflow-y-auto bg-gradient-to-t bg-black/70">
        <div className="min-h-full flex flex-col justify-center px-4 py-8">
          <form
            onSubmit={handleButtonClick}
            className="w-full max-w-md mx-auto bg-black/75 p-8 rounded"
          >
            <h1 className="text-3xl font-bold text-white mb-4  cursor-pointer">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h1>
            {isSignUp && (
              <input
                ref={fullName}
                type="text"
                placeholder="Full Name"
                className="border bg-gray-900/40 text-white placeholder:text-gray-500 p-4 my-4 rounded mb-4 w-full"
              />
            )}
            <input
              ref={email}
              type="email"
              placeholder="Email"
              className="border bg-gray-900/40 text-white placeholder:text-gray-500 p-4 my-4 rounded mb-4 w-full"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="border bg-gray-900/40 text-white placeholder:text-gray-500 p-4 my-4 rounded mb-4 w-full "
            />

            <p className="text-red-500 font-semibold text-lg py-2">
              {errMessage}
            </p>
            <button
              type="submit"
              className="bg-red-600 text-white p-4 my-6 rounded w-full"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
            <p className="text-white cursor-pointer">
              {isSignUp ? "Already have an account?" : "New to Netflix?"}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={toggleSignUp}
              >
                &nbsp; {isSignUp ? "Sign In Now" : "Sign Up Now"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

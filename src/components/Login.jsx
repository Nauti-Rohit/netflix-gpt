import {useState} from "react";
import Header from "./Header";

const Login = () => {
const[isSignUp, setIsSignUp] = useState(false);

const toggleSignUp = () => {
  setIsSignUp(!isSignUp);
}

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
      <div className="fixed inset-0 z-10 overflow-y-auto bg-black/60">
        <div className="min-h-full flex flex-col justify-center px-4 py-8">
        <form className="w-full max-w-md mx-auto bg-black/75 p-8 rounded">
          <h1 className="text-3xl font-bold text-white mb-4  cursor-pointer">{isSignUp ? "Sign Up" : "Sign In"}</h1>
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              className="border bg-gray-900/40 text-white placeholder:text-gray-500 p-4 my-4 rounded mb-4 w-full"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="border bg-gray-900/40 text-white placeholder:text-gray-500 p-4 my-4 rounded mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            className="border bg-gray-900/40 text-white placeholder:text-gray-500 p-4 my-4 rounded mb-4 w-full "
          />
          <button
            type="submit"
            className="bg-red-600 text-white p-4 my-6 rounded w-full"
          >
           {isSignUp ? "Sign Up" : "Login"}
          </button>
          <p className="text-white cursor-pointer">
            {isSignUp ? "Already have an account?" : "New to Netflix?"} 
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={toggleSignUp}
            >
              &nbsp;  {isSignUp ? "Login" : "Sign up now"}
            </button>
          </p>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

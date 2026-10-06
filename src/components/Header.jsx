import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constant";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error"); // Redirect to an error page or show an error message
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        );
        navigate("/browse"); // Redirect to the browse page if the user is authenticated
      } else {
        dispatch(removeUser());
        navigate("/"); // Redirect to the login page if the user is not authenticated
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="absolute top-0 left-0 z-20 w-full px-12 py-2 bg-gradient-to-b from-black/80 via-black/50 to-transparent flex items-center justify-between">
      <div>
        <img
          className="w-44"
          src={LOGO}
          alt="Netflix Logo"
        />
      </div>
      {user && (
        <div className="flex items-center gap-3">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName ? `${user.displayName} profile` : "Profile"}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div
              aria-label="Profile picture unavailable"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-red-700 font-bold text-white"
            >
              {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
            </div>
          )}
          <span className="max-w-40 truncate font-medium text-white">
            {user.displayName || user.email}
          </span>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-white bg-red-600 rounded font-bold hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

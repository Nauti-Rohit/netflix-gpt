import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/"); // Redirect to the login page after sign-out
      })
      .catch((error) => {
        console.error("Sign-out failed:", error);
      });
  };
  return (
    <div className="absolute top-0 left-0 z-20 w-full px-12 py-2 bg-gradient-to-b from-black/80 via-black/50 to-transparent flex items-center justify-between">
      <div>
        <img
          className="w-44"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-08-21/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
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

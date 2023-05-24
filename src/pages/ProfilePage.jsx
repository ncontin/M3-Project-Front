import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { logout } = useContext(AuthContext);
  

  return (
    <>
      <h1>Profile</h1>
      <button type="button" onClick={logout}>
        Log Out
      </button>
    </>
  );
};

export default ProfilePage;

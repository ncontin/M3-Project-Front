import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoading, token } = useContext(AuthContext);

  if (!isLoading && !isLoggedIn) {
    return <Navigate to="/login" />;
  }
  console.log(isLoggedIn, isLoading, token);
  return isLoading ? <h1>Loading...</h1> : <>{children}</>;
};

export default PrivateRoute;

// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Navigate } from "react-router-dom";

// function PrivateRoute({ children }) {
//   const { isLoggedIn, isLoading } = useContext(AuthContext);

//   // If the authentication is still loading
//   if (isLoading) return <p>Loading ...</p>;

//   if (!isLoggedIn) {
//     // If the user is not logged in
//     return <Navigate to="/login" />;
//   } else {
//     // If the user is logged in, allow to see the page
//     return children;
//   }
// }

// export default PrivateRoute;

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function SpotDetails() {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const [spot, setSpot] = useState();

  const fetchSpot = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/api/spots/${spotId}`);
      console.log(response.status);
      if (response.status === 200) {
        console.log(response.data);
        setSpot(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSpot();
  }, [spotId]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5005/api/spots/${spotId}`);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {spot ? (
        <>
          <h2>{spot.title}</h2>
          <h3>{spot.description}</h3>
          <h3>{spot.rating}</h3>
          <h3>{spot.city}</h3>
          <h3>{spot.address}</h3>
          <Link to={`/spots/update/${spotId}`}>Update</Link>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </>
      ) : (
        <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
          <div className="wheel"></div>
          <div className="hamster">
            <div className="hamster__body">
              <div className="hamster__head">
                <div className="hamster__ear"></div>
                <div className="hamster__eye"></div>
                <div className="hamster__nose"></div>
              </div>
              <div className="hamster__limb hamster__limb--fr"></div>
              <div className="hamster__limb hamster__limb--fl"></div>
              <div className="hamster__limb hamster__limb--br"></div>
              <div className="hamster__limb hamster__limb--bl"></div>
              <div className="hamster__tail"></div>
            </div>
          </div>
          <div className="spoke"></div>
        </div>
      )}
    </>
  );
}

export default SpotDetails;

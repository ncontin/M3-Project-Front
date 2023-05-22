import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SpotDetails() {
  const { spotId } = useParams();

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

  return (
    <>
      {spot ? (
        <>
          <h2>{spot.title}</h2>
          <h3>{spot.description}</h3>
          <h3>{spot.rating}</h3>
          <h3>{spot.city}</h3>
          <h3>{spot.address}</h3>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <h2>Hello</h2>
    </>
  );
}

export default SpotDetails;

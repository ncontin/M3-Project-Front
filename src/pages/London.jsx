import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function London() {
  const [spots, setSpots] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/spots");
      if (response.status === 200) {
        setSpots(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {spots.map((spot) => (
        <div key={spot._id}>
          <Link to={`/spots/london/${spot._id}`}>
            <h2>{spot.title}</h2>
          </Link>
        </div>
      ))}
    </>
  );
}

export default London;

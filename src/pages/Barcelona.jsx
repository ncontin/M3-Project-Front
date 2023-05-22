import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import React from "react";

const Barcelona = () => {
  const [spots, setSpots] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/spots");
      if (response.status === 200) {
        const barcelonaSpots = response.data.filter((spot) => spot.city === "Barcelona");
        setSpots(barcelonaSpots);
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
          <Link to={`/spots/barcelona/${spot._id}`}>
            <h2>{spot.title}</h2>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Barcelona;

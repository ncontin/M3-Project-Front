import React, { useState } from "react";

const CreateSpot = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");
  const [city, setCity] = useState("London");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      address,
      rating,
      city,
    };

    try {
      const response = await fetch("http://localhost:5005/api/spots/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newSpot = await response.json();
        console.log("New spot created:", newSpot);
        //perform any necessary actions upon successful spot creation
      } else {
        console.error("Error creating spot:", response.status);
        //handle the error appropriately
      }
    } catch (error) {
      console.error("Error creating spot:", error);
      //handle the error appropriately
    }
  };

  return (
    <div>
      <h2>Create a Spot</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label>Rating:</label>
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} required />
        </div>
        <div>
          <label>City:</label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="London">London</option>
            <option value="Rome">Rome</option>
            <option value="Barcelona">Barcelona</option>
          </select>
        </div>
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};

export default CreateSpot;
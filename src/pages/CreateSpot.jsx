import React, { useState } from "react";
import axios from "axios";

const CreateSpot = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");
  const [city, setCity] = useState("London");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fData = new FormData();
    const image = event.target.image.files[0];
    console.log("image", image);
    fData.append("imageUrl", image);
    fData.append("title", title);
    fData.append("description", description);
    fData.append("address", address);
    fData.append("rating", rating);
    fData.append("city", city);

    try {
      const response = await axios.post(
        "http://localhost:5005/api/spots/",
        fData
      );

      if (response.status === 201) {
        const newSpot = response.data;
        console.log("New spot created:", newSpot);
        // perform any necessary actions upon successful spot creation
      } else {
        console.error("Error creating spot:", response.status);
        // handle the error appropriately
      }
    } catch (error) {
      console.error("Error creating spot:", error);
      // handle the error appropriately
    }
  };

  return (
    <div>
      <h2>Create a Spot</h2>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="London">London</option>
            <option value="Rome">Rome</option>
            <option value="Barcelona">Barcelona</option>
          </select>
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            name="image"
            accept="image/png, image/jpg"
            required
          />
        </div>
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};

export default CreateSpot;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdatePage = () => {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ title: "", description: "", address: "", rating: "", city: "London" });
  const [isLoading, setIsLoading] = useState(true);

  const fetchSpot = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/spots/${spotId}`);
      const spot = response.data;
      delete spot._id;
      console.log(spot);
      console.log(inputs);
      setInputs(spot);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSpot();
  }, [spotId]);

  const handleChange = (event) => {
    /* setInputs(prevInputs => ({
      ...prevInputs,
      [event.target.name]:
        event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    })) */
    /* Condition ? iftrue : iffalse */
    setInputs((prevInputs) => {
      let currentValue = event.target.value;
      const currentTarget = event.target.name;

      if (event.target.type === "checkbox") {
        currentValue = event.target.checked;
        console.log(event.target.checked);
      }

      return { ...prevInputs, [currentTarget]: currentValue };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...inputs };

    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_API_URL}/api/spots/${spotId}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("All good");
        // Navigate to the details page
        navigate(`/spots`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <h1>Update {spotId}</h1>
      <form style={{ display: "grid", gridTemplate: "repeat(5, 1fr) / auto" }} onSubmit={handleSubmit}>
        <label>
          Title:
          <input value={inputs.title} name="title" onChange={handleChange} />
        </label>
        <label>
          Description:
          <input value={inputs.description} name="description" onChange={handleChange} />
        </label>
        <label>
          Address:
          <input name="address" value={inputs.address} onChange={handleChange} />
        </label>
        <label>
          Rating:
          <input value={inputs.rating} name="rating" onChange={handleChange} />
        </label>
        <label>
          City:
          <select value={inputs.city} name="city" onChange={handleChange}>
            <option value="London">London</option>
            <option value="Rome">Rome</option>
            <option value="Barcelona">Barcelona</option>
          </select>
        </label>
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default UpdatePage;

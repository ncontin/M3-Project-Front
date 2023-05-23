import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function SpotDetails() {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const [spot, setSpot] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const fetchSpot = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/spots/${spotId}`);
      if (response.status === 200) {
        setSpot(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/comments?spotId=${spotId}`);
      if (response.status === 200) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSpot();
    fetchComments();
  }, [spotId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      const localToken = localStorage.getItem("authToken");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/comments`,
        {
          spotId: spotId,
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${localToken}`, //
          },
        }
      );

      if (response.status === 201) {
        // Comment successfully posted, update the comments list
        fetchComments();
        setNewComment(""); // Clear the comment input field
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_API_URL}/api/spots/${spotId}`);
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

          <h3>Comments:</h3>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment._id}>{comment.content}</li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </>
      ) : (
        // Render loading state
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
      <form onSubmit={handleSubmitComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        ></textarea>
        <button type="submit">Post Comment</button>
      </form>
    </>
  );
}

export default SpotDetails;

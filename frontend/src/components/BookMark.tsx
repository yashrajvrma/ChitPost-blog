import { Bookmark } from "lucide-react";
import { FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

interface Saved {
  saved: Boolean;
  id: String;
}

function BookMark({ saved, id }: Saved) {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [alreadySaved, setAlreadySaved] = useState(saved);

  const handleBookmark = async () => {
    if (!accessToken) {
      navigate("/signin");
      return;
    }

    try {
      const response = await axios.put(
        "http://127.0.0.1:8787/api/v1/save",
        { blogId: id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      setAlreadySaved(response.data.existingBookmark);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div onClick={() => handleBookmark()}>
      {alreadySaved ? (
        <div className="bookmark flex hover:cursor-pointer">
          <FaBookmark />
        </div>
      ) : (
        <div className="bookmark flex text-neutral-600 hover:text-slate-900 hover:cursor-pointer">
          <Bookmark size={20} strokeWidth={1.3} />
        </div>
      )}
    </div>
  );
}

export default BookMark;

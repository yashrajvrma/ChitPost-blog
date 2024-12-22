import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogCard from "../components/BlogCard";

export default function DetailedBlog() {
  const accessToken = localStorage.getItem("accessToken");
  const id = useParams();

  const [blog, setBlog] = useState("");

  useEffect(() => {
    const fetchDetailedBlog = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/post/${id}/view`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.data.blog) {
          setBlog(response.data.blog);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchDetailedBlog();
    }
  }, [id]);
  console.log(id);
  return <div>hii </div>;
}

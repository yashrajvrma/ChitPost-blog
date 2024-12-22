import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/Navbar";
import DetailedBlogCard from "../components/DetailedBlogCard";

interface Author {
  firstName: string;
  lastName: string;
  profileColor: string;
}

interface Blog {
  id: string;
  title: string;
  description: string;
  published: boolean;
  authorId: string;
  author: Author;
}

export default function DetailedBlog() {
  const accessToken = localStorage.getItem("accessToken");
  const { id } = useParams<{ id: string }>(); // Ensure `id` is a string
  const [blog, setBlog] = useState<Blog | null>(null); // Blog state can be null initially

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
        console.error("Error fetching blog:", error);
      }
    };

    if (id) {
      fetchDetailedBlog();
    }
  }, [id, accessToken]);

  return (
    <div>
      <NavBar />
      <div>
        {blog ? (
          <DetailedBlogCard
            title={blog.title}
            content={blog.description}
            firstName={blog.author.firstName}
            lastName={blog.author.lastName}
            profileColor={blog.author.profileColor}
          />
        ) : (
          <div className="flex justify-center items-center h-screen">
            <p>Loading blog details...</p>
          </div>
        )}
      </div>
    </div>
  );
}

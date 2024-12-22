import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";

interface Author {
  firstName: string;
  lastName: string;
  profileColor: string;
}
interface Blogs {
  id: string;
  title: string;
  description: string;
  published: boolean;
  authorId: string;
  author: Author;
}
function Blogs() {
  const [blogs, setBlogs] = useState<Blogs[]>([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/post/view/bulk`
        );
        if (response.data.blogs) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllBlogs();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div>
        {" "}
        {blogs.map((item, index) => (
          <BlogCard
            key={index}
            id={item.id}
            firstName={item.author.firstName}
            lastName={item.author.lastName}
            title={item.title}
            content={item.description}
            profileColor={item.author.profileColor}
          />
        ))}
      </div>
    </div>
  );
}

export default Blogs;

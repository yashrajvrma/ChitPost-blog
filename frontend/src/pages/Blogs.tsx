import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import NavBar from "../components/Navbar";

interface Author {
  firstName: string;
  lastName: string;
  profileColor: string;
}

interface Blog {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  author: Author;
}

// Utility function to extract plain text from JSON content
const extractTextFromContent = (jsonContent: string): string => {
  try {
    const parsed = JSON.parse(jsonContent);
    let text = "";

    const traverse = (node: any): void => {
      if (node.type === "text") {
        text += node.data + " ";
      }
      if (node.children) {
        node.children.forEach(traverse);
      }
    };

    traverse(parsed);
    return text.trim();
  } catch (error) {
    console.error("Error parsing content:", error);
    return "";
  }
};

// // Utility function to format date
// const formatDate = (dateString: string): string => {
//   return new Date(dateString).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// Extract first heading as title
const extractTitle = (jsonContent: string): string => {
  try {
    const parsed = JSON.parse(jsonContent);
    let title = "";

    const findTitle = (node: any): boolean => {
      if (node.type === "tag" && (node.name === "h1" || node.name === "h2")) {
        title = node.children?.[0]?.data || "";
        return true;
      }
      if (node.children) {
        for (const child of node.children) {
          if (findTitle(child)) return true;
        }
      }
      return false;
    };

    findTitle(parsed);
    return title || "Untitled";
  } catch (error) {
    console.error("Error extracting title:", error);
    return "Untitled";
  }
};

// Updated Blogs component
function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

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
    <div>
      <div>
        <NavBar />
      </div>
      <div className="flex justify-center items-center mt-5">
        <div className="w-full max-w-5xl px-4">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              firstName={blog.author.firstName}
              lastName={blog.author.lastName}
              title={extractTitle(blog.content)}
              content={extractTextFromContent(blog.content)}
              profileColor={blog.author.profileColor}
              createdAt={blog.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Blogs;

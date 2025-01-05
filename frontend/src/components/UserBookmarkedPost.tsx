import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import BlogSkeleton from "./BlogSkeleton";
interface Blog {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  author: Author;
}
interface Author {
  firstName: string;
  lastName: string;
  profileColor: string;
}

interface ParsedContent {
  title: string;
  content: string;
  imageUrl?: string;
}

// Updated UsersPost component using the new extraction function
const extractContentAndMetadata = (jsonContent: string): ParsedContent => {
  try {
    // Parse the JSON content
    const parsed = JSON.parse(jsonContent);
    let title = "";
    let imageUrl = "";
    let contentNodes: any[] = [];

    // Helper function to check if a node is a heading
    const isHeadingNode = (node: any): boolean => {
      return node.type === "tag" && ["h1", "h2", "h3"].includes(node.name);
    };

    // Helper function to extract text content from a node
    const getNodeText = (node: any): string => {
      if (node.children) {
        return node.children
          .map((child: any) => {
            if (child.type === "text") {
              return child.data;
            } else if (child.type === "tag") {
              return getNodeText(child);
            }
            return "";
          })
          .join("");
      }
      return "";
    };

    // Function to find the first heading of specified type
    const findFirstHeading = (
      node: any,
      headingType: string
    ): string | null => {
      if (node.type === "tag" && node.name === headingType) {
        return getNodeText(node);
      }
      if (node.children) {
        for (const child of node.children) {
          const foundTitle = findFirstHeading(child, headingType);
          if (foundTitle) {
            return foundTitle;
          }
        }
      }
      return null;
    };

    // Try to find title in order: h1 -> h2 -> h3
    const headingTypes = ["h1", "h2", "h3"];
    for (const headingType of headingTypes) {
      const foundTitle = findFirstHeading(parsed, headingType);
      if (foundTitle) {
        title = foundTitle;
        break;
      }
    }

    // Recursive function to process nodes and extract content and image
    const processNode = (node: any): void => {
      // Extract image URL from img tags
      if (
        node.type === "tag" &&
        node.name === "img" &&
        node.attribs?.src &&
        !imageUrl
      ) {
        imageUrl = node.attribs.src;
      }

      // Add non-title nodes to content
      if (!isHeadingNode(node) || node.name !== headingTypes[0]) {
        contentNodes.push(node);
      }

      // Process children recursively
      if (node.children) {
        node.children.forEach(processNode);
      }
    };

    // Start processing from the root node
    processNode(parsed);

    // Convert remaining content nodes back to text
    let contentText = "";
    const extractText = (nodes: any[]): void => {
      nodes.forEach((node) => {
        if (node.type === "text") {
          contentText += node.data + " ";
        }
        if (node.children) {
          extractText(node.children);
        }
      });
    };

    extractText(contentNodes);

    return {
      title: title || "Untitled", // Fallback to "Untitled" if no heading is found
      content: contentText.trim(),
      imageUrl: imageUrl,
    };
  } catch (error) {
    console.error("Error processing content:", error);
    return {
      title: "Untitled",
      content: "",
      imageUrl: undefined,
    };
  }
};

function UserBookmarkedPost() {
  const accessToken = localStorage.getItem("accessToken");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/post/all/saved`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.data.data) {
          setBlogs(response.data.data);
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllBlogs();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center sm:mt-5 mt-3">
        <div className="w-full max-w-5xl px-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <BlogSkeleton key={index} />
            ))
          ) : blogs.length === 0 ? (
            // "No Post Created" Message
            <div className="flex flex-col justify-center items-center w-full max-w-5xl px-4 mt-10">
              <div className="flex flex-col tracking-tighter text-center font-semibold text-slate-700 sm:text-lg text-sm mb-14 sb:mb-16">
                No Post created, Create some...
              </div>
              <div className="font-semibold text-slate-800 text-center sm:text-4xl text-2xl font-geist tracking-tighter sm:px-32 sm:pb-8 pb-5">
                "Don't get it right, just get it written." -{" "}
                <span className="text-neutral-500">James Thurber</span>
              </div>
              <div>
                <img
                  className="rounded-md sm:max-w-2xl max-w-xs"
                  src="https://res.cloudinary.com/dspu4ehu3/image/upload/v1735335729/EE3CD340-DF8E-4873-B650-5482FC174F65_m7s8yh.jpg"
                  alt="journaling-nature"
                />
              </div>
            </div>
          ) : (
            <div className="w-full max-w-5xl px-4">
              <div className="flex flex-col justify-start sm:text-5xl text-3xl text-slate-900 font-semibold sm:mt-10 mt-7 sm:mb-5">
                Your Saved Post
              </div>
              <div>
                {blogs.map((blog) => {
                  // Use the new extraction function to get title, content, and image URL
                  const { title, content, imageUrl } =
                    extractContentAndMetadata(blog.content);
                  return (
                    <BlogCard
                      key={blog.id}
                      id={blog.id}
                      firstName={blog.author.firstName}
                      lastName={blog.author.lastName}
                      title={title}
                      content={content}
                      profileColor={blog.author.profileColor}
                      createdAt={blog.createdAt}
                      imageUrl={imageUrl || ""}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default UserBookmarkedPost;

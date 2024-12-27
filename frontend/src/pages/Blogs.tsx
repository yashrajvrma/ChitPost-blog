import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import BlogSkeleton from "../components/BlogSkeleton";

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

// Updated Blogs component using the new extraction function
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

function Blogs({ take, skeletonNum }: any) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/post/view/bulk`,
          {
            params: {
              take: take,
            },
          }
        );
        if (response.data.blogs) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllBlogs();
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center sm:mt-5 mt-5">
        <div className="w-full max-w-5xl px-4">
          {isLoading ? (
            Array.from({ length: skeletonNum }).map((_, index) => (
              <BlogSkeleton key={index} />
            ))
          ) : (
            <div>
             
              <div>
                {" "}
                <div>
                  {blogs.map((blog) => {
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
                        imageUrl={
                          imageUrl ||
                          "https://source.unsplash.com/random/400x300"
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Blogs;

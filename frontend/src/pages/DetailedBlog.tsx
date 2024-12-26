import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Copy } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Helper function for copy notification
const notify = () => toast("Copied to Clipboard");

// Type definitions for our data structures
type JsonNode = {
  type: string;
  name?: string;
  attribs?: Record<string, string>;
  children?: JsonNode[];
  data?: string;
};

interface Author {
  firstName: string;
  lastName: string;
  profileColor: string;
}
interface UserProps {
  author: Author;
  createdAt: string;
}

export default function DetailedBlog() {
  // State management for all our component data
  const accessToken = localStorage.getItem("accessToken");
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<JsonNode | null>(null);
  const [loading, setLoading] = useState(true);

  // New state variables for user profile information
  const [userDetail, setUserDetail] = useState<UserProps>();

  // Helper function to format the date in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Fetch blog data when component mounts or ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/post/${id}/view`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const { blog } = response.data;
        const parsedContent = JSON.parse(blog.content);
        setContent(parsedContent);

        // Set user profile information
        setUserDetail(blog);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, accessToken]);

  // Recursive function to render different types of content nodes
  const renderNode = (node: JsonNode): React.ReactNode => {
    if (node.type === "text") {
      return node.data;
    }

    if (node.type === "tag") {
      const children = node.children?.map((child, index) => (
        <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
      ));

      switch (node.name) {
        case "h1":
          return (
            <h1 className="md:text-5xl text-4-xl tracking-tight font-bold mb-4">
              {children}
            </h1>
          );
        case "h2":
          return (
            <h2 className="md:text-3xl text-2xl tracking-tight font-semibold mb-3">
              {children}
            </h2>
          );
        case "h3":
          return (
            <h3 className="md:text-2xl text-xl tracking-tight font-semibold mb-2">
              {children}
            </h3>
          );
        case "p":
          return (
            <p className="mb-4 md:text-xl text-sm font-geist leading-relaxed">
              {children}
            </p>
          );
        case "a":
          return (
            <a
              href={node.attribs?.href}
              target={node.attribs?.target}
              rel={node.attribs?.rel}
              className="text-stone-600 underline underline-offset-2 hover:text-stone-800 transition-colors"
            >
              {children}
            </a>
          );
        case "strong":
        case "b":
          return <strong className="font-bold">{children}</strong>;
        case "em":
        case "i":
          return <em className="italic">{children}</em>;
        case "u":
          return <u>{children}</u>;
        case "span":
          return (
            <span
              style={
                node.attribs?.style
                  ? { color: node.attribs.style.split(": ")[1] }
                  : {}
              }
            >
              {children}
            </span>
          );
        case "img":
          return (
            <div className="max-w-xl md:max-w-5xl w-full">
              <img
                src={node.attribs?.src}
                alt={node.attribs?.alt || ""}
                className="object-cover w-full h-auto"
              />
            </div>
          );
        case "ul":
          return <ul className="list-disc pl-6 mb-4">{children}</ul>;
        case "ol":
          return <ol className="list-decimal pl-6 mb-4">{children}</ol>;
        case "li":
          return <li className="mb-2">{children}</li>;
        case "code":
          const codeText = node.children?.[0]?.data || "";
          return (
            <div className="relative rounded-lg md:px-2 pt-0.5 my-4 bg-slate-50">
              <div
                onClick={() => {
                  navigator.clipboard.writeText(codeText);
                  notify();
                }}
                className="absolute top-2 right-4 pt-1 hover:cursor-pointer"
              >
                <Copy className="md:w-4 w-3" />
              </div>
              <pre className="overflow-auto bg-slate-50 text-slate-900">
                <code className="md:text-base text-sm font-mono">
                  {codeText}
                </code>
              </pre>
              <Toaster
                containerClassName="text-lg font-sans"
                position="top-center"
                toastOptions={{
                  icon: "✅",
                  duration: 2500,
                  style: {
                    minWidth: "250px",
                  },
                }}
              />
            </div>
          );
        default:
          return <div>{children}</div>;
      }
    }

    if (node.type === "root" && node.children) {
      return node.children.map((child, index) => (
        <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
      ));
    }

    return null;
  };

  // Function to render content with the profile section after the title
  const renderContent = () => {
    if (!content) return null;

    let title = null;
    let remainingContent = [];

    // Separate the title from the rest of the content
    // @ts-ignore
    for (let i = 0; i < content.children?.length || 0; i++) {
      const node = content.children?.[i];
      if (node?.type === "tag" && node.name === "h1" && !title) {
        title = renderNode(node);
      } else {
        remainingContent.push(node);
      }
    }

    return (
      <div className="max-w-xl md:max-w-4xl">
        <div>{title}</div>

        <div className="headline flex flex-row items-center gap-2 md:mb-16 md:mt-12 py-3 max-w-xl md:max-w-4xl border-b-2 border-t-2 border-slate-100">
          <div
            style={{ backgroundColor: userDetail?.author.profileColor }}
            className="flex w-8 h-8 md:w-12 md:h-12 rounded-full text-white justify-center items-center text-sm tracking-tight"
          >
            {userDetail?.author.firstName.substring(0, 1).toUpperCase()}
            {userDetail?.author.lastName.substring(0, 1).toUpperCase()}
          </div>
          <div>
            <div className="name text-base md:text-lg text-slate-700 font-semibold">
              {userDetail?.author.firstName}{" "}
              {userDetail?.author.lastName.substring(0, 1).toUpperCase()}
              {userDetail?.author.lastName.substring(1)}
            </div>
            <div className="date text-slate-500 font-medium text-sm md:text-base tracking-tight">
              {formatDate(userDetail?.createdAt || "")}
            </div>
          </div>
        </div>
        <div>
          {" "}
          {remainingContent.map((node, index) => (
            //@ts-ignore
            <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  // Handle loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-pulse text-gray-600">Loading content...</div>
      </div>
    );
  }

  if (!content) {
    return <div className="text-center text-red-600">No content available</div>;
  }

  // Main component render
  return (
    <div className="px-4 py-6">
      <article className="prose max-w-none">{renderContent()}</article>
    </div>
  );
}

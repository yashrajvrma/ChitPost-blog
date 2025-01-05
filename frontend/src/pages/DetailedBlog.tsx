import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Copy } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import DetailedBlogSkeleton from "../components/DetailedBlogSkeleton";
import { Heart } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ShareBtn from "../components/ShareBtn";
import BookMark from "../components/BookMark";

// Helper function for copy notification
// const notify = () => toast("Copied to Clipboard!");

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

function DetailedBlog() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<JsonNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [readTime, setReadTime] = useState(0); // New state for read time
  const [showLottie, setShowLottie] = useState(false);

  // New state variables for user profile information
  const [userDetail, setUserDetail] = useState<UserProps>();
  const [totalLike, setTotalLike] = useState();
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [alreadySaved, setAlreadySaved] = useState(false);

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
        const response = await axios.get(
          `http://127.0.0.1:8787/api/v1/post/${id}/view`,
          {
            headers: {
              Authorization: `Bearer ${accessToken ? accessToken : ""}`,
            },
          }
        );
        if (response.data) {
          const parsedContent = JSON.parse(response.data.blog.content);
          setContent(parsedContent);
          calculateReadTime(parsedContent);
          setUserDetail(response.data.blog);
          setTotalLike(response.data.totalLikes);
          setAlreadyLiked(response.data.existingLike);
          setAlreadySaved(response.data.existingBookmark);
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    fetchData();
  }, [id]);

  const handleLike = async () => {
    if (!accessToken) {
      navigate("/signin");
      return;
    }

    try {
      const response = await axios.put(
        "http://127.0.0.1:8787/api/v1/fav",
        { blogId: id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      setTotalLike(response.data.totalLikes);
      setAlreadyLiked(response.data.existingLikes);
      // Show animation only if user liked for the first time
      if (!alreadyLiked) {
        setShowLottie(true);
        setTimeout(() => setShowLottie(false), 2000); // Hide animation after 1 second
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Helper function to count words in the blog content
  const countWords = (node: JsonNode): number => {
    if (node.type === "text") {
      return (
        node.data?.split(/\s+/).filter((word) => word.length > 0).length || 0
      );
    }

    if (node.children) {
      return node.children.reduce(
        (count, child) => count + countWords(child),
        0
      );
    }

    return 0;
  };

  // Calculate the read time based on word count
  const calculateReadTime = (content: JsonNode) => {
    const wordCount = countWords(content);
    const estimatedReadTime = Math.ceil(wordCount / 256); // Assuming 200 words per minute
    setReadTime(estimatedReadTime);
  };

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
            <h1 className="md:text-5xl text-4xl tracking-tight font-extrabold mb-4">
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
                  console.log("from detail");

                  navigator.clipboard.writeText(codeText);
                  toast.dismiss(); // Clear any existing toasts
                  toast("Copied to Clipboard!", { id: "copy-toast-b" });
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
                containerClassName="font-sans px-0 text-sm sm:text-base"
                position="top-center"
                toastOptions={{
                  icon: "✅",
                  duration: 2500,
                  style: {
                    minWidth: "100px",
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
      <div className="max-w-xl sm:max-w-4xl">
        {loading ? (
          <div className="max-w-xl md:max-w-4xl w-full">
            <DetailedBlogSkeleton />
          </div>
        ) : (
          // Show skeleton while loading
          <>
            <div className="sm:mb-10">{title}</div>
            <div className="headline flex flex-row items-center gap-2.5 sm:mb-2 mb-3 md:mt-1 py-1 max-w-xl md:max-w-4xl border-slate-100">
              <div
                style={{ backgroundColor: userDetail?.author.profileColor }}
                className="flex w-9 h-9 sm:w-12 sm:h-12 rounded-full text-neutral-100 justify-center items-center text-center align-middle sm:text-md text-sm tracking-tight"
              >
                {userDetail?.author.firstName.substring(0, 1).toUpperCase()}
                {userDetail?.author.lastName.substring(0, 1).toUpperCase()}
              </div>
              <div>
                <div className="name text-sm md:text-lg text-slate-900">
                  {userDetail?.author.firstName}{" "}
                  {userDetail?.author.lastName.substring(0, 1).toUpperCase()}
                  {userDetail?.author.lastName.substring(1)}
                </div>
                <div className="date text-slate-500 font-medium text-xs md:text-sm tracking-tight">
                  {formatDate(userDetail?.createdAt || "")}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between pr-4 font-geist gap-8 items-center align-middle border-t-2 border-b-2 border-neutral-100">
              {/* <div className="flex flex-row items-center align-middle sm:gap-7 gap-4">
                <div
                  onClick={handleLike}
                  className="flex items-center hover:text-red-500 hover:cursor-pointer"
                >
                  <div
                    className="relative flex items-center justify-center hover:text-red-500"
                    style={{ width: "70px", height: "70px" }} // Retain fixed dimensions
                  >
                    {showLottie ? (
                      <DotLottieReact
                        src="https://lottie.host/97b56409-717f-446f-b607-09843d2ad5de/XmrquCv9az.lottie"
                        style={{ height: "100%", width: "100%" }} // Match parent container dimensions
                        autoplay
                      />
                    ) : (
                      <Heart
                        size={18}
                        fill={alreadyLiked ? "red" : "white"}
                        className={`hover:cursor-pointer ${
                          alreadyLiked ? "text-red-500" : "text-neutral-600"
                        }`}
                        strokeWidth={1.3}
                      />
                    )}
                  </div>

                  <div
                    className="flex items-center sm:text-base text-sm text-neutral-600 hover:text-red-500 
             ml-[-20px] sm:ml-[-15px]"
                    style={{
                      position: "relative", // Ensure alignment with the Lottie animation
                    }}
                  >
                    {totalLike}
                  </div>
                </div>

                <div className="flex align-middle text-slate-600 hover:cursor-text sm:text-base text-sm">
                  {readTime} min read
                </div>
              </div> */}
              <div className="flex flex-row items-center align-middle sm:gap-7 gap-4">
                <div className="flex items-center ">
                  <div
                    onClick={handleLike}
                    className="relative flex items-center justify-center hover:text-red-500 overflow-hidden hover:cursor-pointer" // Add overflow-hidden to clip excess animation
                    style={{
                      width: "60px", // Reduce width
                      height: "60px", // Reduce height
                    }}
                  >
                    {showLottie ? (
                      <DotLottieReact
                        src="https://lottie.host/97b56409-717f-446f-b607-09843d2ad5de/XmrquCv9az.lottie"
                        style={{
                          height: "150%", // Scale the animation height to make it fit better
                          width: "150%", // Scale the animation width proportionally
                        }}
                        autoplay
                      />
                    ) : (
                      <Heart
                        size={17}
                        fill={alreadyLiked ? "red" : "white"}
                        className={`hover:cursor-pointer  ${
                          alreadyLiked ? "text-red-500" : "text-neutral-600"
                        }`}
                        strokeWidth={1.3}
                      />
                    )}
                  </div>

                  <div
                    className="flex items-center hover:cursor-pointer sm:text-base text-sm text-neutral-500 hover:text-neutral-900 
             ml-[-15px] sm:ml-[-15px]"
                    style={{
                      position: "relative", // Ensure alignment with the Lottie animation
                    }}
                  >
                    {totalLike}
                  </div>
                </div>

                <div className="flex align-middle text-slate-600 hover:cursor-text sm:text-base text-sm">
                  {readTime} min read
                </div>
              </div>

              <div className="flex flex-row sm:gap-7 gap-4">
                {/* <div className="bookmark flex text-neutral-600 hover:text-slate-900 hover:cursor-pointer">
                  <Bookmark size={20} strokeWidth={1.3} />
                </div> */}
                <BookMark saved={alreadySaved} id={id || ""} />
                <ShareBtn />
              </div>
            </div>
            <div>
              {remainingContent.map((node, index) => (
                //@ts-ignore
                <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  // Main component render
  return (
    <div className="px-4 py-6">
      <article className="prose max-w-none">{renderContent()}</article>
    </div>
  );
}

export default DetailedBlog;

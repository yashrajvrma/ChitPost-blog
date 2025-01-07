import { Link } from "react-router-dom";

// export default BlogCard;
interface BlogCardProps {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  content: string;
  profileColor: string;
  createdAt: string;
  imageUrl: string; // New prop for image URL
}

function BlogCard({
  id,
  firstName,
  lastName,
  title,
  content,
  profileColor,
  createdAt,
  imageUrl, // Add imageUrl to props
}: BlogCardProps) {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  console.log("title" + title);
  return (
    <Link to={`/blog/${id}`}>
      <div className="card-body flex border-b-2 border-slate-100 h-full pt-7 pb-2 gap-3 max-w-xl md:max-w-4xl font-sans tracking-tight cursor-pointer transition-colors duration-200">
        <div className="text-component w-3/4">
          <div className="headline flex flex-row items-center gap-2">
            <div
              style={{ backgroundColor: profileColor }}
              className="flex w-8 h-8 md:w-9 md:h-9 rounded-full text-neutral-900 justify-center items-center text-center text-xs align-middle sm:text-sm tracking-tight"
            >
              {firstName.substring(0, 1).toUpperCase()}
              {lastName.substring(0, 1).toUpperCase()}
            </div>

            <div className="name text-sm md:text-base text-slate-700 font-semibold">
              {firstName} {lastName.substring(0, 1).toUpperCase()}
              {lastName.substring(1)}
            </div>

            <div className="flex text-slate-500 text-sm md:text-base">·</div>

            <div className="date text-slate-500 font-semibold text-sm md:text-base">
              {formatDate(createdAt)}
            </div>
          </div>

          <div className="title text-slate-900 text-lg md:text-3xl font-black py-1.5 md:line-clamp-3 line-clamp-2">
            {title}
          </div>

          <div className="text-slate-600 md:text-base text-sm line-clamp-3 md:line-clamp-3 font-medium">
            {content}
          </div>
        </div>

        <div className="img-component w-1/4 flex justify-center md:pt-2 md:px-3">
          <div className="md:w-56 w-64 h-48 flex justify-center items-center md:pt-6 pb-6">
            <img
              src={imageUrl}
              className="md:w-full md:max-h-44 object-cover"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;

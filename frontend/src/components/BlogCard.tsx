// import { Link } from "react-router-dom";

// interface BlogCardProps {
//   id: string;
//   firstName: string;
//   lastName: string;
//   title: string;
//   content: string;
//   profileColor: string;
//   createdAt: string;
// }
// // Utility function to format date
// const formatDate = (dateString: string): string => {
//   return new Date(dateString).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// // function BlogCard({
// //   id,
// //   firstName,
// //   lastName,
// //   title,
// //   content,
// //   profileColor,
// // }: blogProps) {
// //   return (
// //     <Link to={`/blog/${id}`}>
// //       <div className=" card-body flex border-b-2 border-slate-200 h-full py-7 gap-3 max-w-xl md:max-w-5xl font-sans tracking-tight cursor-pointer">
// //         {/* content */}
// //         <div className="text-component w-3/4">
// //           <div className="headline flex flex-row items-center gap-2">
// //             <div
// //               style={{ backgroundColor: profileColor }}
// //               className="flex w-8 h-8 md:w-9 md:h-9 rounded-full text-slate-50 justify-center items-center text-sm tracking-wide"
// //             >
// //               {firstName.substring(0, 1).toUpperCase()}
// //               {lastName.substring(0, 1).toUpperCase()}
// //             </div>

// //             {/* <div className="logo w-8 md:w-9"> */}
// //             {/* <img
// //               src="../../public/assets/images/newprofiilepic.png"
// //               alt="logo"
// //             /> */}
// //             {/* </div> */}
// //             <div className="name text-sm md:text-base text-slate-700 font-semibold">
// //               {firstName} {lastName.substring(0, 1)}
// //             </div>

// //             <div className="flex pb-2 md:pb-2.5 text-slate-500 text-sm md:text-base">
// //               .
// //             </div>

// //             <div className="date text-slate-500 font-semibold text-sm md:text-base">
// //               Dec 21, 2024
// //             </div>
// //           </div>
// //           <div className="title text-slate-900 text-base md:text-2xl font-bold py-1.5">
// //             {title}
// //           </div>
// //           <div className="text-slate-600 md:text-lg text-sm line-clamp-3 md:line-clamp-3 font-medium">
// //             {content}
// //           </div>
// //         </div>
// //         {/* img block */}
// //         <div className="img-component w-1/4 flex justify-center md:pt-2">
// //           <div className="md:w-56 w-64 flex justify-center items-center pt-6">
// //             <img
// //               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWCwV4vQq_cYrtmGMspltwTozfpM6LG_sOA&s"
// //               alt="blog-img"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // }

// // export default BlogCard;

// function BlogCard({
//   id,
//   firstName,
//   lastName,
//   title,
//   content,
//   profileColor,
//   createdAt,
// }: BlogCardProps) {
//   return (
//     <Link to={`/blog/${id}`}>
//       <div className="card-body flex border-b-2 border-slate-200 h-full py-7 gap-3 max-w-xl md:max-w-5xl font-sans tracking-tight cursor-pointer hover:bg-slate-50 transition-colors duration-200">
//         <div className="text-component w-3/4">
//           <div className="headline flex flex-row items-center gap-2">
//             <div
//               style={{ backgroundColor: profileColor }}
//               className="flex w-8 h-8 md:w-9 md:h-9 rounded-full text-white justify-center items-center text-sm tracking-wide"
//             >
//               {firstName.substring(0, 1).toUpperCase()}
//               {lastName.substring(0, 1).toUpperCase()}
//             </div>

//             <div className="name text-sm md:text-base text-slate-700 font-semibold">
//               {firstName} {lastName.substring(0, 1)}
//             </div>

//             <div className="flex pb-2 md:pb-0 text-slate-500 text-sm md:text-base">
//               ·
//             </div>

//             <div className="date text-slate-500 font-semibold text-sm md:text-base">
//               {formatDate(createdAt)}
//             </div>
//           </div>

//           <div className="title text-slate-900 text-base md:text-2xl font-bold py-1.5">
//             {title}
//           </div>

//           <div className="text-slate-600 md:text-lg text-sm line-clamp-3 md:line-clamp-3 font-medium">
//             {content}
//           </div>
//         </div>

//         <div className="img-component w-1/4 flex justify-center md:pt-2">
//           <div className="md:w-56 w-64 flex justify-center items-center pt-6">
//             <img
//               src="https://source.unsplash.com/random/400x300"
//               alt="blog-preview"
//               className="object-cover rounded-lg"
//             />
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

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
              className="flex w-8 h-8 md:w-9 md:h-9 rounded-full text-neutral-900 justify-center items-center text-sm tracking-wide"
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

          <div className="title text-slate-900 text-lg md:text-3xl font-black py-1.5">
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
              alt="blog-preview"
              className="md:w-full md:max-h-44 object-cover"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;

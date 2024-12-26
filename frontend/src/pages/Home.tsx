import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Blogs from "./Blogs";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate("/blogs");
  };
  return (
    // <div className="text-3xl mb-20">
    //   <div>
    //     <Navbar />
    //     <Blogs />
    //   </div>
    // </div>
    // <div className="flex flex-col sm:max-w-4xl mx-auto">
    //   <Navbar />
    //   <div className="homepage flex flex-col justify-center gap-10 sm:max-w-4xl max-w-2xl mt-16 mx-auto">
    //     <div className=" container flex flex-col justify-center items-center">
    //       <div className="flex flex-col heading sm:text-7xl gap-3 text-2xl font-geist py-10 tracking-tighter">
    //         <div> ChitPost - a Minimalist</div>
    //         <div> Personal Blog Site.</div>
    //       </div>
    //       <div className="sm:text-xl font-medium text-lg font-sans tracking-tight pb-10">
    //         "Discover simplicity in blogging. Share your stories, ideas, and
    //         experiences with the world."
    //       </div>
    //       <div className="flex justify-center sm:max-w-4xl ">
    //         <img
    //           className="rounded-md"
    //           src="../../public/assets/images/photo-1672746509961-6340a9808970.jpg"
    //         />
    //       </div>
    //     </div>
    //     <div className="recent-publications flex flex-col tracking-tight">
    //       {" "}
    //       <div className="sm:text-lg text-base font-sans flex flex-start font-medium mt-20 text-slate-600">
    //         Recent Publications
    //       </div>
    //       <div>
    //         <Blogs take={4} />
    //       </div>
    //     </div>
    //     <div className="flex justify-center items-center my-10 mb-20">
    //       {/* <Button
    //         onClick={() => handleViewMore()}
    //         className="bg-slate-100 rounded-xl text-slate-800 font-semibold text-base border-2 border-slate-200 hover:bg-slate-200"
    //       >
    //         View More
    //       </Button> */}
    //       <button
    //         onClick={() => handleViewMore()}
    //         className="bg-slate-100 rounded-lg text-slate-800 font-semibold border-2 border-slate-200 hover:bg-slate-200 px-20 py-2 text-sm"
    //       >
    //         View More
    //       </button>
    //     </div>
    //   </div>
    //   <Footer />
    // </div>

    <div className="flex flex-col w-full sm:max-w-4xl mx-auto">
      <Navbar />
      <div className="homepage flex flex-col justify-center gap-6 sm:gap-10 px-0 sm:px-0 max-w-[95vw] sm:max-w-4xl mt-8 sm:mt-16 mx-auto">
        <div className="container flex flex-col justify-center items-center">
          <div className="flex flex-col heading text-3xl sm:text-7xl gap-1 sm:gap-3 font-geist py-6 sm:py-10 tracking-tighter text-center">
            <div>ChitPost - a Minimalist</div>
            <div>Personal Blog Site.</div>
          </div>
          <div className="text-sm sm:text-xl font-medium font-sans tracking-tight pb-6 sm:pb-10 text-center px-2">
            "Discover simplicity in blogging. Share your stories, ideas, and
            experiences with the world."
          </div>
          <div className="flex justify-center w-full px-2 sm:px-0">
            <img
              className="rounded-md w-[90vw] sm:w-full max-w-2xl object-cover"
              src="../../public/assets/images/photo-1672746509961-6340a9808970.jpg"
              alt="Blog header"
            />
          </div>
        </div>
        <div className="recent-publications flex flex-col tracking-tight w-full sm:max-w-none">
          <div className="text-sm sm:text-base font-sans flex flex-start font-medium mt-12 sm:mt-20 text-slate-600 px-4">
            Recent Publications
          </div>
          <div>
            <Blogs take={4} />
          </div>
        </div>
        <div className="flex justify-center items-center my-8 sm:my-10 mb-16 sm:mb-20">
          <button
            onClick={() => handleViewMore()}
            className="bg-slate-100 rounded-lg text-slate-800 font-semibold border-2 border-slate-200 hover:bg-slate-200 px-12 sm:px-20 py-2 text-xs sm:text-sm"
          >
            View More
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Blogs from "./Blogs";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate("/blogs");
  };
  const handleCreate = () => {
    navigate("/blog/create");
  };
  return (
    <div className="flex flex-col w-full sm:max-w-4xl mx-auto">
      <Navbar />
      <div className="homepage flex flex-col justify-center gap-6 sm:gap-10 px-0 sm:px-0 max-w-[95vw] sm:max-w-4xl mt-8 sm:mt-16 mx-auto">
        <div className="container flex flex-col justify-center items-center">
          <div className="heading flex flex-col font-medium text-4xl text-neutral-700 sm:text-7xl gap-1 sm:gap-3 font-geist py-6 sm:py-10 tracking-tighter text-center">
            <div>ChitPost - a Minimalist</div>
            <div>Personal Blog Site.</div>
          </div>
          <div className="text-sm sm:text-xl  font-normal font-sans pb-6 sm:pb-10 text-center px-2">
            "Discover simplicity in blogging. Share your stories, ideas, and
            experiences with the world."
          </div>
          <div className="flex justify-center w-full px-2">
            <img
              className="rounded-lg w-[90vw] sm:w-full max-w-4xl object-cover"
              src="https://res.cloudinary.com/dspu4ehu3/image/upload/v1735335735/photo-1672746509961-6340a9808970_qa0ncb.jpg"
              alt="homePage-img"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center font-sans sm:gap-8 gap-5 sm:mt-20 mt-10">
          <div className="sm:text-4xl text-2xl text-center font-medium text-neutral-700 tracking-tight sm:tracking-normal">
            Start Your Minimalist Blogging Journey Today!
          </div>
          <div>
            {" "}
            <button
              onClick={() => handleCreate()}
              className="bg-green-400 rounded-full text-slate-800 font-semibold border-2 border-slate-200 hover:bg-green-500 hover:text-slate-100 sm:px-10 px-8 sm:py-3 py-2.5 text-xs sm:text-sm"
            >
              Create Chit
            </button>
          </div>
        </div>
        <div className="recent-publications flex flex-col tracking-tight w-full sm:max-w-none">
          <div className="text-sm sm:text-base font-sans flex flex-start font-medium mt-12 sm:mt-20 text-slate-600 px-4">
            Recent Publications
          </div>
          <div>
            <Blogs take={4} skeletonNum={4} />
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

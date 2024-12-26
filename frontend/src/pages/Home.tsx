import Navbar from "../components/Navbar";
import Blogs from "./Blogs";

function Home() {
  return (
    // <div className="text-3xl mb-20">
    //   <div>
    //     <Navbar />
    //     <Blogs />
    //   </div>
    // </div>
    <div className="flex flex-col justify-center">
      <Navbar />
      <div className="homepage flex flex-col justify-center gap-10 sm:max-w-4xl max-w-2xl mt-20 mx-auto">
        <div className=" container flex flex-col justify-center items-center">
          <div className="flex flex-col heading sm:text-7xl gap-3 text-2xl font-geist py-10 tracking-tighter">
            <div> ChitPost - a Minimalist</div>
            <div> Personal Blog Site.</div>
          </div>
          <div className="sm:text-xl font-medium text-lg font-sans tracking-tight pb-10">
            "Discover simplicity in blogging. Share your stories, ideas, and
            experiences with the world."
          </div>
          <div className="flex justify-center sm:max-w-4xl ">
            <img
              className="rounded-md"
              src="../../public/assets/images/photo-1672746509961-6340a9808970.jpg"
            />
          </div>
        </div>
        <div className="recent-publications flex flex-col">
          {" "}
          <div className="sm:text-xl text-lg font-sans flex flex-start font-medium">
            Recent Publications
          </div>
          <div>Post...</div>
          <br />
          <br />
          <br />
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default Home;

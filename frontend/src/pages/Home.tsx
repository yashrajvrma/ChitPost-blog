import Navbar from "../components/Navbar";
import Blogs from "./Blogs";

function Home() {
  return (
    <div className="text-3xl mb-20">
      <div>
        <Navbar />
        <Blogs />
      </div>
    </div>
  );
}

export default Home;

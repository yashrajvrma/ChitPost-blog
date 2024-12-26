import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, UserPlus, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../feature/userSlice";
import { persistor } from "../app/store";
import { RootState } from "../app/store";
import { Plus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

const notify = () => toast("Logged out Successfully");
const comingSoon = () => toast("Coming Soon... I'm coding");

const NavBar = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleComingSoon = () => {
    comingSoon();
  };

  const handleCreate = () => {
    navigate("/blog/create");
  };

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");

    // Clear user data from Redux state
    dispatch(
      setUser({
        firstName: "",
        lastName: "",
        profileColor: "",
      })
    );

    // Clear persisted state
    await persistor.purge();

    notify();
    setTimeout(() => {
      toast.dismiss();
      navigate("/signin");
    }, 1000);
  };

  return (
    <div className="flex flex-row justify-between sm:px-12 px-4 sm:h-20 h-16 text-slate-100 tracking-tight border-b-2 border-slate-100">
      <div className="flex flex-row justify-center items-center gap-4 sm:gap-8">
        <Link to="/">
          <div className="logo font-neuePower text-2xl sm:text-4xl text-slate-800 cursor-pointer tracking-tight">
            ChitPost
          </div>
        </Link>
        <div
          onClick={handleComingSoon}
          className="search-bar flex flex-row justify-start items-center rounded-full bg-slate-50 w-32 sm:w-64 sm:h-12 h-9 hover:cursor-pointer"
        >
          <div className="sm:pl-4 pl-3 sm:pr-2 pr-1">
            <Search
              className="w-5 h-5 sm:w-7 sm:h-7"
              color="grey"
              strokeWidth={1}
            />
          </div>
          <input
            className="sm:w-44 w-24 sm:text-base text-sm text-slate-800 px-1 focus:outline-none bg-transparent cursor-pointer"
            type="text"
            placeholder="Search"
            readOnly
          />
        </div>
      </div>
      <div className="flex flex-row justify-center items-center">
        {location.pathname !== "/blog/create" && (
          <button
            className="bg-green-500 text-slate-50 font-medium font-sans text-sm  hover:bg-green-600 hover:text-white sm:mr-8 mr-3 flex items-center justify-center rounded-full"
            onClick={() => handleCreate()}
          >
            <span className="sm:hidden p-2 text-slate-50">
              <Plus className="w-4 h-4" />
            </span>
            <span className="hidden sm:block sm:px-8 sm:py-2 sm:text-lg">
              Create
            </span>
          </button>
        )}

        <div className="flex justify-center items-center">
          <Popover>
            <PopoverTrigger className="flex items-center">
              {user.profileColor ? (
                <div
                  style={{ backgroundColor: user.profileColor }}
                  className="flex w-8 h-8 md:w-11 md:h-11 rounded-full text-slate-50 justify-center items-center text-base tracking-tighter"
                >
                  {user.firstName.substring(0, 1).toUpperCase()}
                  {user.lastName.substring(0, 1).toUpperCase()}
                </div>
              ) : (
                <CircleUserRound
                  className="sm:w-11 sm:h-11 text-slate-700 w-9 h-9 mt-0.5 sm:mt-0"
                  strokeWidth={0.8}
                />
              )}
            </PopoverTrigger>
            <PopoverContent className="font-sans text-base font-medium sm:text-lg tracking-tight">
              {accessToken ? (
                <div className="flex flex-col gap-2 cursor-pointer">
                  <div className="flex flex-row justify-center items-center gap-2">
                    <User size={19} />
                    <div>{`${user.firstName} ${user.lastName
                      .substring(0, 1)
                      .toUpperCase()}${user.lastName.substring(1)}`}</div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <LogOut size={18} />
                    <div onClick={handleLogout}>Log out</div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row gap-2">
                  <UserPlus className="sm:mt-1 mt-0.5" size={18} />
                  <div className="cursor-pointer" onClick={handleSignup}>
                    Create account
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Toaster
        containerClassName="sm:text-lg text-sm font-sans px-0"
        position="top-center"
        toastOptions={{
          icon: "😔",
          duration: 1000,
          style: {
            minWidth: window.innerWidth < 640 ? "100px" : "250px",
          },
        }}
      />
    </div>
  );
};

export default NavBar;

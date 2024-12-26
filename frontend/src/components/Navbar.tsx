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
    <div className="flex flex-row justify-between sm:px-0 px-4 sm:h-24 h-16 text-slate-100 tracking-tight border-b-2 border-slate-100">
      <div className="flex flex-row justify-center items-center gap-4 sm:gap-8">
        <Link to="/">
          <div className="logo font-sans font-medium text-xl sm:text-3xl text-slate-700 cursor-pointer tracking-tighter">
            ChitPost
          </div>
        </Link>
        <div
          onClick={handleComingSoon}
          className="search-bar flex flex-row justify-start items-center rounded-full bg-slate-50 w-32 sm:w-52 sm:h-10 h-9 hover:cursor-pointer"
        >
          <div className="sm:pl-4 pl-3 sm:pr-1.5 pr-1">
            <Search
              className="w-5 h-5 sm:w-4 sm:h-4"
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
            className="bg-green-400 text-slate-900 font-normal font-sans text-sm  hover:bg-green-500 hover:text-white sm:mr-6 mr-3 flex items-center justify-center rounded-full"
            onClick={() => handleCreate()}
          >
            <span className="sm:hidden p-2 text-slate-50">
              <Plus className="w-4 h-4" />
            </span>
            <span className="hidden sm:block sm:px-7 sm:py-1.5 sm:text-sm">
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
                  className="flex w-8 h-8 md:w-8 md:h-8 rounded-full text-slate-50 justify-center items-center text-sm tracking-tighter"
                >
                  {user.firstName.substring(0, 1).toUpperCase()}
                  {user.lastName.substring(0, 1).toUpperCase()}
                </div>
              ) : (
                // <CircleUserRound
                //   className="sm:w-11 sm:h-11 text-slate-700 w-9 h-9 mt-0.5 sm:mt-0"
                //   strokeWidth={0.8}
                // />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill=""
                  viewBox="0 0 24 24"
                  className="size-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </PopoverTrigger>
            <PopoverContent className="font-sans text-sm sm:text-base tracking-tight">
              {accessToken ? (
                <div className="flex flex-col gap-2 cursor-pointer">
                  <div className="flex flex-row justify-center items-center gap-2">
                    <User size={14} />
                    <div>{`${user.firstName} ${user.lastName
                      .substring(0, 1)
                      .toUpperCase()}${user.lastName.substring(1)}`}</div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <LogOut size={14} />
                    <div onClick={handleLogout}>Log out</div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row gap-2">
                  <UserPlus className="sm:mt-1 mt-0.5" size={14} />
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

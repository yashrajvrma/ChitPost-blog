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
import { IoBookmarksOutline } from "react-icons/io5";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

const notify = () => toast("Logged out Successfully");
// const comingSoon = () => toast("Coming Soon... I'm coding");
const comingSoon = () => {
  toast.dismiss();
  toast("Coming Soon", {
    icon: "😊",
    duration: 2500,
    style: {
      minWidth: "100px",
    },
    id: "copy-toast-c",
  });
};

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
    toast.dismiss();
    comingSoon();
  };

  const handleCreate = () => {
    navigate("/blog/create");
  };

  const handlePost = () => {
    navigate("/blogs/all");
  };
  const handleSavePost = () => {
    navigate("/blogs/all/saved");
  };

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");

    await persistor.purge();
    // Clear user data from Redux state

    dispatch(
      setUser({
        firstName: "",
        lastName: "",
        profileColor: "",
      })
    );

    notify();
    setTimeout(() => {
      toast.dismiss();
      navigate("/signin");
    }, 1000);
  };

  return (
    <div className="flex flex-row sm:max-w-4xl justify-between sm:px-0 px-4 sm:h-24 h-16 text-slate-100 tracking-tight border-b-2 border-slate-100">
      <div className="flex flex-row justify-center items-center gap-4 sm:gap-8">
        <Link to="/">
          <div className="logo font-sans font-medium text-xl sm:text-3xl text-slate-800 cursor-pointer tracking-tighter">
            ChitPost
          </div>
        </Link>
        <div
          onClick={handleComingSoon}
          className="search-bar flex flex-row justify-start items-center rounded-full bg-slate-50 w-32 sm:w-52 sm:h-10 h-8 hover:cursor-pointer"
        >
          <div className="sm:pl-4 pl-3 sm:pr-1.5 pr-1">
            <Search
              className="w-4 h-4 sm:w-4 sm:h-4"
              color="grey"
              strokeWidth={1}
            />
          </div>
          <input
            className="sm:w-44 w-24 sm:text-base text-sm text-slate-800 px-1 focus:outline-none bg-transparent cursor-pointer "
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
            <span className="sm:hidden p-1.5 text-slate-50">
              <Plus className="h-4 w-4" />
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
                  className="flex w-7 h-7 md:w-8 md:h-8 rounded-full text-slate-50 justify-center items-center  align-middle sm:text-sm text-xs tracking-tighter"
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
                  className="sm:size-10 size-8"
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
                <div className="flex flex-col justify-start gap-2.5 cursor-pointer">
                  <div className="flex flex-row justify-center hover:cursor-text text-slate-600 hover:text-neutral-900 items-center gap-2">
                    <div className="w-4 flex-shrink-0">
                      <User size={16} />
                    </div>
                    <div>{`${user.firstName} ${user.lastName}`}</div>
                  </div>

                  <div className="flex flex-row items-center gap-2 text-slate-600 hover:text-neutral-900">
                    <div className="w-4 flex-shrink-0">
                      {/* <PenLine size={14} /> */}
                      <img src="/assets/images/icons8-article-32.png" />
                    </div>
                    <div onClick={handlePost}>Your Post</div>
                  </div>

                  <div className="flex flex-row items-center gap-2 text-slate-600 hover:text-neutral-900">
                    <div className="w-4 flex-shrink-0">
                      {/* <PenLine size={14} /> */}
                      {/* <img src="../../public/assets/images/icons8-article-32.png" /> */}
                      <IoBookmarksOutline />
                    </div>
                    <div onClick={handleSavePost}>Saved Post</div>
                  </div>

                  <div className="flex flex-row items-center gap-2 text-slate-600 ">
                    <div className="w-4 flex-shrink-0 hover:text-neutral-900">
                      <LogOut size={14} />
                    </div>
                    {/* <div onClick={handleLogout}>Log out</div> */}
                    {/* dialog btn */}
                    <AlertDialog>
                      <AlertDialogTrigger className="hover:text-red-500">
                        Log out
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. You will get logged
                            out from this device.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="hover:bg-slate-50">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="text-slate-800 bg-red-500 hover:text-slate-100"
                            onClick={handleLogout}
                          >
                            Logout
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row gap-2 items-center align-middle">
                  <UserPlus className="mb-0.5" size={16} />
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
        containerClassName="font-sans px-0 text-sm sm:text-base"
        position="top-center"
        toastOptions={{
          icon: "😔",
          duration: 1000,
          style: {
            minWidth: "100px",
          },
        }}
      />
    </div>
  );
};

export default NavBar;

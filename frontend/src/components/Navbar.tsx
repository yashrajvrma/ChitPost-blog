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

const notify = () => toast("Logged out Successfully");

const NavBar = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const handleSignup = () => {
    navigate("/signup");
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
    <div className="flex flex-row justify-between sm:px-10 px-4 h-20  text-slate-100 font-sans tracking-tight border-b-2 border-slate-100">
      <div className="flex flex-row justify-center items-center gap-4 sm:gap-8">
        <Link to="/">
          <div className="logo text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-tighter cursor-pointer">
            Medium
          </div>
        </Link>
        <div className="search-bar flex flex-row justify-start items-center rounded-full bg-slate-50 w-36 sm:w-64 sm:h-12 h-9">
          <div className="sm:pl-4 pl-3 sm:pr-2 pr-1">
            <Search
              className="w-5 h-5 sm:w-7 sm:h-7"
              color="grey"
              strokeWidth={1}
            />
          </div>
          <input
            className="sm:w-44 w-24 sm:text-base text-sm text-slate-800 px-1 pb-3 focus:outline-none bg-transparent"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      <Popover>
        <PopoverTrigger>
          {user.profileColor ? (
            <div
              style={{ backgroundColor: user.profileColor }}
              className="flex w-8 h-8 md:w-11 md:h-11 rounded-full text-slate-50 justify-center items-center text-base tracking-wide"
            >
              {user.firstName.substring(0, 1).toUpperCase()}
              {user.lastName.substring(0, 1).toUpperCase()}
            </div>
          ) : (
            <img
              src="../../public/assets/images/icons8-test-account-64.png"
              className="profile-picture w-10 sm:w-11 rounded-full"
            />
          )}
        </PopoverTrigger>
        <PopoverContent className="font-sans text-base font-medium tracking-tight">
          {accessToken ? (
            <div className="flex flex-col gap-2 cursor-pointer">
              <div className="flex felx-row gap-2">
                <User size={19} />
                <div className="text-lg">{`${user.firstName} ${user.lastName
                  .substring(0, 1)
                  .toUpperCase()}${user.lastName.substring(1)}`}</div>
              </div>
              <div className="flex felx-row gap-2">
                <LogOut size={18} />
                <div className="text-lg" onClick={handleLogout}>
                  Log out
                </div>
              </div>
            </div>
          ) : (
            <div className="flex felx-row gap-2">
              <UserPlus size={18} />
              <div className="text-lg cursor-pointer" onClick={handleSignup}>
                Create account
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
      <Toaster
        containerClassName="text-lg font-sans"
        position="top-center"
        toastOptions={{
          icon: "😔",
          duration: 1000,
          style: {
            minWidth: "250px",
          },
        }}
      />
    </div>
  );
};

export default NavBar;

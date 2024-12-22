import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { LogOut } from "lucide-react";
import { UserRoundPlus } from "lucide-react";
import { Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("Logged out Successfully");

const NavBar = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
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
          <div>
            <input
              className="sm:w-44 w-24 sm:text-lg text-sm text-slate-800 p-1 focus:outline-none bg-transparent"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      <Popover>
        <PopoverTrigger>
          <img
            src="../../public/assets/images/icons8-test-account-64.png"
            className="profile-picture w-10 sm:w-11 rounded-full"
          />
        </PopoverTrigger>
        <PopoverContent className="font-sans text-base font-medium tracking-tight">
          {accessToken ? (
            <div className="flex flex-col gap-2 cursor-pointer">
              <div className="flex felx-row gap-2">
                <div className="pt-0.5">
                  <User size={19} />
                </div>
                <div className="text-lg">Hitler Swastik</div>
              </div>
              <div className="flex felx-row gap-2">
                <div className="pt-1">
                  <LogOut size={18} />
                </div>
                <div className="text-lg" onClick={() => handleLogout()}>
                  Log out
                </div>
              </div>
            </div>
          ) : (
            <div className="flex felx-row gap-2">
              <div className="pt-1">
                <UserRoundPlus size={18} />
              </div>
              <div
                className="text-lg cursor-pointer"
                onClick={() => handleSignup()}
              >
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

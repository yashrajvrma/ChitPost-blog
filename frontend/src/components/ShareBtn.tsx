import { GoShare } from "react-icons/go";
import toast from "react-hot-toast";
import { Link } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

const handleClick = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
  console.log("from sharebtn");
  toast.dismiss();
  // toast("Copied to Clipboard!", { id: "copy-toast-a" });
  toast("Copied to Clipboard!", {
    icon: "✅",
    duration: 2500,
    style: {
      minWidth: "100px",
    },
    id: "copy-toast-a",
  });
};

function ShareBtn() {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="hover:text-slate-900 text-neutral-500 hover:cursor-pointer">
          <GoShare size="1.2em" strokeWidth={0} />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-row gap-2 hover:cursor-pointer items-center align-middle">
          <div className="text-neutral-700 hover:text-slate-900">
            <Link size={16} strokeWidth={1.4} />
          </div>
          <div
            onClick={() => handleClick()}
            className="text-neutral-600 hover:text-slate-900 items-center flex sm:text-base text-sm"
          >
            Copy link
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ShareBtn;

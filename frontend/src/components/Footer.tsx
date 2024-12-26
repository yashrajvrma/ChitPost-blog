import { Copyright } from "lucide-react";

function Footer() {
  return (
    <div className="footer flex flex-row justify-between items-center border-slate-100 text-slate-600 border-t-2 gap-2 py-10">
      <div className="flex flex-row items-center gap-1.5 font-semibold">
        <span>
          <Copyright size={14} strokeWidth={2} />
        </span>
        2024 Copywright
      </div>
      <div>
        Made by{" "}
        <span className="font-semibold">
          <a href="https://x.com/yashrajvrma" target="blank">
            Yashraj Verma
          </a>
        </span>{" "}
      </div>
    </div>
  );
}

export default Footer;

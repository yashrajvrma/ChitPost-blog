import { Copyright } from "lucide-react";

function Footer() {
  return (
    <div className="footer flex flex-row justify-between items-center border-t-2 border-slate-100 sm:max-w-5xl max-w-2xl gap-2 py-10">
      <div className="flex flex-row items-center gap-1.5 font-semibold">
        <span>
          <Copyright size={16} strokeWidth={2} />
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

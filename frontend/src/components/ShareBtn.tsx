import { GoShare } from "react-icons/go";

function ShareBtn() {
  const handleShareBtn = () => {
    console.log(window.location.href);
  };
  return (
    <div
      onClick={() => handleShareBtn()}
      className="hover:text-slate-900 text-neutral-500 hover:cursor-pointer"
    >
      <GoShare size="1.5em" strokeWidth={0} />
    </div>
  );
}

export default ShareBtn;

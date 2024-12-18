import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/signin");
  };
  return (
    <>
      <div className="body h-screen flex-col grid md:grid md:grid-cols-2">
        <div className="signup-section flex flex-col justify-center items-center font-sans mt-20 mb-20 px-10">
          <div className="text-4xl font-extrabold font-sans tracking-tight">
            Create an account
          </div>
          <div className="text-lg text-slate-500 font-medium mt-2 mb-10">
            Already have an account?{" "}
            <span className="underline cursor-pointer " onClick={handleLogin}>
              Login
            </span>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1 mb-3">
            <Label className="text-lg font-semibold" htmlFor="firstName">
              FirstName
            </Label>
            <Input
              type="firstName"
              id="firstName"
              placeholder="Enter your firstname"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1 mb-3">
            <Label className="text-lg font-semibold" htmlFor="lastname">
              Lastname
            </Label>
            <Input
              type="lastname"
              id="lastname"
              placeholder="Enter your lastname"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1 mb-3">
            <Label className="text-lg font-semibold" htmlFor="email">
              Email
            </Label>
            <Input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1 mb-3">
            <Label className="text-lg font-semibold" htmlFor="password">
              Password
            </Label>
            <Input type="password" id="password" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1 mt-2">
            <Button>Button</Button>
          </div>
        </div>
        <div className="quote-section bg-slate-100 flex flex-col justify-center text-3xl md:text-4xl font-sans font-extrabold tracking-tight md:px-32 px-16 ">
          <div className="mb-20 mt-20">
            <div className="flex justify-center items-center">
              "The customer service I received was exceptional. The support team
              went above and beyond to address my concerns."
            </div>
            <div className="flex flex-col">
              <div className="mt-3 text-2xl font-semibold">Jules Winnfield</div>
              <div className="text-lg text-slate-400 font-normal">
                CEO, Acme Inc
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const handleRegistration = async (data: SignupFormValues) => {
    try {
      console.log("data is" + data);
      const response = await axios.post(url, data);
      console.log("response is" + response);
      navigate("/");
    } catch (error) {}
  };

  const registerOptions = {
    firstName: { required: "Firstname is required" },
    lastName: { required: "Lastname is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be atleast 6 character",
      },
    },
  };

  const handleLogin = () => {
    navigate("/signin");
  };
  return (
    <>
      <div className="body h-screen flex-col grid md:grid md:grid-cols-2">
        {/* Signup section */}
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
          <form onSubmit={handleSubmit(handleRegistration)}>
            <div className="grid w-full max-w-sm items-center gap-1 mb-3">
              <Label className="text-lg font-semibold" htmlFor="firstName">
                FirstName
              </Label>
              <Input
                // name="firstName"
                type="text"
                {...register("firstName", registerOptions.firstName)}
                placeholder="Enter your firstname"
              />
              <small className="text-danger">
                {errors?.firstName && errors.firstName.message}
              </small>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1 mb-3">
              <Label className="text-lg font-semibold" htmlFor="lastname">
                Lastname
              </Label>
              <Input
                type="text"
                // name="lastname"
                {...register("lastName", registerOptions.lastName)}
                placeholder="Enter your lastname"
              />
              <small className="text-danger">
                {errors?.lastName && errors.lastName.message}
              </small>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1 mb-3">
              <Label className="text-lg font-semibold" htmlFor="email">
                Email
              </Label>
              <Input
                type="email"
                // name="email"
                {...register("email", registerOptions.email)}
                placeholder="Enter your email"
              />
              <small className="text-danger">
                {errors?.email && errors.email.message}
              </small>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1 mb-3">
              <Label className="text-lg font-semibold" htmlFor="password">
                Password
              </Label>
              <Input
                type="password"
                // name="password"
                {...register("password", registerOptions.password)}
              />
              <small className="text-danger">
                {errors?.password && errors.password.message}
              </small>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1 mt-2">
              <Button>Button</Button>
            </div>
          </form>
        </div>
        {/* Quote section */}
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

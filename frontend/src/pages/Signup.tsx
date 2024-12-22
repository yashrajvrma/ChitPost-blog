import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
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
    const apiCall = axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/signup`,
      data
    );

    toast.promise(
      apiCall,
      {
        loading: "Waiting for the response...",
        success: (response) =>
          response.data.message || "Registration done successfully!",
        error: (error) => "Signup failed. Please try again.",
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 1000,
          icon: "✅",
        },
        error: {
          duration: 1000,
          icon: "❌",
        },
      }
    );

    try {
      const response = await apiCall;
      if (response.data.success) {
        localStorage.setItem("accessToken", response.data.token);
        console.log(response.data.message);
        setTimeout(() => {
          toast.dismiss();
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
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
          <div className="text-lg text-slate-500 font-medium mt-2.5 mb-10">
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
              <Button className="text-md">Sign Up</Button>
              <Toaster containerClassName="text-lg font-sans" />
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

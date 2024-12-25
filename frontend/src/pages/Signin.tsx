import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../feature/userSlice";

interface SigninFormValues {
  email: string;
  password: string;
}

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>();

  const registerOptions = {
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  };

  const handleRegistration = async (data: SigninFormValues) => {
    const apiCall = axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/signin`,
      data
    );

    toast.promise(
      apiCall,
      {
        loading: "Waiting for the response...",
        success: (response) =>
          response.data.message || "Logged in successfully!",
        error: "Login failed. Please try again.",
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
        const { user, token } = response.data;

        // Dispatch action to set user details in Redux state
        dispatch(
          setUser({
            firstName: user.firstName,
            lastName: user.lastName,
            profileColor: user.profileColor,
          })
        );

        // Save the token in localStorage
        localStorage.setItem("accessToken", token);

        // Navigate after successful login
        setTimeout(() => {
          toast.dismiss();
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogin = () => {
    navigate("/signup");
  };

  return (
    <div className="body h-screen flex-col grid md:grid md:grid-cols-2">
      <div className="signup-section flex flex-col justify-center items-center font-sans mt-20 mb-20 px-10">
        <div className="text-4xl font-extrabold font-sans tracking-tight">
          Login to your account
        </div>
        <div className="text-lg text-slate-500 font-medium mt-2.5 mb-10">
          Don't have an account?{" "}
          <span className="underline cursor-pointer" onClick={handleLogin}>
            Signup
          </span>
        </div>
        <form onSubmit={handleSubmit(handleRegistration)}>
          <div className="grid w-full max-w-sm items-center gap-1 mb-3">
            <Label className="text-lg font-semibold" htmlFor="email">
              Email
            </Label>
            <Input
              type="email"
              {...register("email", registerOptions.email)}
              id="email"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1 mb-3">
            <Label className="text-lg font-semibold" htmlFor="password">
              Password
            </Label>
            <Input
              type="password"
              {...register("password", registerOptions.password)}
              id="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1 mt-2">
            <Button className="text-md">Sign in</Button>
            <Toaster containerClassName="text-lg font-sans" />
          </div>
        </form>
      </div>
      <div className="quote-section bg-slate-100 flex flex-col justify-center text-3xl md:text-4xl font-sans font-extrabold tracking-tight md:px-32 px-16">
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
  );
}

export default Signin;

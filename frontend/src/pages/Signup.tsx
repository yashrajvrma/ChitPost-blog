function Signup() {
  return (
    <>
      <div className="body h-screen grid grid-cols-2">
        <div className="signup-section flex flex-col justify-center items-center font-dm-sans">
          <div className="text-3xl font-extrabold">Create an account</div>
          <div>
            Already have an account?<span>Login</span>
          </div>
          <div className="user-input">
            <div>Firstname</div>
            <div>
              <input type="text" placeholder="Enter your firstname" />
            </div>
          </div>
          <div className="user-input">
            <div>LastName</div>
            <div>
              <input type="text" placeholder="Enter your lastname" />
            </div>
          </div>
          <div className="user-input">
            <div>Email</div>
            <div>
              <input type="text" placeholder="abc@example.com" />
            </div>
          </div>
          <div className="user-input">
            <div>Password</div>
            <div>
              <input type="password" placeholder="Enter your username" />
            </div>
          </div>
          <div>
            <button className="bg-slate-950 text-slate-200 text-xl">
              Sign Up
            </button>
          </div>
        </div>
        <div className="quote-section bg-slate-100 flex flex-col justify-center text-3xl font-dm-sans font-extrabold tracking-tight px-32">
          <div className="flex justify-center items-center ">
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
    </>
  );
}

export default Signup;

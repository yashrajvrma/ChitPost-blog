import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Children {
  children: ReactNode;
}

function UserAuth({ children }: Children) {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
      return;
    }
  }, [accessToken]);

  return <>{children}</>;
}

export default UserAuth;

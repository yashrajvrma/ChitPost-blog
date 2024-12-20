import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Children {
  children: ReactNode;
}

function GuestOnly({ children }: Children) {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      navigate("/");
      return;
    }
  }, [accessToken]);

  return <>{children}</>;
}

export default GuestOnly;

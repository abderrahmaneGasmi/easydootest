import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthContextType } from "../../context/authProvider";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { ToastContextType } from "../../context/toast/toast";
import { useToast } from "../../hooks/useToast";
export default function Home() {
  const { toggleToast }: ToastContextType = useToast();

  // check if localStorage auth token exists
  // if not, redirect to login page
  const [fromdata, setFromdata] = useState({
    username: "",
    password: "",
  });
  const { checkAuth, login }: AuthContextType = useAuth();
  const router = useRouter();
  useEffect(() => {
    toggleToast("Welcome to the login page", "success");
    if (checkAuth()) {
      router.push("/");
    } else {
    }
  }, []);
  const handleLogin = () => {
    if (fromdata.username && fromdata.password) {
      login(fromdata);
    }
  };
  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center gap-4"
      style={{
        backgroundImage: `linear-gradient(
    to right top,
    #d2e0f5,
    #ccdff2,
    #c7ddef,
    #c2dceb,
    #bedae7
  )`,
      }}
    >
      {/* <div className="text-6xl font-bold text-indigo-600">Logo</div> */}
      <div className="w-3/12  bg-white flex flex-col items-center gap-4 px-20 py-12 shadow-xl rounded-md">
        <div className="text-2xl font-bold text-gray-800 py-12">
          Connecter vous à votre compte !
        </div>
        <div className="w-full flex flex-col gap-4">
          <label className="text-gray-600 text-xl font-bold ">
            {`Nom d'utilisateur`}
          </label>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            className="w-full h-16 border border-gray-300 rounded-md px-4 text-xl"
            onChange={(e) =>
              setFromdata({ ...fromdata, username: e.target.value })
            }
            value={fromdata.username}
          />
          <label className="text-gray-600 text-xl font-bold ">
            {`Mot de passe`}
          </label>
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full h-16 border border-gray-300 rounded-md px-4 text-xl"
            onChange={(e) =>
              setFromdata({ ...fromdata, password: e.target.value })
            }
            value={fromdata.password}
          />
          <button
            className="w-full bg-indigo-600 text-white rounded-md text-2xl font-bold py-4"
            onClick={handleLogin}
          >
            Login
          </button>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Svg from "../Svg";
import { user } from "../../utils/Svgs";
import { AuthContextType } from "../../context/authProvider";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";

export default function Header() {
  const { checkAuth }: AuthContextType = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!checkAuth()) {
      router.push("/auth");
    } else {
    }
    document.addEventListener("click", (e) => {
      if (!(e.target as HTMLElement).classList.contains("dropdown")) {
        setDropdown(false);
      }
    });

    return () => {
      document.removeEventListener("click", (e) => {
        if (!(e.target as HTMLElement).classList.contains("dropdown")) {
          setDropdown(false);
        }
      });
    };
  }, []);

  return (
    <div className="flex w-full h-30 bg-white text-gray-700 border-b p-4 items-center justify-between">
      <Link className="flex items-center gap-2" href="/">
        <Image src="/logo.png" alt="logo" width={70} height={200} />
        <h1 className="text-3xl font-bold">Easydoo -Test Project</h1>
      </Link>
      <div className="relative dropdown">
        <div
          className="flex items-center gap-2 bg-gray-200 p-4  rounded-md cursor-pointer dropdown"
          onClick={() => setDropdown(!dropdown)}
        >
          <Svg
            path={user.path}
            view={user.viewBox}
            classlist="w-8 h-8 text-gray-700 fill-current dropdown"
          />
          <div className="text-2xl font-bold text-gray-700 dropdown">User</div>
        </div>
        {dropdown && (
          <div className="absolute right-0 top-100 left-0 z-50 dropdown">
            <div className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100 cursor-pointer">
              <div className="flex flex-col gap-2">
                <div className="text-2xl font-bold text-gray-700 dropdown">
                  Logout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

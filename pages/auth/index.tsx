import { redirect } from "next/navigation";
export default function Home() {
  // check if localStorage auth token exists
  // if not, redirect to login page

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
          />
          <label className="text-gray-600 text-xl font-bold ">
            {`Mot de passe`}
          </label>
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full h-16 border border-gray-300 rounded-md px-4 text-xl"
          />
          <button className="w-full bg-indigo-600 text-white rounded-md text-2xl font-bold py-4">
            Login
          </button>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

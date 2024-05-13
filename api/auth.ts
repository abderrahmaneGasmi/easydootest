export async function loginApi(userData: {
  username: string;
  password: string;
}) {
  let endpoint = process.env.api || "https://fakestoreapi.com";
  return fetch(endpoint + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((data) => data);
}

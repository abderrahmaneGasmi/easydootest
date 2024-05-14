export async function readStream(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  let result = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += new TextDecoder().decode(value);
  }
  return result;
}
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
    .then((res) => res.body)
    .then((body) => readStream(body as ReadableStream<Uint8Array>));
  // .then((data) => data)
}

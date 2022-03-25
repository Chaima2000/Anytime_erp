import axios from "axios";

export function logout() {
  axios.post("/logout").then((res) => {
    if (!res.data.connected) {
      alert("DISCONNECTED");
    }
  });
}
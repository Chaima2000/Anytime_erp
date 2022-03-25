export function getUrl() {
  return process.env.NODE_ENV === "production" ? "" : "http://localhost:3001";
}

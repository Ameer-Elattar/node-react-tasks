import axios from "axios";

const BaseURL = "https://api.pexels.com/v1/search?query=nature";

const getAllImages = () =>
  axios.get(BaseURL, {
    headers: {
      authorization: "axeFZ8cEbOt2MseHYlk0uBZTS3agekL165h3vecx9eje5ncDQuJHDpZL",
    },
  });

export { getAllImages };

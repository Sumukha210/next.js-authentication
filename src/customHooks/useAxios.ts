import axios from "axios";
import useStore from "../context/store";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";

const useAxios = () => {
  const accessToken = useStore(s => s.accessToken);
  const setAccessToken = useStore(s => s.setAccessToken);
  const baseURL = "/api";
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  axiosInstance.interceptors.request.use(async req => {
    if (!accessToken) {
      return req;
    }

    const decodedToken: any = jwtDecode(accessToken);
    const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/auth/refresh_token/`, {
      refresh: accessToken,
    });

    if (response.data.status === "success") {
      setAccessToken(response.data.accessToken);
    } else {
      setAccessToken(null);
    }

    req.headers!.Authorization = `Bearer ${response.data.access}`;

    return req;
  });

  return axiosInstance;
};

export default useAxios;

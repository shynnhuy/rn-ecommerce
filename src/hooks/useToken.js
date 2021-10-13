import { useEffect, useState } from "react";
import { getAccessToken } from "~app/utils";

export const useToken = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const getToken = async () => {
      try {
        const storageToken = await getAccessToken();
        console.log("token", storageToken);
        if (storageToken) {
          setToken(storageToken);
        } else {
          setToken(null);
        }
      } catch (error) {
        console.log(error);
        setToken(null);
      }
    };
    getToken();
  });
  return [token];
};

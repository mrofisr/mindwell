import firebase_app from "@/src/firebase/config";
import { getAuth } from "firebase/auth";
import Cookies from "js-cookie";

// export const getUserFromCookie = () => {
//   const cookie = Cookies.get();
//   if (!cookie) {
//     return;
//   }
//   return JSON.parse(cookie);
// };

export const getUserFromCookie = (req) => {
  const cookie = req.headers.cookie ? req.headers.cookie.split(';').find(c => c.trim().startsWith('auth=')) : null;
  if (!cookie) {
    console.log("Cookie not found");
    return null;
  }
  return cookie;
};

export const setUserCookie = (data) => {
  Cookies.set("auth", data, {
    expires: 1 / 12,
  });
};

export const checkUserCookie = () => {
  const userCookie = getUserFromCookie();
  const auth = getAuth(firebase_app);
  if (!userCookie || !auth.currentUser) {
    return false;
  } else {
    return true;
  }
};

export const removeUserCookie = () => Cookies.remove("auth");

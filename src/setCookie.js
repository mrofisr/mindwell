import cookies from "js-cookie";
import firebase_app from "@/src/firebase/config";
import { getAuth } from "firebase/auth";

export const getUserFromCookie = () => {
  const cookie = cookies.get("auth");
  if (!cookie) {
    return;
  }
  return JSON.parse(cookie);
};

export const setUserCookie = (data) => {
  cookies.set("auth", data, {
    expires: 1 / 24,
  });
};

export const checkUserCookie = () => {
  const userCookie = getUserFromCookie();
  const auth = getAuth(firebase_app);
  if (!userCookie) {
    auth.signOut();
  }
};

export const removeUserCookie = () => cookies.remove("auth");

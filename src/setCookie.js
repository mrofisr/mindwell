import firebase_app from "@/src/firebase/config";
import { getAuth } from "firebase/auth";
import Cookies from "js-cookie";
import { cookies } from 'next/headers';

export const getUserFromCookie = () => {
  const cookieStore = cookies();
  const auth = cookieStore.get('auth');
  console.log(auth);
  if (!auth) {
    return;
  }
  return JSON.parse(auth);
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

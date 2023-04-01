import cookies from "js-cookie";

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

export const removeUserCookie = () => cookies.remove("auth");

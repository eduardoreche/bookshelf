import { auth } from "../../firebase";

export const getUrl = async (collection: string, complement?: string) => {
  const baseUrl = process.env.REACT_APP_FIREBASE_DATABASE_URL;
  const token = await auth.currentUser?.getIdToken();

  let url = `${baseUrl}/${collection}/${auth.currentUser?.uid}`;

  if (complement) url += `/${complement}`;

  url += `.json?auth=${token}`;

  return url;
};

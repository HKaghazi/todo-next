import { customAlphabet } from "nanoid";
import classnames from "classnames";
import { ReadonlyURLSearchParams } from "next/navigation";
import { NextRequest } from "next/server";

export const cn = classnames;

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

export const parse = (req: NextRequest) => {
  let domain = req.headers.get("host") as string;
  domain = domain.replace("www.", ""); // remove www. from domain

  // path is the path of the URL (e.g. dub.co/stats/github -> /stats/github)
  const path = req.nextUrl.pathname;

  // fullPath is the full URL path (along with search params)
  const searchParams = req.nextUrl.searchParams.toString();
  const fullPath = `${req.nextUrl.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // Here, we are using decodeURIComponent to handle foreign languages like Hebrew
  const key = decodeURIComponent(path.split("/")[1]); // key is the first part of the path (e.g. dub.co/stats/github -> stats)
  const fullKey = decodeURIComponent(path.slice(1)); // fullKey is the full path without the first slash (to account for multi-level subpaths, e.g. dub.sh/github/repo -> github/repo)

  return { domain, path, fullPath, key, fullKey };
};

export const setQueryString = ({
  router,
  pathname,
  searchParams,
  param,
  value,
}: {
  router: any;
  pathname: string | null;
  searchParams: ReadonlyURLSearchParams | null;
  param: string;
  value: string;
}) => {
  const newParams = new URLSearchParams(searchParams as any);
  if (!value || value.length == 0) {
    newParams.delete(param);
  } else {
    newParams.set(param, String(value));
  }

  router.push(pathname + "?" + newParams.toString());
};

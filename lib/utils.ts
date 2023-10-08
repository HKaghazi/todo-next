import { customAlphabet } from "nanoid";
import classnames from "classnames";

export const cn = classnames;

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

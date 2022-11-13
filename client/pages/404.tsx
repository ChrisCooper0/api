import { useEffect } from "react";
import Router from "next/router";

const Custom404 = () => {
  useEffect(() => {
    Router.push("/");
  });
  return null;
};

export default Custom404;

/* eslint-disable no-unused-vars */
import { Navigate, useRouteError } from "react-router-dom";
const Error = () => {
  const error = useRouteError();
  return (
    <div className="text-center">
      <h1 className="text-3xl">Oops!!!!</h1>
      <h2 className="text-4xl py-2">Spmethings went wrong!! </h2>
      <h3 className="text-5xl py-2">{error?.statusText}</h3>
    </div>
  );
};

export default Error;

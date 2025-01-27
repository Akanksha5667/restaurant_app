import React from "react";
import { Link } from "react-router";
export default function PageNotFound() {
  return (
    <div className="pageNotFound">
      <h1>404</h1>
      <h2>File Not Found</h2>
      <p>
        The site configured at this address does not contain the requested file.
      </p>
      <p>
        If this is your site, make sure that the filename case matches the URL
        as well as any file permissions.
      </p>
      <Link to="/login">Go Back to Dashboard Page</Link>
    </div>
  );
}

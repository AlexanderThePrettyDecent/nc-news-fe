import "./errorPage.css";

const ErrorPage = ({ error, type }) => {
  if (error.status === 404) {
    return (
      <h1 id="errorMessage">
        {error.status} {type} {error.msg}
      </h1>
    );
  } else {
    return (
      <h1 id="errorMessage">
        {error.status} {error.msg}
      </h1>
    );
  }
};

export default ErrorPage;

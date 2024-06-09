import { NavLink } from "react-router-dom";

export function NotFound() {
  const divStyle = {
    display: "flex",
    "flex-direction": "column",
    // "justify-content": "center",
    "align-items": "center",
    "margin-top": "20px",
  };
  const imgStyle = {
    width: "400px",
    height: "400px",
    "text-align": "center",
  };
  return (
    <>
      <div style={divStyle}>
        <img
          src="https://premierecreative.com/pitchdeck/2019/10/404-errors-1024x574.png"
          alt="Not-Found-Page"
          style={imgStyle}
        />
        <NavLink to="/" style={{ marginTop: "30px" }}>
          Back to Home Page
        </NavLink>
      </div>
    </>
  );
}

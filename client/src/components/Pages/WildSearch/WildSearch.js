import React from "react";

function WildSearch() {
  return (
    <>
      <div
        style={{
          padding: "4.8rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          letterSpacing: "0.5px",
        }}
      >
        <h1>Invalid Path</h1>{" "}
        <h2>Please check the url, the page does not exist on this server</h2>
      </div>
    </>
  );
}

export default WildSearch;

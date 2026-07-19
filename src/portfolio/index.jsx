import React from "react";
import { createRoot } from "react-dom/client";
import { FinalPortfolioApp } from "./FinalApp.jsx";

const rootNode = document.getElementById("portfolio-root");
const dataNode = document.getElementById("portfolio-data");

if (!rootNode || !dataNode) {
  throw new Error("Portfolio root or data is missing.");
}

const serializedData = JSON.parse(dataNode.textContent);
const data = typeof serializedData === "string" ? JSON.parse(serializedData) : serializedData;
createRoot(rootNode).render(<FinalPortfolioApp data={data} />);

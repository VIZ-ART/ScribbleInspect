import React, { useState } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useSelector } from "react-redux";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { prevResults } = useSelector((store) => store.stats);
  return (
    <Wrapper>
      <h4>Previous Results</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? (
        <BarChart data={prevResults} />
      ) : (
        <AreaChart data={prevResults} />
      )}
    </Wrapper>
  );
};
export default ChartsContainer;

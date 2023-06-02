import React, { useEffect } from "react";
import { StatsContainer, Loading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../features/stats/statsSlice";

const Stats = () => {
  const { isLoading } = useSelector((store) => store.stats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStats());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
    </>
  );
};

export default Stats;

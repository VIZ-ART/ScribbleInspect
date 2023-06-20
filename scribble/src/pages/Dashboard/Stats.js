import React, { useEffect } from "react";
import { StatsContainer, Loading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../features/stats/statsSlice";
import ChartsContainer from "../../components/ChartsContainer";

const Stats = () => {
  const { isLoading, prevResults } = useSelector((store) => store.stats);
  const { isTeacher } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStats());
  }, []);

  if (isLoading) return <Loading center />;

  return (
    <>
      <StatsContainer isTeacher={isTeacher} />
      {prevResults.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Wrapper from "../assets/wrappers/ProgressWheel";

const progressStyles = buildStyles({
  pathColor: "#3B82F6",
  textColor: "#3B82F6",
});

const ProgressWheel = ({ value, maxValue }) => {
  return (
    <Wrapper>
      <CircularProgressbar
        value={Math.round((value / maxValue) * 100)}
        text={`${value}/${maxValue}`}
        styles={progressStyles}
        className="progress-wheel"
      />
    </Wrapper>
  );
};

export default ProgressWheel;

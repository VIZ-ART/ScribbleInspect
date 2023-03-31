import { useState } from "react";
import TextRow from "../../components/TextRow";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((store) => store.user);

  const [userData, setUserData] = useState({
    userName: user?.name || "",
    email: user?.email || "",
    userType: user?.user_type || "",
  });

  const { userName, email, userType } = userData;

  return (
    <Wrapper>
      <div className="form">
        <h3>Profile</h3>
        <div className="form-center">
          <TextRow type="name" name="name" value={userName} />
          <TextRow type="email" name="email" value={email} />
          <TextRow type="user" name="user" value={userType} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;

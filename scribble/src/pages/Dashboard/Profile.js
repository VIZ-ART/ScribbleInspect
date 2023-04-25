import { useState } from "react";
import FormRow from "../../components/FormRow";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <Wrapper>
      <div className="form">
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow
            type="name"
            name="name"
            value={user?.userName}
            disabled={true}
          />
          <FormRow
            type="email"
            name="email"
            value={user?.email}
            disabled={true}
          />
          <FormRow
            type="user"
            name="user"
            value={user?.userType}
            disabled={true}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;

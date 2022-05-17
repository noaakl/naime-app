import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Feedback from "feeder-react-feedback";
import "feeder-react-feedback/dist/feeder-react-feedback.css";

const UserFeedback = () => {
  const email = useSelector((state) => state.reduser.email);
  return (
    <Feedback projectName="nAIme" email={true} emailDefaultValue={email} projectId="6283f296e9d2bc0004662ce3" primaryColor="rgb(158, 160, 143)" />
    );
  }

  //link to see feedback: https://feeder.sh/project/6283f296e9d2bc0004662ce3

export default UserFeedback;

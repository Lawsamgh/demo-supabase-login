import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { session, signOut } = UserAuth();

  console.log(session);
  return (
    <div className="Dashboard">
      <h1 className="text-white">Dashboard</h1>
    </div>
  );
};

export default Dashboard;

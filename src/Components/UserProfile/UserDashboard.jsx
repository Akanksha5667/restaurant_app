import React, { useState } from "react";
import { motion } from "motion/react";
import Header from "../Header";
import Orders from "./Orders";
import Profile from "./Profile";
const sections = [
  { id: "profile", label: "Profile", icon: <i class="fa-solid fa-user"></i> },
  { id: "orders", label: "Orders", icon: <i class="fa-solid fa-box"></i> },
];

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div>
      <Header />
      <div className="profile-dashboard-outer">
        <div className="min-h-screen bg-gray-100 flex profile-dashboard-div">
          {/* Sidebar */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-64 bg-white shadow-xl p-5 side-navbar"
          >
            <ul>
              {sections.map((section) => (
                <div className="sidebar-item">
                  <li
                    key={section.id}
                    className={`flex items-center space-x-3 p-3 mb-3 rounded-lg cursor-pointer ${
                      activeSection === section.id
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.icon}
                    <span className="sidebar-name">{section.label}</span>
                  </li>
                </div>
              ))}
            </ul>
          </motion.div>

          {/* Content Area */}
          <div className="flex-1 p-10 content-div">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white content shadow-md rounded-lg p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {sections.find((s) => s.id === activeSection).label}
              </h2>

              {/* Display Section Content */}
              {activeSection === "profile" && <Profile />}
              {activeSection === "orders" && <Orders />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dummy Content Components
// const ProfileContent = () => <p>Manage your profile details here.</p>;
// const OrdersContent = () => (
//   <p>View your past orders and track current ones.</p>
// );

export default UserDashboard;

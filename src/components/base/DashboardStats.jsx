import { Card, CardContent } from "../ui/card";
import StatGreen from "../../assets/icons/stats.svg";
import StatRed from "../../assets/icons/stat-red.svg";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import BgImage from "../../assets/images/Vector.png"; // <-- your background image

const DashboardStats = ({ stats, route }) => {
  // Default stats
  const defaultStats = [
    { label: "Total Transactions", value: "45,823", change: "+20%", subtext: "80,000 Last 24 hours" },
    { label: "Total Transaction Volume", value: "₦4,005,823", change: "-10%", subtext: "₦80,000 in last 24 hours" },
    { label: "Total Revenue", value: "₦1,070,823", change: "-20%", subtext: "₦80,000 in last 24 hours" },
    { label: "Success Rate", value: "90%", change: "+19%", subtext: "24 % out of 24 hours" }
  ];

  let statsToDisplay = stats || defaultStats;

  const userRole = localStorage.getItem("userRole") || "admin";

  // ---------------------------
  // 1️⃣ GET DATA FOR CUSTOM CARD
  // ---------------------------
  const getCustomFirstCard = () => {
    if (route === "my-earnings") {
      return {
        label: "My Earnings",
        value: stats[0]?.value || "₦0",
        change: "",
        subtext: stats[0]?.subtext || "₦0 in last 24 hours"
      };
    }

    switch (userRole) {
      case "agent":
      case "aggregator":
      case "aggregator_manager":
        return {
          label: "Your Earnings",
          value: "₦1,570,823",
          change: "",
          subtext: "₦100,000 in last 24 hours"
        };

      default:
        return statsToDisplay[0];
    }
  };

  // Replace first card's DATA
  statsToDisplay = [getCustomFirstCard(), ...statsToDisplay.slice(1)];

  // ---------------------------
  // 2️⃣ RENDER CUSTOM CARD JSX
  // ---------------------------
  const renderCustomFirstCard = (stat) => {
  const [show, setShow] = useState(false);

  return (
    <Card
      className="relative overflow-hidden h-full bg-[#26C8B9]"
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right center",  
        backgroundSize: "auto 100%",       
      }}
    >

      <CardContent className="p-4">

        {/* Content */}
        <div className="relative z-10">
          <span className="text-sm font-urbanist font-medium text-white/70">
            {stat.label}
          </span>

          <div className="flex items-center gap-2 mt-2 mb-1">
            <div className="text-[32px] font-semibold font-general text-white">
              {show ? stat.value : "••••••"}
            </div>

            {/* Eye toggle */}
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="text-white/80 hover:text-white"
            >
              {show ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {stat.subtext && (
            <div className="text-xs font-urbanist font-medium text-white/70">
              {stat.subtext}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};


  // ---------------------------
  // 3️⃣ SUPPORT FUNCTIONS
  // ---------------------------

  const getChangeColor = (change) =>
    change?.startsWith("+") ? "text-green-500" : "text-red-500";

  const renderStatIcon = (change) =>
    change?.startsWith("+") ? (
      <img src={StatGreen} alt="stat" className={`w-4 h-4 ${getChangeColor(change)}`} />
    ) : (
      <img src={StatRed} alt="stat" className={`w-4 h-4 ${getChangeColor(change)}`} />
    );

  const getBgColor = (change) =>
    change?.startsWith("+") ? "bg-[#E9F9EF]" : "bg-[#FFECE5]";

  // ---------------------------
  // 4️⃣ RENDER FINAL GRID
  // ---------------------------
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {statsToDisplay.map((stat, idx) => {
        // First card gets custom layout
        if (idx === 0 && (userRole !== "admin" || route === "my-earnings")) {
          return <div key={idx}>{renderCustomFirstCard(stat)}</div>;
        }

        // Normal card for others
        return (
          <Card key={idx}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-urbanist font-medium text-[#808C91]">
                  {stat.label}
                </span>

                {stat.change && (
                  <span
                    className={`text-xs font-general font-medium flex items-center py-1 px-1.5 rounded-2xl ${getBgColor(
                      stat.change
                    )} ${getChangeColor(stat.change)}`}
                  >
                    {renderStatIcon(stat.change)}
                    {stat.change}
                  </span>
                )}
              </div>

              <div className="text-[32px] font-semibold font-general text-[#084059] mb-1">
                {stat.value}
              </div>

              {stat.subtext && (
                <div className="text-xs font-urbanist font-medium leading-[145%] text-[#808c91]">
                  {stat.subtext}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;

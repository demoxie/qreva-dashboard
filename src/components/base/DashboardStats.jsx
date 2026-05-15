import { Card, CardContent } from "../ui/card";
import StatGreen from "../../assets/icons/stats.svg";
import StatRed from "../../assets/icons/stat-red.svg";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import BgImage from "../../assets/images/Vector.png";

const DashboardStats = ({ stats, route }) => {
  // Default stats
  const defaultStats = [
    { label: "Total Transaction Volume", value: "-", change: "", subtext: "-" },
    {
      label: "Total Transaction Value",
      value: "-",
      change: "%",
      subtext: "-",
    },
    { label: "Total Revenue", value: "-", change: "%", subtext: "-" },
    { label: "Success Rate", value: "-", change: "%", subtext: "-" },
  ];

  let statsToDisplay =
    stats && stats.length > 0 ? stats.filter(Boolean) : defaultStats;

  const userRole = localStorage.getItem("userRole") || "SuperAdmin";
  const isAdminRole = ["SuperAdmin", "Operation", "Support"].includes(userRole);

  // ---------------------------
  //  GET DATA FOR CUSTOM CARD
  // ---------------------------
  const getCustomFirstCard = () => {
    if (route === "my-earnings") {
      return {
        label: "My Earnings",
        value: stats[0]?.value || "₦0",
        change: "",
        subtext: stats[0]?.subtext || "₦0 in last 24 hours",
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
          subtext: "₦100,000 in last 24 hours",
        };

      default:
        return statsToDisplay[0];
    }
  };

  // Replace first card's DATA
  statsToDisplay = [getCustomFirstCard(), ...statsToDisplay.slice(1)];

  // ---------------------------
  //  RENDER CUSTOM CARD JSX
  // ---------------------------
  const renderCustomFirstCard = (stat) => {
    const [show, setShow] = useState(false);

    return (
      <Card
        className="relative overflow-hidden h-full bg-[#26C8B9] border-none"
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: "auto 100%",
        }}
      >
        <CardContent className="p-4 h-full flex flex-col">
          <div className="relative z-10">
            {/* 1. FIXED HEIGHT FOR TOP LABEL SECTION */}
            <div className="min-h-10 flex items-start">
              <span className="text-sm font-urbanist font-medium text-white/70">
                {stat.label}
              </span>
            </div>

            {/* 2. AMOUNT SECTION - Now starts at the same Y-axis as others */}
            <div className="flex items-center gap-2 mt-1 mb-1">
              <div className="text-[32px] font-semibold font-general text-white leading-none">
                {show ? stat.value : "••••••"}
              </div>

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="text-white/80 hover:text-white"
              >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {stat.subtext && (
              <div className="text-xs font-urbanist font-medium text-white/70 mt-1">
                {stat.subtext}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  // ---------------------------
  //  SUPPORT FUNCTIONS
  // ---------------------------

  const getChangeColor = (change) =>
    change?.startsWith("+") ? "text-green-500" : "text-red-500";

  const renderStatIcon = (change) =>
    change?.startsWith("+") ? (
      <img
        src={StatGreen}
        alt="stat"
        className={`w-4 h-4 ${getChangeColor(change)}`}
      />
    ) : (
      <img
        src={StatRed}
        alt="stat"
        className={`w-4 h-4 ${getChangeColor(change)}`}
      />
    );

  const getBgColor = (change) =>
    change?.startsWith("+") ? "bg-[#E9F9EF]" : "bg-[#FFECE5]";

  // ---------------------------
  //  RENDER FINAL GRID
  // ---------------------------
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 items-stretch">
      {statsToDisplay.map((stat, idx) => {
        if (
          idx === 0 &&
          (!isAdminRole || route === "my-earnings")
        ) {
          return (
            <div key={idx} className="h-full">
              {renderCustomFirstCard(stat)}
            </div>
          );
        }

        return (
          <Card key={idx} className="h-full">
            <CardContent className="p-4 h-full flex flex-col">
              {/* 1. FIXED HEIGHT FOR TOP LABEL SECTION */}
              <div className="flex justify-between items-start mb-2 gap-2 min-h-10">
                <span className="text-sm font-urbanist font-medium text-[#808C91] wrap-break-word">
                  {stat.label}
                </span>

                {stat.change && (
                  <span
                    className={`text-xs font-general font-medium flex items-center py-1 px-1.5 rounded-2xl whitespace-nowrap ${getBgColor(stat.change)} ${getChangeColor(stat.change)}`}
                  >
                    {renderStatIcon(stat.change)}
                    {stat.change}
                  </span>
                )}
              </div>

              {/* 2. AMOUNT SECTION - Will always be perfectly leveled */}
              <div className="text-[32px] font-semibold font-general text-[#084059] mb-1 leading-none">
                {stat.value}
              </div>

              {stat.subtext && (
                <div className="text-xs font-urbanist font-medium leading-[145%] text-[#808c91] mt-auto">
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

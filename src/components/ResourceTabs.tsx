"use client";

interface ResourceTabsProps {
  activeTab: "paid" | "free";
  onTabChange: (tab: "paid" | "free") => void;
}

export default function ResourceTabs({
  activeTab,
  onTabChange,
}: ResourceTabsProps) {
  return (
    <div className="flex justify-center mb-10">
      <div className="inline-flex rounded-lg bg-blush/50 p-1">
        <button
          onClick={() => onTabChange("paid")}
          className={`px-6 py-2.5 rounded-md font-inter font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 ${
            activeTab === "paid"
              ? "bg-white text-olive shadow-sm"
              : "text-olive/70 hover:text-olive"
          }`}
          aria-pressed={activeTab === "paid"}
        >
          Programs
        </button>
        <button
          onClick={() => onTabChange("free")}
          className={`px-6 py-2.5 rounded-md font-inter font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 ${
            activeTab === "free"
              ? "bg-white text-olive shadow-sm"
              : "text-olive/70 hover:text-olive"
          }`}
          aria-pressed={activeTab === "free"}
        >
          Free Resources
        </button>
      </div>
    </div>
  );
}

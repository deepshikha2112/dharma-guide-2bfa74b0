// Home Quick Access - Independent data module for home screen entry points
// This is separate from Spiritual Categories and should not be auto-linked

export interface QuickAccessItem {
  id: string;
  title: string;
  titleHi: string;
  icon: string;
  route: string;
  color: string;
}

// These are general entry points only - NOT spiritual logic holders
// They exist independently and do not mirror or connect to Spiritual Categories
export const homeQuickAccess: QuickAccessItem[] = [
  {
    id: "home-deities",
    title: "Deities",
    titleHi: "देवी-देवता",
    icon: "🕉️",
    route: "#deities",
    color: "from-amber-50 to-orange-100"
  },
  {
    id: "home-panchang",
    title: "Panchang",
    titleHi: "पंचांग",
    icon: "📅",
    route: "/panchang",
    color: "from-blue-50 to-indigo-100"
  },
  {
    id: "home-compatibility",
    title: "Compatibility",
    titleHi: "कुंडली मिलान",
    icon: "💑",
    route: "/compatibility",
    color: "from-pink-50 to-rose-100"
  },
  {
    id: "home-guidance",
    title: "Ask Guidance",
    titleHi: "मार्गदर्शन",
    icon: "🙏",
    route: "/guidance",
    color: "from-purple-50 to-violet-100"
  }
];

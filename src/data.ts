import p1 from "./assets/designs/p1.jpg";
import p2 from "./assets/designs/p2.jpg";
import p3 from "./assets/designs/p3.jpg";
import p4 from "./assets/designs/p4.jpg";
import p5 from "./assets/designs/p5.jpg";
import p6 from "./assets/designs/p6.jpg";

export const profile = {
  name: "Diana Nuñez",
  role: "Logo & graphic designer",
  tagline: "Unique, memorable design that makes a brand feel like itself.",
  email: "dianajoynunez748@gmail.com",
  cv: `${import.meta.env.BASE_URL}Diana-Nunez-CV.pdf`,
  about: [
    "I'm a passionate designer with a keen eye for detail and a love for creativity. With years of experience in graphic design, I specialize in crafting unique and memorable logos that effectively represent my clients' brands.",
    "Whether you're a startup looking to make a bold statement or an established business in need of a brand refresh, I'm here to help bring your vision to life.",
  ],
  services: ["Logo design", "Brand refresh", "Print & layout", "Social graphics"],
};

export interface Social {
  label: string;
  handle: string;
  href: string; // leave empty to hide
}

export const socials: Social[] = [
  { label: "Instagram", handle: "@dei.yana", href: "https://www.instagram.com/dei.yana" },
  { label: "TikTok", handle: "@die.yanaa", href: "https://www.tiktok.com/@die.yanaa" },
  { label: "Facebook", handle: "dianajoynunez", href: "https://www.facebook.com/dianajoynunez" },
  // Add the profile URL to show LinkedIn:
  { label: "LinkedIn", handle: "Diana Nuñez", href: "" },
];

export type Category = "Planners" | "Print & promo";
export const categories: Category[] = ["Planners", "Print & promo"];

export interface Design {
  src: string;
  title: string;
  category: Category;
  width: number;
  height: number;
}

export const designs: Design[] = [
  { src: p3, title: "Journal Planner", category: "Planners", width: 599, height: 837 },
  { src: p6, title: "Casa Montebello", category: "Print & promo", width: 682, height: 682 },
  { src: p2, title: "Weekly Planner", category: "Planners", width: 595, height: 841 },
  { src: p1, title: "Alphabet Coloring Book", category: "Print & promo", width: 460, height: 645 },
  { src: p4, title: "Daily Planner", category: "Planners", width: 597, height: 841 },
  { src: p5, title: "Monthly Calendar", category: "Planners", width: 602, height: 841 },
];

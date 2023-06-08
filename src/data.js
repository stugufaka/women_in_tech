//  icons
import {
  FiYoutube,
  FiInstagram,
  FiGithub,
  FiDribbble,
  FiLayout,
  FiSettings,
  FiPenTool,
  FiTag,
  FiMail,
  FiMapPin,
  FiDroplet,
  FiGlobe,
  FiUsers,
  FiUser,
  FiTwitter,
} from "react-icons/fi";
import { GiPineTree } from "react-icons/gi";

// companies icons
import FreelancerBrandIcon from "./assets/img/brands/freelancer.png";
import UpworkBrandIcon from "./assets/img/brands/upwork.png";
import FiverBrandIcon from "./assets/img/brands/fiverr.png";
import BehanceBrandIcon from "./assets/img/brands/behance.png";
import DribbbleBrandIcon from "./assets/img/brands/dribbble.png";

// projects images
import Project1 from "./assets/img/projects/p1.webp";
import Project2 from "./assets/img/projects/p2.webp";
import Project3 from "./assets/img/projects/p3.webp";
import Project4 from "./assets/img/projects/p4.webp";
import Project5 from "./assets/img/projects/p5.webp";
import Project6 from "./assets/img/projects/p6.webp";

// skills images
import SkillImg1 from "./assets/img/skills/html5.png";
import SkillImg2 from "./assets/img/skills/css3.png";
import SkillImg3 from "./assets/img/skills/js.png";
import SkillImg4 from "./assets/img/skills/reactjs.png";
import SkillImg5 from "./assets/img/skills/nextjs.png";
import SkillImg6 from "./assets/img/skills/nodejs.png";
import SkillImg7 from "./assets/img/skills/git.png";
import SkillImg8 from "./assets/img/skills/figma.png";

// testimonial images
import TestiImage1 from "./assets/img/testimonials/testimonial-1.webp";
import TestiImage2 from "./assets/img/testimonials/testimonial-2.webp";
import TestiImage3 from "./assets/img/testimonials/testimonial-3.webp";

//sdg
import wildlife from "./assets/img/sdgs/wild.jpg";
import sealife from "./assets/img/sdgs/sea.jpg";
import poverty from "./assets/img/sdgs/poverty.jpg";
import climate from "./assets/img/sdgs/climate.jpg";
import { AuthContext } from "./utils/AuthProvider";

// navigation
export const projectsData = [
  {
    id: "1",
    image: Project1,
    name: "project name 1",
    category: "Ocean Explorers",
  },
  {
    id: "2",
    image: Project2,
    name: "project name 2",
    category: "Land",
  },
  {
    id: "3",
    image: Project3,
    name: "project name 3",
    category: "Climate Change",
  },
  {
    id: "4",
    image: Project4,
    name: "project name 4",
    category: "Poverty",
  },
  {
    id: "5",
    image: Project5,
    name: "project name 5",
    category: "Land",
  },
  {
    id: "6",
    image: Project6,
    name: "project name 6",
    category: "Ocean Explorers",
  },
];

export const navigation = [
  {
    name: "home",
    href: "home",
  },
  {
    name: "about",
    href: "about",
  },
  {
    name: "explorers",
    href: "explorers",
  },
  {
    name: "services",
    href: "services",
  },
  {
    name: "testimonials",
    href: "testimonials",
  },
];

// social
export const social = [
  {
    icon: <FiTwitter />,
    href: "",
  },
  {
    icon: <FiGithub />,
    href: "",
  },
  {
    icon: <FiUser />,
    href: "/dashboard",
  },
];

// companies
export const brands = [
  {
    img: FreelancerBrandIcon,
    href: "",
  },
  {
    img: UpworkBrandIcon,
    href: "",
  },
  {
    img: FiverBrandIcon,
    href: "",
  },
  {
    img: BehanceBrandIcon,
    href: "",
  },
  {
    img: DribbbleBrandIcon,
    href: "",
  },
];

// projects

// projects
export const projectsNav = [
  {
    name: "Ocean Explorers",
  },
  {
    name: "Land",
  },
  {
    name: "Climate Change",
  },
  {
    name: "Poverty",
  },
];

// skill
export const skills = [
  {
    image: SkillImg1,
  },
  {
    image: SkillImg2,
  },
  {
    image: SkillImg3,
  },
  {
    image: SkillImg4,
  },
  {
    image: SkillImg5,
  },
  {
    image: SkillImg6,
  },
  {
    image: SkillImg7,
  },
  {
    image: SkillImg8,
  },
];

// services
export const services = [
  {
    id: 1,
    icon: <FiDroplet />,
    name: "50 ETH",
    description: "Life Below Water",
  },
  {
    id: 2,
    icon: <GiPineTree />,
    name: "20 ETH",
    description: "Life on Land",
  },
  {
    id: 3,
    icon: <FiGlobe />,
    name: "100ETH",
    description: "Climate Action",
  },
  {
    id: 4,
    icon: <FiUsers />,
    name: "400ETH",
    description: "Poverty",
  },
];

// testimonials
export const testimonials = [
  {
    authorImg: sealife,
    authorText: `Our Explorers work in oceanography, marine/coastal ecology, climate science, ocean exploration technology, community-based conservation, and related fields.`,
    authorName: "SDG GOAL 14",
    authorPosition: " Revealing and protecting underwater worlds",
  },
  {
    authorImg: wildlife,
    authorText:
      "Our Explorers work in terrestrial geosciences, terrestrial/freshwater ecology, climate science, conservation technology, community-based conservation, and related field",
    authorName: "SDG GOAL 15",
    authorPosition: "Preserving and protecting land environments",
  },

  {
    authorImg: climate,
    authorText:
      "Our Explorers address the needs of developing countries to both adapt to climate change and invest in low-carbon development.",
    authorName: "SDG GOAL 13",
    authorPosition: "Protecting the Climate",
  },
  {
    authorImg: poverty,
    authorText:
      "Our Explorers involves targeting the most vulnerable, increasing basic resources and services, and supporting communities affected by conflict and climate-related disasters.",
    authorName: "SDG GOAL 1",
    authorPosition: "Solving the hardship Living of People",
  },
];

// contact
export const contact = [
  {
    icon: <FiMail />,
    title: "Have a question?",
    subtitle: "I am here to help you.",
    description: "Email me at hello@youremail.com",
  },
  {
    icon: <FiMapPin />,
    title: "Current Location",
    subtitle: "Bucharest, Romania",
    description: "Serving clients worldwide",
  },
];

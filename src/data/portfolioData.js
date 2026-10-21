import {
  FaCode,
  FaDatabase,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaJava,
  FaLayerGroup,
  FaLinkedin,
  FaTools,
} from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import {
  SiAndroidstudio, SiCakephp, SiCplusplus, SiCss, SiDart, SiExpress,
  SiDocker, SiFlutter, SiGit, SiGithub, SiGitlab, SiHtml5, SiIntellijidea,
  SiJavascript, SiLaravel, SiMysql, SiNotion, SiPhp, SiPostgresql,
  SiPostman, SiReact, SiSpringboot, SiSwagger, SiTailwindcss, SiTiktok,
} from "react-icons/si";
import classFeedbackImg from "../assets/biu-se/class-feedback.jpg";
import tripImg from "../assets/biu-se/trip.jpg";
import kompotTripImg from "../assets/biu-se/biu-kompot-trip.jpg";
import solarProjectImg from "../assets/project/solar-proj.jpg";
import paymentProjectImg from "../assets/project/payment.jpg";
import studentPortalImg from "../assets/project/usp1.jpg";
import { COLORS } from "../theme/tokens";

export const skillGroups = [
  {
    title: "Programming",
    icon: FaCode,
    description:
      "Programming languages I use to solve problems and build applications.",
    items: [
      ["C++", SiCplusplus, "#659ad2"],
      ["C#", TbBrandCSharp, "#9b4f96"],
      ["Java", FaJava, "#f89820"],
      ["JavaScript", SiJavascript, "#f7df1e"],
      ["PHP", SiPhp, "#777bb4"],
      ["Dart", SiDart, "#0175c2"],
    ],
  },
  {
    title: "Software Development",
    icon: FaLayerGroup,
    description: "Frameworks and databases for building complete applications.",
    items: [
      ["Laravel", SiLaravel, "#ff2d20"],
      ["CakePHP", SiCakephp, "#d33c43"],
      ["Spring Boot", SiSpringboot, "#6db33f"],
      ["Express.js", SiExpress, "#f0f4ff"],
      ["React", SiReact, "#61dafb"],
      ["Flutter", SiFlutter, "#54c5f8"],
      ["HTML", SiHtml5, "#e34f26"],
      ["CSS", SiCss, "#1572b6"],
      ["Tailwind CSS", SiTailwindcss, "#38bdf8"],
      ["MySQL", SiMysql, "#4479a1"],
      ["SQL Server", FaDatabase, "#cc2927"],
      ["PostgreSQL", SiPostgresql, "#4169e1"],
      ["Oracle", FaDatabase, "#f80000"],
    ],
  },
  {
    title: "Tools",
    icon: FaTools,
    description: "Tools I use for development, version control, and testing.",
    items: [
      ["Git", SiGit, "#f05032"],
      ["GitHub", SiGithub, "#f0f4ff"],
      ["GitLab", SiGitlab, "#fc6d26"],
      ["VS Code", FaCode, "#22a7f2"],
      ["Visual Studio", FaCode, "#a179dc"],
      ["Postman", SiPostman, "#ff6c37"],
      ["IntelliJ IDEA", SiIntellijidea, "#f24e1e"],
      ["Android Studio", SiAndroidstudio, "#3ddc84"],
      ["Notion", SiNotion, "#f0f4ff"],
      ["Swagger", SiSwagger, "#85ea2d"],
      ["Docker", SiDocker, "#2496ed"],
    ],
  },
];

export const university = [
  {
    num: "01",
    name: "Class Feedback Session",
    desc: "Presenting work and receiving feedback during a university classroom session.",
    type: "Academic Activity",
    year: "2026",
    color: COLORS.accent,
    img: classFeedbackImg,
    imgAlt: "University class feedback session",
  },
  {
    num: "02",
    name: "University Field Trip Tuol Sleng Genocide Museum",
    desc: "An educational visit to learn about Cambodia’s history, honor the victims, and reflect on the importance of peace and humanity.",
    type: "Student Activity",
    year: "2024",
    color: COLORS.accent2,
    img: tripImg,
    imgAlt: "University field trip group photo",
  },
  {
    num: "03",
    name: "Kampot Field Trip",
    desc: "An educational journey exploring Kampot with university.",
    type: "Student Activity",
    color: COLORS.accent,
    img: kompotTripImg,
    imgAlt: "Sem Bunly and classmates on a university trip to Kompot",
  },
];

export const projectDemos = [
  {
    num: "01",
    name: "Solar",
    desc: "A web platform for exploring solar.",
    type: "Live Demo",
    color: COLORS.accent,
    img: solarProjectImg,
    imgAlt: "Solar energy project website preview",
    link: "https://solar.bunli-it.site/",
  },
  {
    num: "02",
    name: "Laravel KHQR Payment",
    desc: "A Laravel integration for KHQR payments.",
    type: "GitHub",
    color: COLORS.accent2,
    img: paymentProjectImg,
    imgAlt: "Laravel KHQR payment project preview",
    link: "https://github.com/sembunly/Laravel-KHQR-Payment",
  },
  {
    num: "03",
    name: "University Student Portal",
    desc: "A student portal for accessing university services and information.",
    type: "GitHub",
    color: COLORS.accent,
    img: studentPortalImg,
    imgAlt: "University student portal project preview",
    link: "https://github.com/sembunly/university-student-portal",
  },
];

export const socialLinks = [
  {
    label: "GitHub",
    value: "@sembunly",
    href: "https://github.com/sembunly",
    Icon: FaGithub,
  },
  {
    label: "LinkedIn",
    value: "in/sembunly",
    href: "https://www.linkedin.com/in/sembunly/",
    Icon: FaLinkedin,
  },
  {
    label: "Instagram",
    value: "@sem.bunli",
    href: "https://www.instagram.com/sem.bunli",
    Icon: FaInstagram,
  },
  {
    label: "Facebook",
    value: "Sem Bunly",
    href: "https://www.facebook.com/sem.bunlisem.14jan",
    Icon: FaFacebook,
  },
];

export const contacts = [
  {
    icon: "mail",
    label: "Email",
    value: "sembunly2005@gmail.com",
    href: "mailto:sembunly2005@gmail.com",
    target: "_blank",
  },
  {
    label: "GitHub",
    value: "github.com/sembunly",
    href: "https://github.com/sembunly",
    target: "_blank",
    Icon: FaGithub,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/sembunly",
    href: "https://www.linkedin.com/in/sembunly/",
    target: "_blank",
    Icon: FaLinkedin,
  },
  {
    label: "Instagram",
    value: "instagram.com/sem.bunli",
    href: "https://www.instagram.com/sem.bunli",
    target: "_blank",
    Icon: FaInstagram,
  },
  {
    label: "Facebook",
    value: "facebook.com/sem.bunlisem.14jan",
    href: "https://www.facebook.com/sem.bunlisem.14jan",
    target: "_blank",
    Icon: FaFacebook,
  },
  {
    label: "TikTok",
    value: "tiktok.com/@s.bunli.jan14",
    href: "https://www.tiktok.com/@s.bunli.jan14",
    target: "_blank",
    Icon: SiTiktok,
  },
];

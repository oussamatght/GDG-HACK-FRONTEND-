"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle,
  Circle,
  Clock,
  Code,
  FileText,
  Box,
  Flame,
  Skull,
} from "lucide-react"
import { HUD } from "@/components/hud"
import { ParticleBackground } from "@/components/particle-background"
import { EnhancedDocumentationPanel } from "@/components/enhanced-documentation-panel"
import { PixelButton } from "@/components/pixel-button"
import { cn } from "@/lib/utils"

interface Lesson {
  id: string
  title: string
  duration: string
  completed: boolean
  type: "reading" | "interactive" | "challenge"
}

const moduleData: Record<string, { title: string; description: string; color: string; lessons: Lesson[] }> = {
  "internet-basics": {
    title: "Internet Fundamentals",
    description: "Understand how the web works from the ground up.",
    color: "#0074D9",
    lessons: [
      { id: "1", title: "What is the Internet?", duration: "5 min", completed: true, type: "reading" },
      { id: "2", title: "How Data Travels", duration: "8 min", completed: true, type: "reading" },
      { id: "3", title: "IP Addresses Explained", duration: "6 min", completed: true, type: "interactive" },
      { id: "4", title: "DNS: The Phone Book of the Internet", duration: "7 min", completed: true, type: "reading" },
      { id: "5", title: "HTTP & HTTPS Protocols", duration: "10 min", completed: true, type: "reading" },
      { id: "6", title: "Challenge: Network Basics", duration: "15 min", completed: true, type: "challenge" },
      { id: "7", title: "Web Browsers Deep Dive", duration: "8 min", completed: true, type: "reading" },
      { id: "8", title: "Client-Server Model", duration: "6 min", completed: true, type: "interactive" },
      { id: "9", title: "TCP/IP Protocol Suite", duration: "12 min", completed: true, type: "reading" },
      { id: "10", title: "CDN and Caching", duration: "10 min", completed: true, type: "reading" },
      { id: "11", title: "Web Servers Explained", duration: "8 min", completed: true, type: "interactive" },
      { id: "12", title: "SSL/TLS Encryption", duration: "15 min", completed: true, type: "reading" },
      { id: "13", title: "REST API Basics", duration: "12 min", completed: false, type: "reading" },
      { id: "14", title: "WebSockets Introduction", duration: "10 min", completed: false, type: "interactive" },
      { id: "15", title: "Challenge: Build a Request", duration: "20 min", completed: false, type: "challenge" },
      { id: "16", title: "HTTP/2 and HTTP/3", duration: "8 min", completed: false, type: "reading" },
      { id: "17", title: "Browser DevTools Network", duration: "15 min", completed: false, type: "interactive" },
      { id: "18", title: "Final Challenge: Network Master", duration: "30 min", completed: false, type: "challenge" },
    ],
  },
  "html-mastery": {
    title: "HTML Mastery",
    description: "Learn semantic HTML, accessibility, and document structure.",
    color: "#FF851B",
    lessons: [
      { id: "1", title: "Introduction to HTML", duration: "5 min", completed: true, type: "reading" },
      { id: "2", title: "Document Structure", duration: "8 min", completed: true, type: "reading" },
      { id: "3", title: "Semantic Elements", duration: "10 min", completed: true, type: "interactive" },
      { id: "4", title: "Working with Text", duration: "7 min", completed: true, type: "reading" },
      { id: "5", title: "Links and Navigation", duration: "8 min", completed: true, type: "reading" },
      { id: "6", title: "Images and Media", duration: "10 min", completed: true, type: "interactive" },
      { id: "7", title: "Forms and Inputs", duration: "15 min", completed: true, type: "interactive" },
      { id: "8", title: "Tables", duration: "8 min", completed: true, type: "reading" },
      { id: "9", title: "Accessibility Basics", duration: "12 min", completed: true, type: "reading" },
      { id: "10", title: "Challenge: Build a Form", duration: "20 min", completed: true, type: "challenge" },
      { id: "11", title: "Meta Tags & SEO", duration: "10 min", completed: true, type: "reading" },
      { id: "12", title: "HTML5 APIs Overview", duration: "12 min", completed: true, type: "reading" },
      { id: "13", title: "SVG Basics", duration: "15 min", completed: true, type: "interactive" },
      { id: "14", title: "Canvas Introduction", duration: "18 min", completed: true, type: "interactive" },
      { id: "15", title: "Web Components Intro", duration: "12 min", completed: true, type: "reading" },
      { id: "16", title: "ARIA and Screen Readers", duration: "15 min", completed: true, type: "reading" },
      { id: "17", title: "Challenge: Accessible Page", duration: "25 min", completed: true, type: "challenge" },
      { id: "18", title: "iframes and Embeds", duration: "8 min", completed: true, type: "reading" },
      { id: "19", title: "Custom Data Attributes", duration: "6 min", completed: false, type: "reading" },
      { id: "20", title: "HTML Best Practices", duration: "10 min", completed: false, type: "reading" },
      { id: "21", title: "Challenge: Portfolio Layout", duration: "30 min", completed: false, type: "challenge" },
      { id: "22", title: "Template Element", duration: "8 min", completed: false, type: "interactive" },
      { id: "23", title: "Dialog Element", duration: "10 min", completed: false, type: "interactive" },
      { id: "24", title: "Details & Summary", duration: "6 min", completed: false, type: "reading" },
      { id: "25", title: "Picture Element", duration: "8 min", completed: false, type: "interactive" },
      { id: "26", title: "Lazy Loading", duration: "10 min", completed: false, type: "reading" },
      { id: "27", title: "Challenge: Complete Website", duration: "45 min", completed: false, type: "challenge" },
      { id: "28", title: "HTML Mastery Exam", duration: "60 min", completed: false, type: "challenge" },
    ],
  },
  // 3D Animation Modules (Dark Souls Theme)
  "3d-modeling-basics": {
    title: "Ashen Forge: 3D Basics",
    description: "Enter the dark realm of 3D modeling. Learn vertices, edges, and faces.",
    color: "#8B0000",
    lessons: [
      { id: "1", title: "Welcome to the Forge", duration: "5 min", completed: false, type: "reading" },
      { id: "2", title: "The Geometry of Souls", duration: "10 min", completed: false, type: "reading" },
      { id: "3", title: "Vertices: Points of Power", duration: "8 min", completed: false, type: "interactive" },
      { id: "4", title: "Edges: Lines of Fate", duration: "8 min", completed: false, type: "interactive" },
      { id: "5", title: "Faces: Surfaces of Reality", duration: "10 min", completed: false, type: "reading" },
      { id: "6", title: "Challenge: Craft Your First Shape", duration: "15 min", completed: false, type: "challenge" },
      { id: "7", title: "Primitive Forms", duration: "12 min", completed: false, type: "interactive" },
      { id: "8", title: "Mesh Transformation", duration: "15 min", completed: false, type: "interactive" },
      { id: "9", title: "Extrusion: Raising the Dead", duration: "12 min", completed: false, type: "interactive" },
      { id: "10", title: "Loop Cuts and Edge Flow", duration: "15 min", completed: false, type: "reading" },
      { id: "11", title: "Challenge: Forge a Sword", duration: "25 min", completed: false, type: "challenge" },
      { id: "12", title: "Subdivision Surface", duration: "12 min", completed: false, type: "reading" },
      { id: "13", title: "Modifiers: Dark Magic", duration: "18 min", completed: false, type: "interactive" },
      { id: "14", title: "Boolean Operations", duration: "15 min", completed: false, type: "interactive" },
      { id: "15", title: "Sculpting Fundamentals", duration: "20 min", completed: false, type: "interactive" },
      { id: "16", title: "Challenge: Sculpt a Helm", duration: "30 min", completed: false, type: "challenge" },
      { id: "17", title: "UV Unwrapping Basics", duration: "20 min", completed: false, type: "reading" },
      { id: "18", title: "UV Mapping Techniques", duration: "25 min", completed: false, type: "interactive" },
      { id: "19", title: "Seams and Islands", duration: "15 min", completed: false, type: "reading" },
      { id: "20", title: "Challenge: UV Map Your Weapon", duration: "35 min", completed: false, type: "challenge" },
      { id: "21", title: "Texturing Introduction", duration: "15 min", completed: false, type: "reading" },
      { id: "22", title: "Procedural Textures", duration: "18 min", completed: false, type: "interactive" },
      { id: "23", title: "Image Textures", duration: "15 min", completed: false, type: "reading" },
      { id: "24", title: "Normal Maps", duration: "20 min", completed: false, type: "interactive" },
      { id: "25", title: "Challenge: Texture Your Creation", duration: "40 min", completed: false, type: "challenge" },
      { id: "26", title: "Export and Optimization", duration: "12 min", completed: false, type: "reading" },
      { id: "27", title: "File Formats", duration: "10 min", completed: false, type: "reading" },
      {
        id: "28",
        title: "Challenge: Complete Asset Pipeline",
        duration: "45 min",
        completed: false,
        type: "challenge",
      },
      { id: "29", title: "Boss Fight: Create a Character", duration: "90 min", completed: false, type: "challenge" },
      { id: "30", title: "Ashen Forge Final Exam", duration: "120 min", completed: false, type: "challenge" },
    ],
  },
  "3d-rigging": {
    title: "Bonfire's Blessing: Rigging",
    description: "Bind the bones of your creations. Master skeletal systems and weight painting.",
    color: "#4A0404",
    lessons: [
      { id: "1", title: "The Anatomy of Movement", duration: "8 min", completed: false, type: "reading" },
      { id: "2", title: "Armature Fundamentals", duration: "12 min", completed: false, type: "reading" },
      { id: "3", title: "Creating Your First Bone", duration: "10 min", completed: false, type: "interactive" },
      { id: "4", title: "Bone Hierarchies", duration: "15 min", completed: false, type: "reading" },
      { id: "5", title: "Spine and Torso Rigging", duration: "20 min", completed: false, type: "interactive" },
      { id: "6", title: "Challenge: Basic Skeleton", duration: "25 min", completed: false, type: "challenge" },
      { id: "7", title: "Arm and Hand Rigging", duration: "25 min", completed: false, type: "interactive" },
      { id: "8", title: "Leg and Foot Rigging", duration: "25 min", completed: false, type: "interactive" },
      { id: "9", title: "Weight Painting Basics", duration: "20 min", completed: false, type: "reading" },
      { id: "10", title: "Weight Painting Techniques", duration: "30 min", completed: false, type: "interactive" },
      { id: "11", title: "Challenge: Weight a Character", duration: "40 min", completed: false, type: "challenge" },
      { id: "12", title: "IK vs FK Explained", duration: "15 min", completed: false, type: "reading" },
      { id: "13", title: "Inverse Kinematics Setup", duration: "25 min", completed: false, type: "interactive" },
      { id: "14", title: "IK Constraints", duration: "20 min", completed: false, type: "interactive" },
      { id: "15", title: "Pole Targets", duration: "15 min", completed: false, type: "reading" },
      { id: "16", title: "Challenge: IK Arms and Legs", duration: "35 min", completed: false, type: "challenge" },
      { id: "17", title: "Facial Rigging Introduction", duration: "18 min", completed: false, type: "reading" },
      { id: "18", title: "Shape Keys Basics", duration: "20 min", completed: false, type: "interactive" },
      { id: "19", title: "Facial Expressions", duration: "30 min", completed: false, type: "interactive" },
      { id: "20", title: "Eye and Mouth Controls", duration: "25 min", completed: false, type: "interactive" },
      { id: "21", title: "Challenge: Rig a Face", duration: "45 min", completed: false, type: "challenge" },
      { id: "22", title: "Control Bones", duration: "15 min", completed: false, type: "reading" },
      { id: "23", title: "Custom Rig Shapes", duration: "20 min", completed: false, type: "interactive" },
      { id: "24", title: "Rig UI Setup", duration: "18 min", completed: false, type: "reading" },
      { id: "25", title: "Challenge: Polish Your Rig", duration: "40 min", completed: false, type: "challenge" },
      { id: "26", title: "Common Rigging Problems", duration: "15 min", completed: false, type: "reading" },
      { id: "27", title: "Boss Fight: Full Character Rig", duration: "120 min", completed: false, type: "challenge" },
      { id: "28", title: "Bonfire's Blessing Final Exam", duration: "150 min", completed: false, type: "challenge" },
    ],
  },
  "3d-animation-fundamentals": {
    title: "Souls of Motion: Animation",
    description: "Breathe life into the hollow. Master keyframes and motion principles.",
    color: "#CC5500",
    lessons: [
      { id: "1", title: "The 12 Principles of Animation", duration: "15 min", completed: false, type: "reading" },
      { id: "2", title: "Timing and Spacing", duration: "12 min", completed: false, type: "reading" },
      { id: "3", title: "Keyframes: Moments of Truth", duration: "15 min", completed: false, type: "interactive" },
      { id: "4", title: "Graph Editor Basics", duration: "18 min", completed: false, type: "interactive" },
      { id: "5", title: "Easing Functions", duration: "15 min", completed: false, type: "reading" },
      { id: "6", title: "Challenge: Bouncing Ball", duration: "20 min", completed: false, type: "challenge" },
      { id: "7", title: "Anticipation and Follow-Through", duration: "12 min", completed: false, type: "reading" },
      { id: "8", title: "Squash and Stretch", duration: "15 min", completed: false, type: "interactive" },
      { id: "9", title: "Secondary Action", duration: "12 min", completed: false, type: "reading" },
      { id: "10", title: "Challenge: Character Jump", duration: "30 min", completed: false, type: "challenge" },
      { id: "11", title: "Walk Cycle Theory", duration: "15 min", completed: false, type: "reading" },
      { id: "12", title: "Contact Positions", duration: "18 min", completed: false, type: "interactive" },
      { id: "13", title: "Passing Positions", duration: "18 min", completed: false, type: "interactive" },
      { id: "14", title: "Down and Up Positions", duration: "15 min", completed: false, type: "reading" },
      { id: "15", title: "Challenge: Basic Walk Cycle", duration: "45 min", completed: false, type: "challenge" },
      { id: "16", title: "Run Cycles", duration: "25 min", completed: false, type: "interactive" },
      { id: "17", title: "Character Personality in Motion", duration: "15 min", completed: false, type: "reading" },
      { id: "18", title: "Challenge: Stylized Walk", duration: "40 min", completed: false, type: "challenge" },
      { id: "19", title: "Combat Animation Basics", duration: "20 min", completed: false, type: "reading" },
      { id: "20", title: "Sword Swing Animation", duration: "30 min", completed: false, type: "interactive" },
      { id: "21", title: "Impact and Weight", duration: "18 min", completed: false, type: "reading" },
      { id: "22", title: "Challenge: Attack Combo", duration: "60 min", completed: false, type: "challenge" },
      { id: "23", title: "Death Animation", duration: "25 min", completed: false, type: "interactive" },
      { id: "24", title: "Idle Animations", duration: "20 min", completed: false, type: "interactive" },
      { id: "25", title: "Dodge and Roll", duration: "30 min", completed: false, type: "interactive" },
      {
        id: "26",
        title: "Challenge: Souls-like Movement Set",
        duration: "90 min",
        completed: false,
        type: "challenge",
      },
      { id: "27", title: "NLA Editor Basics", duration: "18 min", completed: false, type: "reading" },
      { id: "28", title: "Blending Animations", duration: "25 min", completed: false, type: "interactive" },
      { id: "29", title: "Physics Simulation Intro", duration: "20 min", completed: false, type: "reading" },
      { id: "30", title: "Cloth Simulation", duration: "25 min", completed: false, type: "interactive" },
      { id: "31", title: "Hair and Cape Physics", duration: "30 min", completed: false, type: "interactive" },
      { id: "32", title: "Challenge: Animated Scene", duration: "75 min", completed: false, type: "challenge" },
      {
        id: "33",
        title: "Boss Fight: Complete Animation Set",
        duration: "180 min",
        completed: false,
        type: "challenge",
      },
      { id: "34", title: "Souls of Motion: Final Trial", duration: "240 min", completed: false, type: "challenge" },
      { id: "35", title: "Animation Mastery Certificate", duration: "5 min", completed: false, type: "reading" },
    ],
  },
  "3d-environments": {
    title: "Firelink Shrine: Environments",
    description: "Build dark, atmospheric worlds. Master lighting and mood.",
    color: "#2F4F4F",
    lessons: [
      { id: "1", title: "World Building Philosophy", duration: "10 min", completed: false, type: "reading" },
      { id: "2", title: "Environmental Storytelling", duration: "15 min", completed: false, type: "reading" },
      { id: "3", title: "Modular Asset Creation", duration: "20 min", completed: false, type: "interactive" },
      { id: "4", title: "Tiling and Repetition", duration: "15 min", completed: false, type: "reading" },
      { id: "5", title: "Challenge: Create Modular Walls", duration: "30 min", completed: false, type: "challenge" },
      { id: "6", title: "Gothic Architecture Basics", duration: "18 min", completed: false, type: "reading" },
      { id: "7", title: "Arches and Columns", duration: "25 min", completed: false, type: "interactive" },
      { id: "8", title: "Building Ruins", duration: "30 min", completed: false, type: "interactive" },
      { id: "9", title: "Decay and Age", duration: "20 min", completed: false, type: "reading" },
      { id: "10", title: "Challenge: Ruined Cathedral", duration: "60 min", completed: false, type: "challenge" },
      { id: "11", title: "Lighting Fundamentals", duration: "15 min", completed: false, type: "reading" },
      { id: "12", title: "Three-Point Lighting", duration: "18 min", completed: false, type: "interactive" },
      { id: "13", title: "Mood Through Light", duration: "20 min", completed: false, type: "reading" },
      { id: "14", title: "Volumetric Lighting", duration: "25 min", completed: false, type: "interactive" },
      { id: "15", title: "Challenge: Atmospheric Lighting", duration: "35 min", completed: false, type: "challenge" },
      { id: "16", title: "Fog and Atmosphere", duration: "18 min", completed: false, type: "reading" },
      { id: "17", title: "Particle Systems", duration: "25 min", completed: false, type: "interactive" },
      { id: "18", title: "Dust and Debris", duration: "20 min", completed: false, type: "interactive" },
      { id: "19", title: "Fire and Ember Effects", duration: "30 min", completed: false, type: "interactive" },
      { id: "20", title: "Challenge: Bonfire Scene", duration: "45 min", completed: false, type: "challenge" },
      { id: "21", title: "Terrain Creation", duration: "25 min", completed: false, type: "interactive" },
      { id: "22", title: "Rock and Cliff Modeling", duration: "30 min", completed: false, type: "interactive" },
      { id: "23", title: "Vegetation Basics", duration: "20 min", completed: false, type: "reading" },
      { id: "24", title: "Dead Trees and Roots", duration: "25 min", completed: false, type: "interactive" },
      { id: "25", title: "Challenge: Forest Path", duration: "50 min", completed: false, type: "challenge" },
      { id: "26", title: "Water and Reflections", duration: "25 min", completed: false, type: "interactive" },
      { id: "27", title: "Level Design Principles", duration: "15 min", completed: false, type: "reading" },
      { id: "28", title: "Visual Flow and Guidance", duration: "18 min", completed: false, type: "reading" },
      { id: "29", title: "Challenge: Complete Environment", duration: "90 min", completed: false, type: "challenge" },
      { id: "30", title: "Boss Fight: Souls-like Area", duration: "180 min", completed: false, type: "challenge" },
      { id: "31", title: "Firelink Shrine Final Exam", duration: "240 min", completed: false, type: "challenge" },
      { id: "32", title: "Environment Mastery Certificate", duration: "5 min", completed: false, type: "reading" },
    ],
  },
  "3d-rendering": {
    title: "Kiln of the First Flame: Rendering",
    description: "Master the final art. Shaders, materials, and cinematic output.",
    color: "#FF6600",
    lessons: [
      { id: "1", title: "Introduction to Rendering", duration: "10 min", completed: false, type: "reading" },
      { id: "2", title: "PBR Materials Theory", duration: "15 min", completed: false, type: "reading" },
      { id: "3", title: "Base Color and Albedo", duration: "12 min", completed: false, type: "interactive" },
      { id: "4", title: "Metallic and Roughness", duration: "15 min", completed: false, type: "interactive" },
      { id: "5", title: "Normal and Bump Maps", duration: "18 min", completed: false, type: "reading" },
      { id: "6", title: "Challenge: Create Metal Material", duration: "25 min", completed: false, type: "challenge" },
      { id: "7", title: "Shader Nodes Introduction", duration: "20 min", completed: false, type: "reading" },
      { id: "8", title: "Node Groups", duration: "15 min", completed: false, type: "interactive" },
      { id: "9", title: "Mix Shaders", duration: "18 min", completed: false, type: "interactive" },
      { id: "10", title: "Procedural Materials", duration: "25 min", completed: false, type: "interactive" },
      { id: "11", title: "Challenge: Weathered Stone", duration: "35 min", completed: false, type: "challenge" },
      { id: "12", title: "Subsurface Scattering", duration: "20 min", completed: false, type: "reading" },
      { id: "13", title: "Skin Materials", duration: "30 min", completed: false, type: "interactive" },
      { id: "14", title: "Emission and Glow", duration: "15 min", completed: false, type: "interactive" },
      { id: "15", title: "Challenge: Glowing Runes", duration: "30 min", completed: false, type: "challenge" },
      { id: "16", title: "Camera Setup", duration: "15 min", completed: false, type: "reading" },
      { id: "17", title: "Depth of Field", duration: "18 min", completed: false, type: "interactive" },
      { id: "18", title: "Motion Blur", duration: "15 min", completed: false, type: "reading" },
      { id: "19", title: "Compositing Basics", duration: "20 min", completed: false, type: "reading" },
      { id: "20", title: "Color Grading", duration: "25 min", completed: false, type: "interactive" },
      { id: "21", title: "Challenge: Cinematic Shot", duration: "40 min", completed: false, type: "challenge" },
      { id: "22", title: "Ray Tracing Fundamentals", duration: "18 min", completed: false, type: "reading" },
      { id: "23", title: "Denoising Techniques", duration: "15 min", completed: false, type: "reading" },
      { id: "24", title: "Render Optimization", duration: "20 min", completed: false, type: "reading" },
      { id: "25", title: "Boss Fight: Complete Render", duration: "120 min", completed: false, type: "challenge" },
    ],
  },
}

const sampleDocContent = {
  overview:
    "The Internet is a global network of interconnected computers that communicate using standardized protocols. It enables the exchange of data across the world in milliseconds, connecting billions of devices and users.",
  codeExample: `<!-- Basic HTML Document Structure -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Page</title>
</head>
<body>
  <header>
    <nav>Navigation</nav>
  </header>
  <main>
    <h1>Hello World!</h1>
    <p>Welcome to web development.</p>
  </main>
  <footer>Footer</footer>
</body>
</html>`,
  keyConcepts: [
    "The Internet uses TCP/IP protocols for data transmission",
    "Every device has a unique IP address for identification",
    "DNS translates domain names to IP addresses",
    "HTTP/HTTPS are protocols for web communication",
    "Data travels in packets through multiple routes",
  ],
  proTips: [
    "Always use semantic HTML elements for better accessibility",
    "Test your websites on multiple browsers and devices",
    "Use browser developer tools to inspect network requests",
    "Learn keyboard shortcuts to speed up your workflow",
  ],
  relatedTopics: ["TCP/IP", "HTTP Methods", "Web Security", "Browser APIs"],
  externalLinks: [
    {
      title: "MDN Web Docs - How the Web Works",
      url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works",
    },
    { title: "W3Schools HTML Tutorial", url: "https://www.w3schools.com/html/" },
  ],
  interactiveExample: {
    html: `<nav style="display: flex; justify-content: space-between; padding: 1rem; background: #1a1a2e;">
  <div style="font-weight: bold; color: #ff4136;">Icon</div>
  <ul style="display: flex; gap: 1rem; list-style: none; margin: 0; padding: 0;">
    <li><a href="#" style="color: #eaeaea; text-decoration: none;">Home</a></li>
    <li><a href="#" style="color: #eaeaea; text-decoration: none;">About</a></li>
    <li><a href="#" style="color: #eaeaea; text-decoration: none;">Contact</a></li>
  </ul>
</nav>`,
    css: "",
    description: "A simple navigation bar using flexbox for layout",
  },
}

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const moduleId = params.moduleId as string
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [hasAcknowledged, setHasAcknowledged] = useState(false)

  const module = moduleData[moduleId] || moduleData["internet-basics"]
  const completedCount = module.lessons.filter((l) => l.completed).length
  const progress = (completedCount / module.lessons.length) * 100

  const currentLesson = module.lessons.find((l) => l.id === selectedLesson)

  const getTypeIcon = (type: Lesson["type"]) => {
    switch (type) {
      case "reading":
        return FileText
      case "interactive":
        return Code
      case "challenge":
        return Play
    }
  }

  // Check if this is a 3D animation module
  const is3DModule = moduleId.startsWith("3d-")

  return (
    <div className="min-h-screen bg-souls-darker relative">
      <ParticleBackground theme="hell" />
      <HUD />

      <div className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            onClick={() => router.push("/learn")}
            className="flex items-center gap-2 font-mono text-souls-light/60 hover:text-souls-light transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Codex
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lesson Sidebar */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-souls-dark/80 border-2 border-souls-darker p-4 sticky top-24">
                {/* Module Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    {is3DModule && (
                      <div className="p-1 bg-souls-red/20 border border-souls-red">
                        {moduleId.includes("animation") ? (
                          <Flame className="w-4 h-4 text-souls-red" />
                        ) : moduleId.includes("rigging") ? (
                          <Skull className="w-4 h-4 text-souls-red" />
                        ) : (
                          <Box className="w-4 h-4 text-souls-red" />
                        )}
                      </div>
                    )}
                    <h2 className="font-mono text-xl uppercase" style={{ color: module.color }}>
                      {module.title}
                    </h2>
                  </div>
                  <p className="font-mono text-sm text-souls-light/60 mt-1">{module.description}</p>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-souls-light/60">
                      {completedCount} / {module.lessons.length} completed
                    </span>
                    <span className="text-souls-light/40">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-souls-darker">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: module.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Lessons List */}
                <div className="space-y-1 max-h-[400px] overflow-y-auto">
                  {module.lessons.map((lesson, index) => {
                    const TypeIcon = getTypeIcon(lesson.type)

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson.id)}
                        className={cn(
                          "w-full flex items-center gap-3 p-2 text-left transition-colors",
                          selectedLesson === lesson.id
                            ? "bg-souls-red/20 border-l-2 border-souls-red"
                            : "hover:bg-souls-darker border-l-2 border-transparent",
                        )}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-souls-light/40 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "font-mono text-sm truncate",
                              lesson.completed ? "text-souls-light/60" : "text-souls-light",
                            )}
                          >
                            {index + 1}. {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <TypeIcon className="w-3 h-3 text-souls-light/40" />
                            <span className="font-mono text-xs text-souls-light/40 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {lesson.duration}
                            </span>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              {selectedLesson ? (
                <div className="space-y-6">
                  {/* Lesson Header */}
                  <div className="bg-souls-dark/80 border-2 border-souls-darker p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs text-souls-light/60 uppercase">Lesson {selectedLesson}</span>
                        <h1 className="font-mono text-2xl text-souls-light mt-1">{currentLesson?.title}</h1>
                      </div>
                      <div className="flex items-center gap-2 text-souls-light/60">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono text-sm">{currentLesson?.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Documentation Panel */}
                  <EnhancedDocumentationPanel
                    topic={currentLesson?.title || ""}
                    content={sampleDocContent}
                    difficulty="beginner"
                    onAcknowledge={() => setHasAcknowledged(true)}
                  />

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <PixelButton
                      variant="secondary"
                      onClick={() => {
                        const currentIndex = module.lessons.findIndex((l) => l.id === selectedLesson)
                        if (currentIndex > 0) {
                          setSelectedLesson(module.lessons[currentIndex - 1].id)
                          setHasAcknowledged(false)
                        }
                      }}
                      disabled={selectedLesson === module.lessons[0].id}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </PixelButton>

                    <PixelButton
                      variant="primary"
                      onClick={() => {
                        const currentIndex = module.lessons.findIndex((l) => l.id === selectedLesson)
                        if (currentIndex < module.lessons.length - 1) {
                          setSelectedLesson(module.lessons[currentIndex + 1].id)
                          setHasAcknowledged(false)
                        }
                      }}
                      disabled={selectedLesson === module.lessons[module.lessons.length - 1].id}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </PixelButton>
                  </div>
                </div>
              ) : (
                <div className="bg-souls-dark/80 border-2 border-souls-darker p-8 text-center">
                  {is3DModule ? (
                    <>
                      <Box className="w-16 h-16 text-souls-light/20 mx-auto mb-4" />
                      <h2 className="font-mono text-xl text-souls-light mb-2">Enter the Dark Realm</h2>
                      <p className="font-mono text-souls-light/60">
                        Choose a lesson from the sidebar to begin your journey into 3D.
                      </p>
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-16 h-16 text-souls-light/20 mx-auto mb-4" />
                      <h2 className="font-mono text-xl text-souls-light mb-2">Select a Lesson</h2>
                      <p className="font-mono text-souls-light/60">
                        Choose a lesson from the sidebar to begin learning.
                      </p>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  type BookOpen,
  Search,
  ChevronRight,
  FileText,
  Code,
  Zap,
  Layout,
  FileCode,
  Palette,
  Server,
  Rocket,
  Terminal,
} from "lucide-react"
import { HUD } from "@/components/hud"
import { ParticleBackground } from "@/components/particle-background"
import Sidebar from "@/components/Sidebar"
import { cn } from "@/lib/utils"

interface DocSection {
  id: string
  title: string
  description: string
  icon: typeof BookOpen
  color: string
  articles: { id: string; title: string; readTime: string }[]
}

const docSections: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Begin your journey into web development",
    icon: Rocket,
    color: "#FF4136",
    articles: [
      { id: "intro", title: "Introduction to Web Development", readTime: "5 min" },
      { id: "setup", title: "Setting Up Your Environment", readTime: "10 min" },
      { id: "first-page", title: "Creating Your First Web Page", readTime: "8 min" },
      { id: "tools", title: "Essential Developer Tools", readTime: "12 min" },
      { id: "workflow", title: "Development Workflow Best Practices", readTime: "10 min" },
    ],
  },
  {
    id: "html-reference",
    title: "HTML Reference",
    description: "Complete HTML element documentation",
    icon: Code,
    color: "#FF851B",
    articles: [
      { id: "structure", title: "Document Structure", readTime: "8 min" },
      { id: "text", title: "Text Elements", readTime: "10 min" },
      { id: "links", title: "Links and Navigation", readTime: "7 min" },
      { id: "images", title: "Images and Media", readTime: "12 min" },
      { id: "forms", title: "Forms and Input", readTime: "15 min" },
      { id: "tables", title: "Tables", readTime: "10 min" },
      { id: "semantic", title: "Semantic Elements", readTime: "12 min" },
      { id: "accessibility", title: "Accessibility (a11y)", readTime: "15 min" },
    ],
  },
  {
    id: "css-reference",
    title: "CSS Reference",
    description: "Styling and layout documentation",
    icon: Palette,
    color: "#B10DC9",
    articles: [
      { id: "selectors", title: "Selectors and Specificity", readTime: "12 min" },
      { id: "box-model", title: "The Box Model", readTime: "10 min" },
      { id: "flexbox", title: "Flexbox Layout", readTime: "15 min" },
      { id: "grid", title: "CSS Grid Layout", readTime: "18 min" },
      { id: "responsive", title: "Responsive Design", readTime: "15 min" },
      { id: "animations", title: "Transitions and Animations", readTime: "12 min" },
      { id: "variables", title: "CSS Custom Properties", readTime: "8 min" },
      { id: "modern", title: "Modern CSS Features", readTime: "15 min" },
    ],
  },
  {
    id: "javascript-reference",
    title: "JavaScript Reference",
    description: "Core JavaScript documentation",
    icon: Zap,
    color: "#FFDC00",
    articles: [
      { id: "basics", title: "Variables and Data Types", readTime: "12 min" },
      { id: "functions", title: "Functions", readTime: "15 min" },
      { id: "arrays", title: "Arrays and Methods", readTime: "18 min" },
      { id: "objects", title: "Objects", readTime: "15 min" },
      { id: "dom", title: "DOM Manipulation", readTime: "20 min" },
      { id: "events", title: "Events", readTime: "15 min" },
      { id: "async", title: "Async Programming", readTime: "20 min" },
      { id: "es6", title: "ES6+ Features", readTime: "18 min" },
      { id: "modules", title: "Modules", readTime: "12 min" },
    ],
  },
  {
    id: "react-reference",
    title: "React Reference",
    description: "React patterns and best practices",
    icon: Layout,
    color: "#61DAFB",
    articles: [
      { id: "components", title: "Components", readTime: "12 min" },
      { id: "props", title: "Props and Children", readTime: "10 min" },
      { id: "state", title: "State Management", readTime: "15 min" },
      { id: "hooks", title: "React Hooks", readTime: "20 min" },
      { id: "context", title: "Context API", readTime: "12 min" },
      { id: "effects", title: "Side Effects", readTime: "15 min" },
      { id: "patterns", title: "Common Patterns", readTime: "18 min" },
      { id: "performance", title: "Performance Optimization", readTime: "15 min" },
    ],
  },
  {
    id: "typescript-reference",
    title: "TypeScript Reference",
    description: "Type system documentation",
    icon: FileCode,
    color: "#3178C6",
    articles: [
      { id: "types", title: "Basic Types", readTime: "10 min" },
      { id: "interfaces", title: "Interfaces", readTime: "12 min" },
      { id: "generics", title: "Generics", readTime: "15 min" },
      { id: "utility", title: "Utility Types", readTime: "12 min" },
      { id: "react-ts", title: "TypeScript with React", readTime: "18 min" },
    ],
  },
  {
    id: "nextjs-reference",
    title: "Next.js Reference",
    description: "Full-stack React framework",
    icon: Server,
    color: "#000000",
    articles: [
      { id: "routing", title: "App Router", readTime: "15 min" },
      { id: "rsc", title: "Server Components", readTime: "18 min" },
      { id: "data", title: "Data Fetching", readTime: "15 min" },
      { id: "actions", title: "Server Actions", readTime: "12 min" },
      { id: "api", title: "API Routes", readTime: "12 min" },
      { id: "deployment", title: "Deployment", readTime: "10 min" },
    ],
  },
  {
    id: "tools",
    title: "Developer Tools",
    description: "Essential tools and utilities",
    icon: Terminal,
    color: "#2ECC40",
    articles: [
      { id: "git", title: "Git Basics", readTime: "15 min" },
      { id: "github", title: "GitHub Workflow", readTime: "12 min" },
      { id: "devtools", title: "Browser DevTools", readTime: "15 min" },
      { id: "npm", title: "Package Management", readTime: "10 min" },
      { id: "vscode", title: "VS Code Tips", readTime: "12 min" },
    ],
  },
]

export default function DocsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("docs")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const filteredSections = docSections.filter((section) => {
    const matchesSection =
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesArticle = section.articles.some((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    return matchesSection || matchesArticle
  })

  const totalArticles = docSections.reduce((acc, section) => acc + section.articles.length, 0)

  return (
    <div className="min-h-screen bg-souls-darker relative flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 pt-24 pb-8 px-4 lg:pl-64 relative">
        <ParticleBackground theme="hell" />
        <HUD />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-8 h-8 text-souls-red" />
              <h1 className="font-mono text-2xl sm:text-3xl uppercase tracking-wider text-souls-light">
                Documentation
              </h1>
            </div>
            <p className="font-mono text-sm sm:text-base text-souls-light/60">
              {totalArticles} articles across {docSections.length} topics - Your comprehensive reference guide.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-souls-light/40" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-souls-dark border-2 border-souls-darker pl-10 pr-4 py-3 font-mono text-sm text-souls-light placeholder:text-souls-light/40 focus:border-souls-red outline-none"
              />
            </div>
          </motion.div>

          {/* Sections */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {filteredSections.map((section, index) => {
              const Icon = section.icon
              const isExpanded = expandedSection === section.id

              return (
                <motion.div
                  key={section.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-souls-dark/80 border-2 border-souls-darker overflow-hidden"
                >
                  {/* Section Header */}
                  <button
                    onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                    className="w-full p-4 flex items-center gap-4 hover:bg-souls-darker/50 transition-colors"
                  >
                    <div
                      className="w-12 h-12 flex-shrink-0 flex items-center justify-center border-2"
                      style={{ borderColor: section.color, backgroundColor: `${section.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: section.color }} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-mono text-lg text-souls-light">{section.title}</h3>
                      <p className="font-mono text-sm text-souls-light/60">{section.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-souls-light/40">{section.articles.length} articles</span>
                      <ChevronRight
                        className={cn("w-5 h-5 text-souls-light/40 transition-transform", isExpanded && "rotate-90")}
                      />
                    </div>
                  </button>

                  {/* Articles List */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      className="border-t-2 border-souls-darker"
                    >
                      {section.articles.map((article) => (
                        <button
                          key={article.id}
                          onClick={() => router.push(`/docs/${section.id}/${article.id}`)}
                          className="w-full p-3 pl-20 flex items-center justify-between hover:bg-souls-darker/50 transition-colors border-b border-souls-darker/50 last:border-b-0"
                        >
                          <span className="font-mono text-sm text-souls-light/80">{article.title}</span>
                          <span className="font-mono text-xs text-souls-light/40">{article.readTime}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>

          {filteredSections.length === 0 && (
            <div className="text-center py-12">
              <p className="font-mono text-souls-light/60">No documentation found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

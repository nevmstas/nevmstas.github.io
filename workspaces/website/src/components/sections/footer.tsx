import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Hexagon, Send, Github, Twitter, Linkedin, Globe } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative border-t border-gray-800 pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <Hexagon className="h-6 w-6 text-cyan-400 mr-2" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                STAS NEVMYVAKA
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Building the future of web industry with cutting-edge technology and innovative solutions.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/nevmstas" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              {/* <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link> */}
              <Link href="https://www.linkedin.com/in/nevmstas/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              {/* <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Website</span>
              </Link> */}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="#education" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Education
                </Link>
              </li>
            </ul>
          </div>

          {/* <div>
            <h3 className="text-lg font-bold mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to receive updates on my latest projects and tech insights.</p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900/50 border-gray-700 focus-visible:ring-cyan-500"
              />
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">I respect your privacy. No spam, ever.</p>
          </div> */}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Stas Nevmyvaka.
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"></div>
    </footer>
  )
}


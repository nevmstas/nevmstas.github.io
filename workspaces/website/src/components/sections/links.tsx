"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "../common";
import {
  Github,
  Linkedin,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

export function LinksSection() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com/nevmstas",
      username: "@nevmstas",
      color: "group-hover:text-white",
      bgColor: "group-hover:bg-black",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://linkedin.com/in/nevmstas",
      username: "nevmstas",
      color: "group-hover:text-[#0077B5]",
      bgColor: "group-hover:bg-[#0077B5]/10",
    },
  ];

  return (
    <section id="links" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          headerText="Digital Presence"
          description="Connect with me across various platforms and explore my digital footprint"
          badge={
            <Badge
              variant="outline"
              className="mb-4 border-cyan-500/50 text-cyan-400 bg-cyan-950/20"
            >
              CONNECT
            </Badge>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-cyan-400" />
              Social Platforms
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((link) => (
                <Card
                  key={link.name}
                  className="bg-gray-900/50 border-gray-800 overflow-hidden group hover:border-cyan-500/50 transition-all"
                >
                  <CardContent className="p-0">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 space-x-4"
                    >
                      <div
                        className={`p-2 rounded-lg bg-gray-800 ${link.bgColor} transition-colors`}
                      >
                        <span className={`${link.color} transition-colors`}>
                          {link.icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-200 group-hover:text-white">
                          {link.name}
                        </h4>
                        <p className="text-sm text-gray-400">{link.username}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-500 group-hover:text-cyan-400" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="pointer-events-none absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl"></div>
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}

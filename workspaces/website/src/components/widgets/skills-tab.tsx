"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code2, 
  Smartphone, 
  Server, 
  Blocks
} from "lucide-react";
import * as React from "react";
import { Technologies } from "@nevmstas/hygraph-client";
import { capitalizeFirstLetter } from "@/lib/utils";

type SkillsTabsProps = {
  skills: {
    mobile: Array<Technologies>;
    backend: Array<Technologies>;
    frontend: Array<Technologies>;
    blockchain: Array<Technologies>;
  };
};

export function SkillsTabs({ skills }: SkillsTabsProps) {
  const [activeTab, setActiveTab] = useState(
    Object.keys(skills)[0] || "frontend"
  );

  const iconMap: Record<string, React.JSX.Element> = {
    frontend: <Code2 className="h-6 w-6 sm:h-5 sm:w-5" />,
    backend: <Server className="h-6 w-6 sm:h-5 sm:w-5" />,
    mobile: <Smartphone className="h-6 w-6 sm:h-5 sm:w-5" />,
    blockchain: <Blocks className="h-6 w-6 sm:h-5 sm:w-5" />,
  };

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid grid-cols-4 mb-10 bg-gray-900/50 p-1">
        {Object.entries(skills).map(([key]) => (
          <TabsTrigger
            key={key}
            value={key}
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400 capitalize cursor-pointer p-2 sm:p-1"
          >
            <div className="flex items-center justify-center gap-2">
              {iconMap[key] || <Code2 className="h-200 w-200 sm:h-5 sm:w-5" />}
              <span className="hidden sm:inline">{key}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>

      {Object.entries(skills).map(([category, categorySkills]) => (
        <TabsContent key={category} value={category} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {categorySkills.map((skill) => (
              <div key={skill} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm">{capitalizeFirstLetter(skill)}</span>
                </div>
                <Progress
                  value={100}
                  className="h-1.5 bg-gray-800 [&>div]:bg-gradient-to-r [&>div]:from-cyan-500 [&>div]:to-purple-600"
                />
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

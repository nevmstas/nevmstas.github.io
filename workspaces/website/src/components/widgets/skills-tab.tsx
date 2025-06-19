"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Smartphone, Server, Blocks, Container } from "lucide-react";
import * as React from "react";
import { capitalizeFirstLetter } from "@/lib/utils";

type Skill = {
  name: string;
  type: string;
};

type SkillType = {
  name: string;
};

type SkillsTabsProps = {
  skills: Array<Skill>;
  skillTypes: Array<SkillType>;
};

export function SkillsTabs({ skills, skillTypes }: SkillsTabsProps) {
  const [activeTab, setActiveTab] = useState("frontend");

  const iconMap: Record<string, React.JSX.Element> = {
    frontend: <Code2 className="h-6 w-6 sm:h-5 sm:w-5" />,
    backend: <Server className="h-6 w-6 sm:h-5 sm:w-5" />,
    mobile: <Smartphone className="h-6 w-6 sm:h-5 sm:w-5" />,
    blockchain: <Blocks className="h-6 w-6 sm:h-5 sm:w-5" />,
    cicd: <Container className="h-6 w-6 sm:h-5 sm:w-5" />,
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.type]) {
      acc[skill.type] = [];
    }
    acc[skill.type].push(skill);
    return acc;
  }, {} as Record<string, Array<Skill>>);

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid grid-cols-4 mb-10 bg-gray-900/50 mx-auto sm:mx-0">
        {skillTypes.map((type) => (
          <TabsTrigger
            key={type.name}
            value={type.name}
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400 capitalize cursor-pointer"
          >
            <div className="flex items-center justify-center gap-2 flex-col sm:flex-row">
              {iconMap[type.name] || (
                <Code2 className="h-200 w-200 sm:h-5 sm:w-5" />
              )}
              {/* <span className="hidden sm:inline">{type.name}</span> */}
              <span>{type.name}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>

      {skillTypes.map((type) => (
        <TabsContent key={type.name} value={type.name} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {groupedSkills[type.name]?.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm">
                    {capitalizeFirstLetter(skill.name)}
                  </span>
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

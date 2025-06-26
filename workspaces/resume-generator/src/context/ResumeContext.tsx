"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ResumeQuery } from "@nevmstas/hygraph-client";

interface ResumeContextType {
  resume: ResumeQuery;
  setResume: React.Dispatch<React.SetStateAction<ResumeQuery>>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({
  children,
  initialResume,
}: {
  children: ReactNode;
  initialResume: ResumeQuery;
}) {
  const [resume, setResume] = useState<ResumeQuery>(initialResume);
  return (
    <ResumeContext.Provider value={{ resume, setResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume must be used within ResumeProvider");
  return context;
} 
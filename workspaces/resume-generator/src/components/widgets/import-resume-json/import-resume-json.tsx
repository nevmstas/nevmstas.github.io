"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/ResumeContext";

export const ImportResumeJson = () => {
  const { setResume } = useResume();
  const [jsonInput, setJsonInput] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    setJsonError(null);
  };

  const handleJsonUpdate = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setResume(parsed);
      setJsonError(null);
    } catch {
      setJsonError("Invalid JSON");
    }
  };

  return (
    <div className="mb-4">
      <Button type="button" variant="outline" onClick={() => setOpen((v) => !v)}>
        {open ? "Close Import JSON" : "Open Import JSON"}
      </Button>
      {open && (
        <div className="mt-4 border rounded p-4 bg-muted">
          <label className="block font-bold mb-2">Paste ResumeQuery JSON</label>
          <Textarea
            className="w-full h-[300px] min-h-0 max-h-[500px] font-mono overflow-y-auto resize-y"
            value={jsonInput}
            onChange={handleJsonChange}
            placeholder="Paste ResumeQuery JSON here to overwrite the current resume..."
          />
          <Button className="mt-2" onClick={handleJsonUpdate}>Update Resume</Button>
          {jsonError && <div className="text-red-500 mt-2">{jsonError}</div>}
        </div>
      )}
    </div>
  );
} 
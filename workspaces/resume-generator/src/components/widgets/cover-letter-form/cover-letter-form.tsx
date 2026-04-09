"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CoverLetterFormProps {
  value: string;
  onChange: (value: string) => void;
  dmMessage: string;
  onDmMessageChange: (value: string) => void;
}

export const CoverLetterForm = ({ value, onChange, dmMessage, onDmMessageChange }: CoverLetterFormProps) => {
  const [copiedCover, setCopiedCover] = useState(false);
  const [copiedDm, setCopiedDm] = useState(false);

  const handleCopyCover = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedCover(true);
      setTimeout(() => setCopiedCover(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  const handleCopyDm = async () => {
    try {
      await navigator.clipboard.writeText(dmMessage);
      setCopiedDm(true);
      setTimeout(() => setCopiedDm(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  return (
    <section className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Cover Letter</h2>
          <Button
            onClick={handleCopyCover}
            variant={copiedCover ? "default" : "outline"}
            size="sm"
            disabled={!value.trim()}
          >
            {copiedCover ? "Copied!" : "Copy"}
          </Button>
        </div>
        <Textarea
          id="coverLetter"
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={6}
          placeholder="Write your cover letter here..."
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">DM Message</h2>
            <p className="text-xs text-muted-foreground">Short version for Reddit, LinkedIn, or Messenger</p>
          </div>
          <Button
            onClick={handleCopyDm}
            variant={copiedDm ? "default" : "outline"}
            size="sm"
            disabled={!dmMessage.trim()}
          >
            {copiedDm ? "Copied!" : "Copy"}
          </Button>
        </div>
        <Textarea
          id="dmMessage"
          value={dmMessage}
          onChange={e => onDmMessageChange(e.target.value)}
          rows={4}
          placeholder="DM message will appear here after generating a cover letter..."
        />
      </div>
    </section>
  );
};

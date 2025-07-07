import { Button } from "../ui/button";
import { Terminal } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const GenerateCVButton = (props: Props) => (
  <Button
    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-none cursor-pointer"
    {...props}
  >
    <Terminal className="mr-2 h-4 w-4" />
    CV Preview
  </Button>
);

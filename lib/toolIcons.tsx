import { BarChart3, Eye, FileCheck, LucideIcon } from "lucide-react";

export const TOOL_ICONS: Record<string, LucideIcon> = {
  BarChart3,
  Eye,
  FileCheck,
};

export function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = TOOL_ICONS[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

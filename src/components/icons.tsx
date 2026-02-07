import { 
  Menu, 
  X, 
  Home, 
  FileText, 
  UploadCloud, 
  Github, 
  Send, 
  CheckCircle,
  AlertCircle,
  Loader2,
  Copy,
  ExternalLink
} from "lucide-react";

export const Icons = {
  menu: Menu,
  close: X,
  home: Home,
  docs: FileText,
  upload: UploadCloud,
  github: Github,
  telegram: Send,
  success: CheckCircle,
  error: AlertCircle,
  spinner: Loader2,
  copy: Copy,
  link: ExternalLink,
  logo: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
};

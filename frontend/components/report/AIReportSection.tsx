import * as React from "react";

interface AIReportSectionProps {
  title: string;
  content: string;
  children?: React.ReactNode;
}

export function AIReportSection({ title, content, children }: AIReportSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest border-l-2 border-primary pl-3">
        {title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed pl-3.5">
        {content}
      </p>
      {children && <div className="pl-3.5">{children}</div>}
    </div>
  );
}

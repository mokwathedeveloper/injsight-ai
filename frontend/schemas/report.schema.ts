import { z } from "zod";

export const exportReportSchema = z.object({
  format: z.enum(["json", "markdown", "pdf"], {
    errorMap: () => ({ message: "Please select an export format." }),
  }),
  includeDisclaimer: z.boolean().default(true),
});

export type ExportReportSchema = z.infer<typeof exportReportSchema>;

export const shareReportSchema = z.object({
  visibility: z.enum(["public", "unlisted"], {
    errorMap: () => ({ message: "Please choose a visibility setting." }),
  }),
  expiresInDays: z.number().int().min(1).max(365).optional(),
});

export type ShareReportSchema = z.infer<typeof shareReportSchema>;

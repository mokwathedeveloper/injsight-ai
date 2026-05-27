import * as z from "zod";

export const walletSchema = z.object({
  address: z
    .string()
    .min(1, "Address is required")
    .refine((val) => val.startsWith("inj1"), {
      message: "Address must start with 'inj1'",
    })
    .refine((val) => val.length >= 38, {
      message: "Injective address is too short",
    }),
});

export type WalletSchema = z.infer<typeof walletSchema>;

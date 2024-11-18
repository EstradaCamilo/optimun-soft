import { z } from "zod";
import { validString, validNumber } from "@/schemas/generalSchema";

const taxSchema = z.object({
  code: validString,
  name: validString,
  percentage: validNumber
    .min(0)
    .max(100, { message: "El porcentaje debe estar entre 0 y 100" }),
});

export const productSchema = z.object({
  id_category: validString,
  name: validString,
  description: validString,
  service: z.boolean(),
  selling_price: validNumber.min(0),
  product_cost: validNumber.min(0),
  taxes: z.array(taxSchema),
});

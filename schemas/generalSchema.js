import { z } from "zod";

export const validString = z
  .string()
  .trim()
  .min(1, { message: "Campo requerido" });

export const validNumber = z
  .number({ invalid_type_error: "Debe ser un número" })
  .positive({ message: "Debe ser un número positivo" });

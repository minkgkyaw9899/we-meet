import * as z from "zod"

export const normalRegisterSchema = z.object({
    body: z.object({
        name: z
            .string({
                required_error: "Name is required",
                invalid_type_error: "Name must be string type",
            })
            .min(3, "Name must be at least 3 characters")
            .max(30, "Name must be lower than or equal 30 characters"),
        email: z
            .string({
                required_error: "Email is required",
                invalid_type_error: "Invalid email format",
            })
            .email("Invalid email format"),
        password: z
            .string({
                required_error: "Password is required",
                invalid_type_error: "Password must be string type",
            })
            .min(6, "Password must be at least 6 characters")
            .max(120, "Password must be lower than or equal 120 characters"),
    }),
})

export type NormalRegisterSchema = z.infer<typeof normalRegisterSchema>["body"]

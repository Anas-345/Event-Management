import z from "zod";

const registerValidator = z.object({
    firstName: z.string().trim()
        .min(3, "First name must be at least 3 characters long.")
        .max(30, "First name cannot exceed 30 characters."),
    lastName: z.string().trim()
        .min(3, "Last name must be at least 3 characters long.")
        .max(30, "Last name cannot exceed 30 characters."),
    email: z.email("Please enter a valid email address.").trim(),
    password: z.string()
        .min(6, "Password must be at least 6 characters long.")
        .max(20, "Password cannot exceed 20 characters."),
    cnfrm: z.string(),
    role: z.enum(["organizer", "attendee", "admin"], {
        error: "Please select a role."
    })
}).refine(data => data.password === data.cnfrm, {
    message: "Passwords do not match. Please try again.",
    path: ["cnfrm"]
})

export { registerValidator }
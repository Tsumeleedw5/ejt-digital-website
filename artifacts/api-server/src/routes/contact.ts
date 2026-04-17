import { Router } from "express";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const router = Router();

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input. Please check all required fields." });
    return;
  }

  const { name, email, phone, businessName, service, message } = parsed.data;

  try {
    await db.insert(contactsTable).values({
      name,
      email,
      phone: phone ?? null,
      businessName: businessName ?? null,
      service: service ?? null,
      message,
    });

    res.json({
      success: true,
      message: "Thank you for reaching out. We'll be in touch shortly.",
    });
  } catch (err) {
    req.log.error({ err }, "Failed to save contact form submission");
    res.status(500).json({ error: "Something went wrong. Please try again or contact us directly." });
  }
});

export default router;

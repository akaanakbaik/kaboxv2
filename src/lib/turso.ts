import { createClient } from "@libsql/client";
import { env } from "@/lib/env";

export const turso = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

export async function logAccessToEdge(
  fileId: string,
  ip: string,
  userAgent: string,
  country: string
) {
  try {
    await turso.execute({
      sql: "INSERT INTO access_logs (file_id, ip, user_agent, country, timestamp) VALUES (?, ?, ?, ?, ?)",
      args: [fileId, ip, userAgent, country, Date.now()],
    });
  } catch (error) {
    console.error(error);
  }
}

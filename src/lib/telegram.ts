import TelegramBot from "node-telegram-bot-api";
import { env } from "@/lib/env";

const bot = new TelegramBot(env.TELEGRAM_BOT_TOKEN, { polling: false });

export const sendTelegramNotification = async (message: string) => {
  if (process.env.NODE_ENV === "development") return;

  try {
    await bot.sendMessage(env.TELEGRAM_CHANNEL_ID, message, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  } catch (error) {
    console.error(error);
  }
};

export const sendUploadAlert = async (
  fileName: string,
  size: number,
  ip: string,
  provider: string,
  url: string
) => {
  const sizeMb = (size / (1024 * 1024)).toFixed(2);
  const msg = `
<b>📦 New Upload Detected!</b>

<b>File:</b> <code>${fileName}</code>
<b>Size:</b> ${sizeMb} MB
<b>Provider:</b> ${provider.toUpperCase()}
<b>IP:</b> <code>${ip}</code>
<b>URL:</b> ${url}

#upload #newfile
`;
  await sendTelegramNotification(msg);
};

export const sendSecurityAlert = async (
  type: string,
  ip: string,
  details: string
) => {
  const msg = `
<b>🚨 SECURITY ALERT</b>

<b>Type:</b> ${type}
<b>IP:</b> <code>${ip}</code>
<b>Details:</b> ${details}

@${env.TELEGRAM_OWNER_ID} check this immediately!
`;
  await sendTelegramNotification(msg);
};

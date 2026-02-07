import { v2 as cloudinary } from "cloudinary";
import ImageKit from "imagekit";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import { nanoid } from "nanoid";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

const imagekit = new ImageKit({
  publicKey: env.IMAGEKIT_PUBLIC_KEY,
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

type UploadResult = {
  url: string;
  provider: "cloudinary" | "imagekit" | "supabase";
  fileId: string;
  deleteUrl?: string;
};

async function uploadToCloudinary(
  fileBuffer: Buffer,
  fileName: string
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          public_id: fileName.split(".")[0],
          folder: "domku-box",
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error("Cloudinary upload failed"));
          resolve({
            url: result.secure_url,
            provider: "cloudinary",
            fileId: result.public_id,
          });
        }
      )
      .end(fileBuffer);
  });
}

async function uploadToImageKit(
  fileBuffer: Buffer,
  fileName: string
): Promise<UploadResult> {
  const response = await imagekit.upload({
    file: fileBuffer,
    fileName: fileName,
    folder: "/domku-box/",
  });
  return {
    url: response.url,
    provider: "imagekit",
    fileId: response.fileId,
  };
}

async function uploadToSupabase(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<UploadResult> {
  const path = `domku-box/${nanoid(6)}-${fileName}`;
  const { data, error } = await supabase.storage
    .from("files")
    .upload(path, fileBuffer, {
      contentType: mimeType,
      upsert: false,
    });

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from("files")
    .getPublicUrl(path);

  return {
    url: publicUrlData.publicUrl,
    provider: "supabase",
    fileId: path,
  };
}

export async function smartUpload(
  file: File | Blob,
  fileName: string,
  mimeType: string
): Promise<UploadResult> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const providers = ["cloudinary", "imagekit", "supabase"];
  const selectedProvider =
    providers[Math.floor(Math.random() * providers.length)];

  try {
    switch (selectedProvider) {
      case "cloudinary":
        return await uploadToCloudinary(buffer, fileName);
      case "imagekit":
        return await uploadToImageKit(buffer, fileName);
      case "supabase":
        return await uploadToSupabase(buffer, fileName, mimeType);
      default:
        return await uploadToSupabase(buffer, fileName, mimeType);
    }
  } catch (error) {
    console.error(`Upload to ${selectedProvider} failed, retrying fallback...`);
    return await uploadToSupabase(buffer, fileName, mimeType);
  }
}

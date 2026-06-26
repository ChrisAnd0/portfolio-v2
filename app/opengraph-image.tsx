import { ImageResponse } from "next/og";
import { ogImageContent, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(ogImageContent(), { ...size });
}

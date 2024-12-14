/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [image, setImage] = useState<string>("");

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    if (file && file.size > 5242880) {
      alert("File size must be less than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage((reader.result as string) ?? "");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full pt-2">
          <label className="border-primary-300 flex h-[164px] w-full cursor-pointer items-center justify-center rounded-lg border border-dashed bg-[#D0F0FA4D]">
            <div className="text-center">
              <p className="text-primary-300 text-sm font-bold">Unggah KTP</p>
              <p className="text-xs font-normal text-[#525D66]">
                Klik untuk mengunggah atau seret dan lepas <br />
                PNG, JPG or PDF (max. 5 MB)
              </p>
              <input
                type="file"
                className="hidden"
                onChange={(e: any) => handleUpload(e)}
                accept="image/*"
                capture
              />
            </div>
          </label>
        </div>
        <Image src={image || ""} alt="image" width={200} height={200} />
      </main>
    </div>
  );
}

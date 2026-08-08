"use client";

import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FindPhotosPage() {
  const [serial, setSerial] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [tripName, setTripName] = useState("");
  const [loading, setLoading] = useState(false);

  async function searchTrip() {
    if (!serial.trim()) {
      alert("Enter Serial");
      return;
    }

    setLoading(true);
    setLinks([]);
    setTripName("");

    const { data, error } = await supabase
      .from("trips")
      .select(`
        trip_name,
        trip_links (
          link
        )
      `)
      .eq("serial", serial.trim())
      .single();

    if (error) {
      console.log(error);
      alert("Serial not found");
      setLoading(false);
      return;
    }

    setTripName(data.trip_name);

    const allLinks =
      data.trip_links?.map((item: any) => item.link) || [];

    setLinks(allLinks);

    setLoading(false);
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/logo/logo.png"
          alt=""
          width={1200}
          height={400}
          className="w-[90%] max-w-6xl h-auto object-contain opacity-[0.55]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-16">

        <div className="w-full max-w-xl">

          <div className="text-center mb-8">

            <h1 className="text-4xl sm:text-5xl font-bold text-yellow-500">
              Find Your Photos
            </h1>

            <p className="mt-4 text-gray-300">
              Enter your serial number to find your photos.
            </p>

          </div>

          {/* Search Box */}
          <div className="bg-black/75 border border-yellow-500/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl">

            <label className="block text-gray-300 mb-2 font-semibold">
              Serial Number
            </label>

            <input
              className="w-full bg-gray-950 border border-gray-700 text-white p-4 rounded-xl outline-none focus:border-yellow-500 transition"
              placeholder="Enter Serial Number"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchTrip();
                }
              }}
            />

            <button
              onClick={searchTrip}
              disabled={loading}
              className="w-full mt-4 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 text-black p-4 rounded-xl font-bold transition duration-300"
            >
              {loading ? "Searching..." : "Find Photos"}
            </button>

            {/* Results */}
            {tripName && (
              <div className="mt-8 border-t border-gray-800 pt-6">

                <p className="text-gray-400 text-sm mb-2">
                  Trip
                </p>

                <h2 className="text-2xl font-bold text-yellow-400 mb-5">
                  {tripName}
                </h2>

                {links.length > 0 ? (
                  links.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-yellow-500 hover:bg-yellow-400 text-black p-4 rounded-xl mb-3 text-center font-bold transition duration-300"
                    >
                      Open Photos {index + 1}
                    </a>
                  ))
                ) : (
                  <p className="text-gray-400 text-center">
                    No photos available.
                  </p>
                )}

              </div>
            )}

          </div>

        </div>

      </div>

    </main>
  );
}
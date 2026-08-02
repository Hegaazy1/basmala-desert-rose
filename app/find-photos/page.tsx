"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FindPhotosPage() {

  const [serial, setSerial] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [tripName, setTripName] = useState("");

  const [loading, setLoading] = useState(false);



  async function searchTrip() {

    if(!serial){
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
      .eq("serial", serial)
      .single();



    if(error){

      console.log(error);
      alert("Serial not found");

      setLoading(false);
      return;

    }



    setTripName(data.trip_name);


    const allLinks =
      data.trip_links?.map(
        (item:any)=>item.link
      ) || [];


    setLinks(allLinks);


    setLoading(false);

  }



  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">


      <div className="bg-white text-black rounded-xl shadow p-8 w-full max-w-xl">


        <h1 className="text-3xl font-bold text-center mb-6">
          Find Your Photos
        </h1>



        <input

        className="border p-3 w-full rounded mb-4"

        placeholder="Enter Serial Number"

        value={serial}

        onChange={(e)=>setSerial(e.target.value)}

        />



        <button

        onClick={searchTrip}

        className="bg-yellow-500 w-full p-3 rounded font-bold"

        >

        {loading ? "Searching..." : "Find Photos"}

        </button>




        {
          tripName && (

          <div className="mt-6">


          <h2 className="text-xl font-bold mb-3">
          {tripName}
          </h2>



          {
            links.map((link,index)=>(

            <a

            key={index}

            href={link}

            target="_blank"

            className="block bg-black text-white p-3 rounded mb-3 text-center"

            >

            Open Photos {index + 1}

            </a>

            ))

          }


          </div>

          )
        }



      </div>


    </div>

  );

}
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLogin from "@/app/components/AdminLogin";

type Trip = {
  id: number;
  serial: string;
  trip_name: string;
  created_by: string;
  created_at?: string;
  trip_links: {
    id: number;
    link: string;
  }[];
};

export default function AdminPage() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [serial, setSerial] = useState("");
  const [tripName, setTripName] = useState("");
  const [link, setLink] = useState("");

  const [username, setUsername] = useState("");

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const [trips, setTrips] = useState<Trip[]>([]);



  async function loadTrips() {

    const { data, error } = await supabase
      .from("trips")
      .select(`
        id,
        serial,
        trip_name,
        created_by,
        created_at,
        trip_links (
          id,
          link
        )
      `)
      .order("id", { ascending:false });


    if(error){
      console.log(error);
      return;
    }


    setTrips(data || []);

  }



  useEffect(() => {

    if(localStorage.getItem("adminLogged") === "true"){

      setLoggedIn(true);

      const savedUsername =
        localStorage.getItem("adminUsername");

      if(savedUsername){
        setUsername(savedUsername);
      }

    }

  },[]);



  useEffect(() => {

    if(loggedIn){
      loadTrips();
    }

  },[loggedIn]);



  async function saveTrip(){

    if(!serial || !link){

      alert("Serial and Link required");
      return;

    }


    let tripId = editingId;



    if(editingId){

      const {error} = await supabase
        .from("trips")
        .update({
          serial,
          trip_name: tripName
        })
        .eq("id", editingId);


      if(error){

        alert(error.message);
        return;

      }


      await supabase
        .from("trip_links")
        .delete()
        .eq("trip_id", editingId);


    }else{


      const {data,error} = await supabase
        .from("trips")
        .insert({
          serial,
          trip_name: tripName,
          created_by: username
        })
        .select()
        .single();


      if(error){

        alert(error.message);
        return;

      }


      tripId = data.id;

    }



    const linksArray = link
      .split("\n")
      .map(x=>x.trim())
      .filter(Boolean);



    const linksInsert = linksArray.map(item=>({

      trip_id: tripId,
      link:item

    }));


    const {error:linkError} = await supabase
      .from("trip_links")
      .insert(linksInsert);



    if(linkError){

      alert(linkError.message);
      return;

    }



    setSerial("");
    setTripName("");
    setLink("");
    setEditingId(null);


    alert("Saved Successfully");

    loadTrips();

  }  function editTrip(trip: Trip){

    setEditingId(trip.id);

    setSerial(trip.serial);

    setTripName(trip.trip_name);

    setLink(
      trip.trip_links
      .map(item => item.link)
      .join("\n")
    );


    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  }




  async function deleteTrip(id:number){

    const ok = confirm("Are you sure?");

    if(!ok) return;


    const {error} = await supabase
      .from("trips")
      .delete()
      .eq("id",id);


    if(error){

      alert(error.message);
      return;

    }


    alert("Deleted");

    loadTrips();

  }




  function copyLink(value:string){

    navigator.clipboard.writeText(value);

    alert("✅ Link Copied");

  }




  const filteredTrips = trips.filter((trip)=>

    trip.serial
    .toLowerCase()
    .includes(search.toLowerCase())

    ||

    trip.trip_name
    .toLowerCase()
    .includes(search.toLowerCase())

  );





  if(!loggedIn){

    return (

      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">


        <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:"url('/images/admin-bg.jpg')"
        }}
        />


        <div className="absolute inset-0 bg-gray-700/45"></div>



        <div className="relative z-10">


          <AdminLogin

          onLogin={(username)=>{

            setLoggedIn(true);

            setUsername(username);

          }}

          />


        </div>


      </main>

    );

  }





  return (

    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">


      <div

      className="absolute inset-0 bg-cover bg-center"

      style={{
        backgroundImage:"url('/images/admin-bg.jpg')"
      }}

      />


      <div className="absolute inset-0 bg-black/70"></div>




      <div className="relative z-10 bg-black/80 backdrop-blur-xl border border-yellow-500/30 rounded-3xl shadow-2xl p-10 w-[950px]">



        <img

        src="/logo/logo.png"

        alt="Logo"

        className="w-72 mx-auto mb-8"

        />


        <div className="flex items-center justify-between mb-10">


          <h1 className="text-5xl font-bold text-white">

            Admin Panel

          </h1>



          <button

          onClick={()=>{

            localStorage.removeItem("adminLogged");

            setLoggedIn(false);

          }}

          className="bg-red-600 hover:bg-red-500 px-6 py-3 rounded-xl text-white font-bold"

          >

          Logout

          </button>


        </div>





        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">



          <input

          type="text"

          placeholder="Serial Number"

          value={serial}

          onChange={(e)=>setSerial(e.target.value)}

          className="p-4 rounded-xl bg-gray-800 border border-gray-600 text-white"

          />



          <input

          type="text"

          placeholder="Trip Name"

          value={tripName}

          onChange={(e)=>setTripName(e.target.value)}

          className="p-4 rounded-xl bg-gray-800 border border-gray-600 text-white"

          />




          <textarea

          placeholder="WeTransfer Links (one per line)"

          value={link}

          onChange={(e)=>setLink(e.target.value)}

          className="p-4 rounded-xl bg-gray-800 border border-gray-600 text-white"

          />


        </div>




        <button

        onClick={saveTrip}

        className={`mt-5 w-full font-bold py-4 rounded-xl transition ${
          
          editingId

          ? "bg-blue-600 text-white"

          : "bg-yellow-500 text-black"

        }`}

        >

        {editingId ? "Update Trip" : "Save Trip"}

        </button>        <div className="flex justify-between items-center mt-10 mb-6">


          <h2 className="text-2xl font-bold text-yellow-400">

            Trips ({trips.length})

          </h2>



          <input

          type="text"

          placeholder="Search..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white w-72"

          />


        </div>






        <div className="space-y-3">


        {
          filteredTrips.map((trip)=>(


          <div

          key={trip.id}

          className="bg-gray-900 border border-gray-700 rounded-xl p-5"

          >



            <div className="flex items-center justify-between">



              <div>


                <p className="text-yellow-400 font-bold">

                  {trip.serial}

                </p>



                <p className="text-white text-lg">

                  {trip.trip_name}

                </p>



                <p className="text-green-400 text-sm">

                  Added By: {trip.created_by}

                </p>


              </div>





              <div className="flex gap-3">


                <button

                onClick={()=>editTrip(trip)}

                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white"

                >

                Edit

                </button>




                <button

                onClick={()=>deleteTrip(trip.id)}

                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-white"

                >

                Delete

                </button>



              </div>


            </div>







            <div className="mt-5 space-y-3">


            {

              trip.trip_links.map((item)=>(


              <div

              key={item.id}

              className="flex gap-3"

              >



                <input

                readOnly

                value={item.link}

                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg p-3 text-gray-300"

                />




                <button

                onClick={()=>copyLink(item.link)}

                className="bg-green-600 hover:bg-green-500 px-5 rounded-lg text-white"

                >

                Copy

                </button>



              </div>


              ))

            }


            </div>





          </div>


          ))

        }


        </div>



      </div>


    </main>

  );

}
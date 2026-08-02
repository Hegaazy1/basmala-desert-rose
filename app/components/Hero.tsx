import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Videos/Hero.MP4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        <Image
          src="/logo/logo.png"
          alt="Logo"
          width={450}
          height={450}
          priority
          className="drop-shadow-2xl mb-6 animate-pulse"
        />

        <h1 className="text-6xl md:text-7xl font-extrabold text-white tracking-wider">
          DesertRose & Basmala
        </h1>

        <p className="mt-4 text-2xl md:text-3xl text-yellow-400 font-semibold">
          The Memories Are Special To Me
        </p>

        <div className="flex flex-wrap justify-center gap-5 mt-12">

          <Link
            href="/find-photos"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10 py-4 rounded-full text-xl transition duration-300 shadow-xl"
          >
            Find Photos
          </Link>


        </div>

      </div>

    </section>
  );
}
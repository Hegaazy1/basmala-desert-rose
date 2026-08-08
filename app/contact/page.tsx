import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/logo/logo.png"
          alt=""
          width={1200}
          height={400}
          className="w-[90%] max-w-6xl h-auto object-contain opacity-55"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 py-16">

        <div className="max-w-5xl mx-auto text-center">

          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-500">
            Contact Us
          </h1>

          <p className="mt-5 text-gray-300 text-lg">
            Having any problem with your photos?
          </p>

          <p className="mt-2 text-gray-400">
            Contact us anytime. We're always here to help.
          </p>

          {/* Companies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">

            {/* BASMALA */}
            <div className="bg-gray-950/80 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">

              <h2 className="text-3xl font-bold text-yellow-500">
                BASMALA
              </h2>

              <p className="mt-6 text-gray-300">
                📍 Marsa Alam - Egypt
              </p>

              <a
                href="tel:+201204754773"
                className="block mt-4 text-white hover:text-yellow-400 transition"
              >
                📞 +20 120 475 4773
              </a>

              <a
                href="mailto:basmaladesert11@gmail.com"
                className="block mt-3 text-white hover:text-yellow-400 transition break-all"
              >
                ✉️ basmaladesert11@gmail.com
              </a>

              <a
                href="https://wa.me/201204754773?text=Hello%2C%20I%20have%20a%20problem%20with%20my%20photos."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-7 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                💬 Contact us on WhatsApp
              </a>

            </div>

            {/* DESERT ROSE */}
            <div className="bg-gray-950/80 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">

              <h2 className="text-3xl font-bold text-yellow-500">
                DESERT ROSE
              </h2>

              <p className="mt-6 text-gray-300">
                📍 Marsa Alam - Egypt
              </p>

              <a
                href="tel:+201147378972"
                className="block mt-4 text-white hover:text-yellow-400 transition"
              >
                📞 +20 114 737 8972
              </a>

              <a
                href="mailto:desertrose_videofilm@hotmail.com"
                className="block mt-3 text-white hover:text-yellow-400 transition break-all"
              >
                ✉️ desertrose_videofilm@hotmail.com
              </a>

              <a
                href="https://wa.me/201147378972?text=Hello%2C%20I%20have%20a%20problem%20with%20my%20photos."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-7 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                💬 Contact us on WhatsApp
              </a>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
export default function Services() {
  return (
    <section id="services" className="bg-black py-20 px-6 text-white">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center">
          Our Services
        </h2>

        <p className="text-center text-gray-400 mt-4">
          Professional underwater photography in the Red Sea.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">

          <div className="bg-gray-900 rounded-2xl p-8 hover:scale-105 transition">
            <div className="text-5xl">📸</div>

            <h3 className="text-2xl font-bold mt-6">
              Photography
            </h3>

            <p className="text-gray-400 mt-3">
              High-quality underwater photos with professional editing.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8 hover:scale-105 transition">
            <div className="text-5xl">🎥</div>

            <h3 className="text-2xl font-bold mt-6">
              Videography
            </h3>

            <p className="text-gray-400 mt-3">
              Stunning 4K underwater cinematic videos.
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8 hover:scale-105 transition">
            <div className="text-5xl">🐬</div>

            <h3 className="text-2xl font-bold mt-6">
              Diving Trips
            </h3>

            <p className="text-gray-400 mt-3">
              Capture unforgettable moments with dolphins and coral reefs.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
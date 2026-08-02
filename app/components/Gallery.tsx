import Image from "next/image";

const photos = [
  "/images/photo1.jpg",
  "/images/photo2.jpg",
  "/images/photo3.jpg",
  "/images/photo4.jpg",
  "/images/photo5.jpg",
  "/images/photo6.jpg",
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-gray-950 py-20"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center">
          Our Gallery
        </h2>

        <p className="text-center text-gray-400 mt-4">
          Explore unforgettable moments from the Red Sea.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">

          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative h-80 overflow-hidden rounded-2xl"
            >
              <Image
                src={photo}
                alt={`Photo ${index + 1}`}
                fill
                className="object-cover hover:scale-110 transition duration-500"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
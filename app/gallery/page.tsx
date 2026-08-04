export default function GalleryPage() {
  const images = Array.from(
    { length: 12 },
    (_, i) => `/images/photo${i + 1}.jpg`
  );

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Gallery
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Photo ${index + 1}`}
            className="w-full h-72 object-cover rounded-xl hover:scale-105 transition duration-300"
          />
        ))}
      </div>
    </main>
  );
}
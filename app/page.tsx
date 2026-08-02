import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Services from "./components/Services";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white overflow-x-hidden">

      <Hero />

      <Gallery />

      <Services />

      <Footer />

    </main>
  );
}
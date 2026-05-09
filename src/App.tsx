import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductStory from "./components/ProductStory";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import SocialProof from "./components/SocialProof";
import UseCases from "./components/UseCases";
import Pricing from "./components/Pricing";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <ProductStory />
        <Features />
        <HowItWorks />
        <SocialProof />
        <UseCases />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

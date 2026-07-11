import Hero from "./components/Hero";
import Nav from "./components/Nav";
import LogosStrip from "./components/LogosStrip";
import Overview from "./components/Overview";
import Creators from "./components/Creators";
import Features from "./components/Features";
import Users from "./components/Users";
import Cases from "./components/Cases";
import Footer from "./components/Footer";
import MotionKillSwitch from "./components/MotionKillSwitch";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <main className="min-w-[1000px] overflow-x-hidden bg-white">
      <MotionKillSwitch />
      <SmoothScroll />
      <Nav />
      <Hero />
      <LogosStrip />
      <Overview />
      <Creators />
      <Features />
      <Users />
      <Cases />
      <Footer />
    </main>
  );
}

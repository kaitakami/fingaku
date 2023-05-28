import Layout from "@/components/marketing/Layout";
import CTA from "@/components/marketing/ui/CTA";
import FAQs from "@/components/marketing/ui/FAQs";
import Features from "@/components/marketing/ui/Features";
import Hero from "@/components/marketing/ui/Hero";
import Pricing from "@/components/marketing/ui/Pricing";
import Testimonial from "@/components/marketing/ui/Testimonial";
import VisualFeatures from "@/components/marketing/ui/VisualFeatures";
import { type NextPage } from "next";

const Home: NextPage = () => {

  return (
    <Layout>
      <Hero />
      <VisualFeatures />
      <Features />
      <CTA />
      <Testimonial />
      <Pricing />
      <FAQs />
    </Layout>
  );
};

export default Home;

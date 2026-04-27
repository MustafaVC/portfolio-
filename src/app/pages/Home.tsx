import { Nav } from '../components/Nav';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { BrandAnimation } from '../components/BrandAnimation';
import { SocialMedia } from '../components/SocialMedia';
import { UIDesign } from '../components/UIDesign';
import { VideoEditing } from '../components/VideoEditing';
import { Footer } from '../components/Footer';
import { SectionAccordion } from '../components/SectionAccordion';

export function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />

      {/* Accordion sections */}
      <div id="work" style={{ borderBottom: '1px solid #1E1E1E', scrollMarginTop: '72px' }}>
        <SectionAccordion number="01" title="PRODUCTS" defaultOpen={true}>
          <UIDesign />
        </SectionAccordion>
        <SectionAccordion number="02" title="CONTENT" defaultOpen={false}>
          <SocialMedia />
        </SectionAccordion>
        <SectionAccordion number="03" title="ANIMATION" defaultOpen={false}>
          <BrandAnimation />
        </SectionAccordion>
        <SectionAccordion number="04" title="FILM" defaultOpen={false}>
          <VideoEditing />
        </SectionAccordion>
      </div>

      <Footer />
    </main>
  );
}
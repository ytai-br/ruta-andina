import PageBanner from '../components/PageBanner.jsx'
import AboutIntro from '../components/sections/AboutIntro.jsx'
import SafetySection from '../components/sections/SafetySection.jsx'
import CommunitiesSection from '../components/sections/CommunitiesSection.jsx'
import CommitmentSection from '../components/sections/CommitmentSection.jsx'
import { publicAsset } from '../lib/publicAsset.js'

export default function AboutPage() {
  return <>
    <PageBanner variant="about" title="NOSOTROS" image={publicAsset('images/nosotros-01.jpg')} alt="Montañistas recorriendo senderos en la cordillera de los Andes con vista a lagunas de montaña" />
    <AboutIntro /><SafetySection /><CommunitiesSection /><CommitmentSection />
  </>
}

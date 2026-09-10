import BrandingDriftWall from './BrandingDriftWall';
import BrandingCoverflow from './BrandingCoverflow';

/**
 * Main Branding Component
 * Currently rendering BrandingDriftWall (Interactive 3D Drift Wall).
 * 
 * If you or your client wish to switch back to the 3D Coverflow carousel cards,
 * simply change the export below to `BrandingCoverflow`.
 */
export { BrandingDriftWall, BrandingCoverflow };

export default function Branding() {
  return <BrandingDriftWall />;
}

import * as React from 'react';
import { DisplayMode } from '@microsoft/sp-core-library';

interface IHeroBannerProps {
  headline: string;
  tagline: string;
  backgroundImageUrl: string;
  ctaLabel: string;
  ctaUrl: string;
  overlayOpacity: number;
  showCta: boolean;
  displayMode: DisplayMode;
}

const LIME  = '#74B745';
const NAVY  = '#0A72B8';
const META  = '#274B71';

const HeroBanner: React.FC<IHeroBannerProps> = ({
  headline, tagline, backgroundImageUrl, ctaLabel, ctaUrl, overlayOpacity, showCta, displayMode,
}) => {
  const [ctaHovered, setCtaHovered] = React.useState(false);

  const overlayAlpha = Math.min(90, Math.max(0, overlayOpacity)) / 100;

  const bgStyle: React.CSSProperties = backgroundImageUrl
    ? {
        backgroundImage: `url('${backgroundImageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        background: `linear-gradient(135deg, ${META} 0%, ${NAVY} 50%, #1a5276 100%)`,
      };

  return (
    <div
      style={{
        ...bgStyle,
        position: 'relative',
        minHeight: 380,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        fontFamily: "'Poppins','Segoe UI',sans-serif",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundColor: `rgba(0,0,0,${overlayAlpha})`,
        }}
      />

      {/* Decorative lime accent bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 5, backgroundColor: LIME,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, padding: '60px 48px' }}>
        {/* Edit mode hint */}
        {displayMode === DisplayMode.Edit && (
          <div style={{
            display: 'inline-block', marginBottom: 16,
            padding: '4px 12px', borderRadius: 4,
            backgroundColor: 'rgba(116,183,69,0.25)', border: '1px solid #74B745',
            fontSize: 11, color: '#74B745', fontWeight: 600, letterSpacing: '0.08em',
          }}>
            ✏️ EDIT MODE — Use the property pane (pencil icon) to change headline, image, colors
          </div>
        )}

        <h1 style={{
          margin: '0 0 16px',
          fontSize: 'clamp(24px, 4vw, 40px)',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.2,
          fontFamily: "'Lexend Deca','Segoe UI',sans-serif",
          textShadow: '0 2px 12px rgba(0,0,0,0.3)',
        }}>
          {headline}
        </h1>

        <p style={{
          margin: '0 0 32px',
          fontSize: 'clamp(14px, 2vw, 17px)',
          color: 'rgba(255,255,255,0.88)',
          lineHeight: 1.7,
          maxWidth: 620,
          textShadow: '0 1px 6px rgba(0,0,0,0.25)',
        }}>
          {tagline}
        </p>

        {showCta && (
          <a
            href={ctaUrl}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            style={{
              display: 'inline-block',
              padding: '13px 32px',
              borderRadius: 6,
              backgroundColor: ctaHovered ? '#5da034' : LIME,
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'background-color 0.2s ease, transform 0.15s ease',
              transform: ctaHovered ? 'translateY(-2px)' : 'none',
              boxShadow: '0 4px 16px rgba(116,183,69,0.4)',
            }}
          >
            {ctaLabel} →
          </a>
        )}
      </div>

      {/* Geometric accent - city skyline silhouette */}
      <div style={{
        position: 'absolute', right: 0, bottom: 5, top: 0,
        width: '35%', opacity: 0.06,
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 20px,
          rgba(255,255,255,0.5) 20px,
          rgba(255,255,255,0.5) 21px
        )`,
        display: 'flex', alignItems: 'flex-end',
      }} />
    </div>
  );
};

export { HeroBanner };

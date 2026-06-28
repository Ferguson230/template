import * as React from 'react';

// ── COSF Brand Tokens
export const B = {
  navy:      "#0A72B8",
  darkBlue:  "#1B608F",
  metallic:  "#274B71",
  lime:      "#74B745",
  forest:    "#2D8842",
  picton:    "#34AEE3",
  apple:     "#85BC44",
  pigment:   "#3EA947",
  topBar:    "#1D3A56",
  navBar:    "#274B71",
  muted:     "#64748B",
  border:    "#E2E8F0",
  bg:        "#F2F5F8",
  bgCard:    "#F5F8FB",
};

export const HEADLINE: React.CSSProperties = { fontFamily: "'Lexend Deca', sans-serif" };
export const BODY: React.CSSProperties     = { fontFamily: "'Poppins', sans-serif" };

// ── Reusable style constants
export const S = {
  // Layout
  flex:           { display: 'flex' } as React.CSSProperties,
  flexCenter:     { display: 'flex', alignItems: 'center' } as React.CSSProperties,
  flexBetween:    { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } as React.CSSProperties,
  flexWrap:       { display: 'flex', flexWrap: 'wrap' as 'wrap' } as React.CSSProperties,
  flexCol:        { display: 'flex', flexDirection: 'column' as 'column' } as React.CSSProperties,
  grid3:          { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' } as React.CSSProperties,
  grid2:          { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' } as React.CSSProperties,
  grid6:          { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)' } as React.CSSProperties,
  fullWidth:      { width: '100%' } as React.CSSProperties,

  // Gap
  gap2: { gap: 8 }  as React.CSSProperties,
  gap3: { gap: 12 } as React.CSSProperties,
  gap4: { gap: 16 } as React.CSSProperties,
  gap5: { gap: 20 } as React.CSSProperties,
  gap6: { gap: 24 } as React.CSSProperties,

  // Padding
  p3:  { padding: 12 } as React.CSSProperties,
  p4:  { padding: 16 } as React.CSSProperties,
  p5:  { padding: 20 } as React.CSSProperties,
  p6:  { padding: 24 } as React.CSSProperties,
  px4: { paddingLeft: 16, paddingRight: 16 } as React.CSSProperties,
  px8: { paddingLeft: 32, paddingRight: 32 } as React.CSSProperties,
  py3: { paddingTop: 12, paddingBottom: 12 } as React.CSSProperties,
  py6: { paddingTop: 24, paddingBottom: 24 } as React.CSSProperties,

  // Spacing stacks (use marginBottom on children)
  spaceY2: { marginBottom: 8 }  as React.CSSProperties,
  spaceY3: { marginBottom: 12 } as React.CSSProperties,
  spaceY4: { marginBottom: 16 } as React.CSSProperties,
  spaceY6: { marginBottom: 24 } as React.CSSProperties,
  spaceY8: { marginBottom: 32 } as React.CSSProperties,

  // Text sizes
  textXs:   { fontSize: 11 } as React.CSSProperties,
  textSm:   { fontSize: 13 } as React.CSSProperties,
  textBase: { fontSize: 15 } as React.CSSProperties,
  textLg:   { fontSize: 18 } as React.CSSProperties,
  text2xl:  { fontSize: 22 } as React.CSSProperties,
  text3xl:  { fontSize: 28 } as React.CSSProperties,

  // Font weights
  medium:    { fontWeight: 500 } as React.CSSProperties,
  semibold:  { fontWeight: 600 } as React.CSSProperties,
  bold:      { fontWeight: 700 } as React.CSSProperties,
  extrabold: { fontWeight: 800 } as React.CSSProperties,

  // Border radius
  rounded:    { borderRadius: 6 }    as React.CSSProperties,
  roundedLg:  { borderRadius: 8 }    as React.CSSProperties,
  roundedXl:  { borderRadius: 12 }   as React.CSSProperties,
  rounded2xl: { borderRadius: 16 }   as React.CSSProperties,
  roundedFull:{ borderRadius: 9999 } as React.CSSProperties,

  // Card
  card: {
    background: '#ffffff',
    borderRadius: 12,
    border: '1px solid #E2E8F0',
    boxShadow: '0 1px 3px rgba(0,0,0,.08)',
  } as React.CSSProperties,

  // Colors
  white:   { color: '#ffffff' } as React.CSSProperties,
  muted:   { color: '#64748B' } as React.CSSProperties,
  bgWhite: { backgroundColor: '#ffffff' } as React.CSSProperties,
  bgLight: { backgroundColor: '#F5F8FB' } as React.CSSProperties,

  // Borders
  borderTop:    { borderTop:    '1px solid #E2E8F0' } as React.CSSProperties,
  borderBottom: { borderBottom: '1px solid #E2E8F0' } as React.CSSProperties,
  border:       { border:       '1px solid #E2E8F0' } as React.CSSProperties,
};

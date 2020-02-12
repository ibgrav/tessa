import Head from 'next/head';

const ThemeStyles = ({ isDark, background, text, link }) => {
  const currentPrimary = isDark ? 'secondary' : 'primary';

  return (
    <Head>
      <style>{`
        body {
          color: ${text[currentPrimary]};
          background-color: ${background[currentPrimary]};
        }
        #layout .header {
          background-color: ${background[currentPrimary]};
        }
        #layout .tabs a, #layout .mobile-tabs a {
          color: ${link.primary};
        }
        #layout .tabs .active, #layout .tabs a:hover, #layout .mobile-tabs .active, #layout .mobile-tabs a:hover {
          color: ${link.active};
        }
        #social svg {
          fill: ${text[currentPrimary] || '#fff'};
        }
        .professional-project #project-list a.active, .professional-project #project-list a:hover {
          color: ${link.active};
        }
        .professional-project #project-list a {
          color: ${link.primary};
        }
        .professional-project .project-gallery {
          border-bottom: 1px solid ${text[currentPrimary]};
        }
        #academic .cover {
            background-color: ${link.active};
            color: ${background[currentPrimary]};
        }
      `}</style>
    </Head>
  )
}

export default ThemeStyles;
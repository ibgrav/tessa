import Head from 'next/head';

const GlobalTransitions = ({ isReady }) => {
  return isReady ? (
    <Head>
      <style>{`
        body {
          transition: background-color 500ms, color 500ms;
        }
        #layout .header {
          transition: background-color 500ms, color 500ms;
        }
        #layout .tabs a, #layout .mobile-tabs a {
          transition: background-color 500ms, color 500ms;
        }
        #layout .tabs .active, #layout .tabs a:hover, #layout .mobile-tabs .active, #layout .mobile-tabs a:hover {
          transition: background-color 500ms, color 500ms;
        }
        #social svg {
          transition: background-color 500ms, color 500ms;
        }
        #layout .mobile-tabs .links {
          transition: top 1s, opacity 1s, background-color 500ms, color 500ms;
        }
        .mobile-tabs .open-btn .bar {
          transition: transform 1000ms, background-color 500ms, color 500ms;
        }
      `}</style>
    </Head>
  ) : null;
}

export default GlobalTransitions;
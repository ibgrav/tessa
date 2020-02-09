import { useState, useEffect } from 'react';
import { Client } from '../prismic-configuration';

import Link from 'next/link';
import Layout from '../components/Layout';
import VerticalGallery from '../components/VerticalGallery';

const Personal = ({ doc }) => {
    const [state, setState] = useState({
        photosMounted: false
    });

    useEffect(() => {
        if (!state.photosMounted) setState(state => ({ ...state, photosMounted: true }));
    }, []);

    return (
        <Layout>
            <VerticalGallery clickable images={doc.data.images} numberOfColumns={3} />
        </Layout>
    );
}


Personal.getInitialProps = async ctx => {
    const req = ctx.req;
    const doc = await Client(req).getSingle('personal');
    return { doc }
}

export default Personal;
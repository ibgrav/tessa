import { useState, useEffect } from 'react';
import { Client } from '../lib/prismic-configuration';

import Link from 'next/link';
import Layout from '../components/Layout';
import ImageGallery from '../components/ImageGallery';

const Personal = ({ doc }) => {
    const [state, setState] = useState({
        photosMounted: false
    });

    useEffect(() => {
        if (!state.photosMounted) setState(state => ({ ...state, photosMounted: true }));
    }, []);

    return (
        <Layout>
            <ImageGallery clickable images={doc.data.images} numberOfColumns={3} isVertical />
        </Layout>
    );
}


Personal.getInitialProps = async ctx => {
    const req = ctx.req;
    const doc = await Client(req).getSingle('personal');
    return { doc }
}

export default Personal;
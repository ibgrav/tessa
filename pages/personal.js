import { useState, useEffect } from 'react';
import { Client } from '../lib/prismic-configuration';
import { storageFetch } from '../lib/global';
import Layout from '../components/Layout';
import ImageGallery from '../components/ImageGallery';

const Personal = ({ doc, pics }) => {
    const [state, setState] = useState({
        photosMounted: false
    });

    console.log({ pics })

    useEffect(() => {
        if (!state.photosMounted) setState(state => ({ ...state, photosMounted: true }));
    }, []);

    return (
        <Layout>
            <ImageGallery clickable images={pics} numberOfColumns={3} isVertical />
        </Layout>
    );
}


Personal.getInitialProps = async ctx => {
    const req = ctx.req;
    const doc = await Client(req).getSingle('personal');
    const pics = await storageFetch({ req, prefix: 'personal', type: 'image/jpeg', sort: 'updated' });
    return { pics }
}

export default Personal;
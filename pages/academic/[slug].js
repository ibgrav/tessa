import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function Post() {
    const router = useRouter();
    const slug = router.query.slug;

    return (
        <Layout>
            <h1>{slug}</h1>
        </Layout>
    );
}
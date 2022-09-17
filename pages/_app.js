import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'rsuite/dist/rsuite.min.css';
import '../styles/main.scss';
import DefaultLayout from '@/layouts/default.layout';
import { wrapper } from '@/store/store';
import { fetchUserAction } from '@/store/user/action';
import Loading from '@/components/UI/Loading';

function MyApp({ Component, pageProps }) {
	const dispatch = useDispatch();
	const router = useRouter();
	const Layout = Component.Layout || DefaultLayout;
	const [loading, setLoading] = useState(false);

	//Loading
	useEffect(() => {
		router.events.on('routeChangeStart', () => setLoading(true));
		router.events.on('routeChangeComplete', () => setLoading(false));
		router.events.on('routeChangeError', () => setLoading(false));

		return () => {
			router.events.off('routeChangeStart', () => setLoading(true));
			router.events.off('routeChangeComplete', () => setLoading(false));
			router.events.off('routeChangeError', () => setLoading(false));
		};
	}, [router]);

	useEffect(() => {
		dispatch(fetchUserAction());
	}, [dispatch]);

	return <Layout>{loading ? <Loading /> : <Component {...pageProps} />}</Layout>;
}

export default wrapper.withRedux(MyApp);

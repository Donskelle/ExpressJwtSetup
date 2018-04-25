import Loadable from 'react-loadable';
import LoadingComponent from './../../components/LoadingComponent';

export const AsyncPasswortVergessen = Loadable({
    loader: () => import("./PasswortVergessen"),
    loading: LoadingComponent
});

export const AsyncPasswortReset = Loadable({
    loader: () => import("./PasswortReset"),
    loading: LoadingComponent
});

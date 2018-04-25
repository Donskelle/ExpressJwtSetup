import Loadable from 'react-loadable';
import LoadingComponent from './../../components/LoadingComponent';

const AsyncImpressum = Loadable({
    loader: () => import("./Impressum"),
    loading: LoadingComponent
});

export default AsyncImpressum;
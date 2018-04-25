import Loadable from 'react-loadable';
import LoadingComponent from './../../components/LoadingComponent';

const AsyncHome = Loadable({
    loader: () => import("./Home"),
    loading: LoadingComponent
});

export default AsyncHome;
import Loadable from 'react-loadable';
import LoadingComponent from './../../components/LoadingComponent';

const AsyncRegistrieren = Loadable({
    loader: () => import("./Registrieren"),
    loading: LoadingComponent
});

export default AsyncRegistrieren;
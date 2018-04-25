import Loadable from 'react-loadable';
import LoadingComponent from './../../components/LoadingComponent';

const AsyncProfil = Loadable({
    loader: () => import("./Profil"),
    loading: LoadingComponent,
});

export default AsyncProfil;
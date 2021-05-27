import {useContext} from 'react';
import {LoadingContext} from "../components/Loading/LoadingProvider";

function useLoading() {
    const loading = useContext(LoadingContext);

    return [loading.loading, loading.setLoading];
}

export default useLoading;
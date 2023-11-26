import { useQuery } from "@apollo/client";
import { getSecurityDetailByTickerQuery,
         getSecuritiesQuery
        } from './queries';

function useSecurity(ticker) {
    const { data, loading, error } = useQuery(getSecurityDetailByTickerQuery, {
        variables: { ticker },
    });
    return {
        security: data?.security,
        loading,
        error: Boolean(error),
        errorMessage: error ? error.message : ''
    };
}

function useSecurities() {
    const { data, loading, error } = useQuery(getSecuritiesQuery);
    return {
        securities: data?.securities,
        loading,
        error: Boolean(error),
        errorMessage: error ? error.message : ''
    };
}

export {
    useSecurity,
    useSecurities,
}
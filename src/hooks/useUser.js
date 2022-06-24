import { useApolloClient } from "@apollo/client";

const useUser = ()=>{
     const client = useApolloClient()
     return client
}

export default useUser
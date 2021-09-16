import {useRouter} from "next/router";
import {useAuth0} from "@auth0/auth0-react";
import {Instagram} from "react-content-loader";

export default function Home() {
    const router = useRouter();
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    if (isLoading)
        return <Instagram />;
    if (isAuthenticated)
        router.push("/dashboard");
    else {
        loginWithRedirect()
    }
    return <div>Loading...</div>
}
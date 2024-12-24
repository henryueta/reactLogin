import { useSearchParams,useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";



const Profile = () => {

    const {logout,isLogged} = useAuth()
    const navigate = useNavigate();
    const {userLogged} = useAuth();
    const [searchParams] = useSearchParams();

    const params = {

        id: searchParams.get("id")

    }

    useEffect(()=>{
            
        if(!isLogged){
            navigate("/");
        }

},[isLogged])

    return (

        <section>

            {` Welcome ${userLogged.username} !`}
            <button onClick={logout}>Logout</button>
        </section>

    )


}

export default Profile;
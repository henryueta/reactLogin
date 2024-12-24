import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export interface userType {
    username?:string,
    email: string,
    password: string
}

type AuthActionType = "login" | "register"



interface AuthProps {

    userLogged: userType
    isLogged:boolean,
    dataError:string
    logout:()=>void
    handleDataUser: (user: userType, AuthActionType: AuthActionType) => userType
}


const AuthContext = createContext<AuthProps>({} as AuthProps);


const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [userList, setUserList] = useState<userType[]>([]);
    const [userLogged, setUserLogged] = useState<userType>({
        email: "",
        password: ""
    });
    const [isLogged,setIsLogged] = useState<boolean>(()=>{

        const savedLogged = localStorage.getItem("isLogged");
        return !!savedLogged
    })
    const [dataError,setDataError] = useState<string>("");

    const queryUsers = async () => {
        try{
            console.log("loading . . .")
            const response = await axios.get("https://dummyjson.com/users");
        return response.data
        }
        catch(error){
            console.log(error)
        }
        finally{
            console.log("Alright")
        }
    }

    useEffect(() => {
        (async () => {
            const { users } = await queryUsers();
            setUserList(users);
        })()
    }, [])

    interface AuthDataResponse {

        conditional: boolean
        onEquality: (auth?:AuthActionType) => void
    }

    const handleDataUser = (userData: userType, AuthActionType: AuthActionType):userType => {
        let response: AuthDataResponse = {
            conditional: false,
            onEquality: () => { }
        };
        const onResponse = (cond: boolean, onResult: () => void) => {
            return response = {
                conditional: cond,
                onEquality: onResult
            }
        }


        const queryUsers = userList.find((ind) => {

            const checkAuthActionType = {

                "login": () => {

                    onResponse(ind.email === userData.email && ind.password === userData.password, () => {
                        setUserLogged(ind)
                        setIsLogged(true)
                        setDataError("")
                        console.log(userLogged)
                        localStorage.setItem("isLogged","true");
                    })

                },
                "register": () => {
                    onResponse(ind.email === userData.email || ind.username === userData.username, () => {
                        setDataError("Email ou Username já existem")
                    })

                }

            }

            checkAuthActionType[AuthActionType]()
            return response.conditional
        })

        const checkBoolean: AuthDataResponse[] = [
            {
                conditional: true,
                onEquality: () => {
                    return response.onEquality()
                }
            },
            {
                conditional: false,
                onEquality:(AuthActionType?:AuthActionType)=>{
                    (()=>{
                        
                        const checkAuthActionType = {

                            "login":()=>{
                                console.log("erro ao logar")
                                setDataError("usuário inexistente")

                            },
                            "register":()=>{
                                console.log("sucesso ao cadastrar")
                                setDataError("")
                                setUserList((prev)=>
                                         [...prev,{...userData}]
                                )
                            }

                        }
                        return checkAuthActionType[AuthActionType!]()

                    })()
                }
                }
            
        ]


        checkBoolean.find((ind) =>
            ind.conditional === response.conditional
        )?.onEquality(AuthActionType)  
        return userLogged
    }

    const logout = ()=>{

        setIsLogged(false)
        localStorage.removeItem("isLogged");
    
    
    }

    useEffect(()=>{
        console.log(userList)
    },[userList])

    return (
        <AuthContext.Provider value={
            {
                userLogged,
                isLogged,
                dataError,
                logout,
                handleDataUser
            }
        }>
            {children}
        </AuthContext.Provider>
    )

}

const useAuth = () => {
    const context = useContext(AuthContext)
    return context;
}



export {
    AuthContext,
    AuthProvider,
    useAuth
}
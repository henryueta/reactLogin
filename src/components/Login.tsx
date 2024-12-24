import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { useAuth, userType } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const schema = z.object({
    email: z.string().refine((value) => value.trim().length > 0, {
        message: "campo email deve ser preenchido!"
    }),
    password: z.string().refine((value) => value.trim().length > 0, {
        message: "campo senha deve ser preenchido!"
    }),
});

type FormType = z.infer<typeof schema>

const Login = () => {
    const navigate  = useNavigate();
    const [stado,setStado] = useState<string>("");
    const {userLogged,isLogged,handleDataUser,dataError} = useAuth();

    const onLogin = (data:userType)=>{
        handleDataUser(data,"login")
    }

    useEffect(()=>{
            if(isLogged){
                navigate("/profile?id="+1);
            }
            console.log(isLogged)
    },[isLogged])

    const { register, formState ,handleSubmit} = useForm<FormType>({
        mode: 'all',
        reValidateMode: "onSubmit",
        resolver: zodResolver(schema)
    });

    const { errors } = formState;

    return (


        <form action="" onSubmit={handleSubmit(onLogin)}>
        <p>{stado}</p>
        <p>{userLogged.email}</p>

            <input type="email" {...register("email", {
                required: true,
            })} />
            <p>{errors?.email?.message}</p>
            <input type="password" {...register("password", {
                required: true
            })} />
            <p>{errors?.password?.message}</p>

            <button>Login</button>
            <button type="button"  onClick={()=>navigate('/register')}>Criar Conta</button>
            <p>{dataError}</p>
        </form>

    )

}

export default Login
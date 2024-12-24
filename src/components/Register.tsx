import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from "react"
import { useAuth, userType } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const verifyIsEmpty = (value:string):boolean=>{
    return value.trim().length > 0
}

const schema = z.object({
    username: z.string().refine((value) => verifyIsEmpty(value), {
        message: "Campo username é obrigatório"
    }),
    email:z.string().refine((value)=>verifyIsEmpty(value),{
        message:"Campo email é obrigatório"
    }),
    password:z.string().refine((value)=>verifyIsEmpty(value),{
        message: "Campo senha é obrigatório"
    })

})
type FormType = z.infer<typeof schema>

const Register = () => {
    const navigate = useNavigate();
    const {handleDataUser,dataError} = useAuth();

    const onRegister = (data:userType)=>{
      return  handleDataUser(data,"register")
    }

    const { register, formState,handleSubmit } = useForm<FormType>({
        mode: "all",
        reValidateMode: "onSubmit",
        resolver: zodResolver(schema)
    });

    const { errors } = formState;


    return (

        <form action="" onSubmit={handleSubmit(onRegister)}>

            <input type="text" {...register("username", {
                required: true
            })} />
            <p>{errors?.username?.message}</p>

            <input type="email" {...register("email",{
                required:true
            })}/>
            <p>{errors?.email?.message}</p>

            <input type="passord" {...register("password",{
                required:true
            })}/>
            <p>{errors?.password?.message}</p>

            <button>Cadastrar</button>
            <button type="button" onClick={()=>navigate("/")}>Entrar</button>
            <p>{dataError}</p>
        </form>

    )

}

export default Register
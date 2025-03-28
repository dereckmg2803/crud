import { useForm, Controller} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button, Input, FileUpload, Float, useFileUploadContext } from "@chakra-ui/react"
import { PasswordInput } from "./ui/password-input"
import { LuFileImage, LuX } from "react-icons/lu"
import './FormUser.css'
import { DatePicker } from "antd"
import dayjs from 'dayjs'
import { useEffect } from "react"
import { useState } from "react"
const schema = z.object({
    name: z.string().min(1, { message: 'El nombre es requerido' }),
    lastname: z.string().min(1, { message: 'El apellido es requerido' }),
    email: z.string().email({ message: 'Correo invalido' }),
    password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    birthdate: z.date({
        required_error: "La fecha de nacimiento es requerida"
    })
    .refine(date => {
        const today = dayjs();
        const birthday = dayjs(date);
        return today.diff(birthday, 'year') >= 18;
    }, {
        message: "Debes ser mayor de 18 años"
    }),
    url: z.string().nonempty()
})

const dateFormat = 'YYYY-MM-DD';


function FormUser({user = null, closeModal }) {
    const [dataForm, setDataForm] = useState()

    useEffect(() => {
        if (user) setDataForm(user)
    }, [user])

    const { register, handleSubmit, watch, reset, control, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            birthdate: dayjs(data.birthdate).format('YYYY-MM-DD') // Convierte Date a string
        };

        console.log(formattedData);

       
        reset();

        if (closeModal) {
            closeModal(); // Cierra el modal después de enviar el formulario
        }

        if (user) {
            
        } else{

        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="form" >
                <div className="card">
                    <label >
                        <p>Nombre(s):</p>
                        <Input
                            {...register('name')}
                            placeholder='Escribe tu nombre'
                        />
                        {errors.name && <p className="error-message">{errors.name.message}</p>}
                    </label>
                </div>

                <div className="card">
                    <label >
                        <p>Apellidos:</p>
                        <Input
                            {...register('lastname')}
                            placeholder='Escribe tu apellido'
                        />
                        {errors.lastname && <p className="error-message">{errors.lastname.message}</p>}
                    </label>
                </div>




                <div className="card">
                    <label >
                        <p>Correo:</p>
                        <Input
                            type='email'
                            {...register('email')}
                            placeholder='Escribe tu correo'
                        />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </label>
                </div>

                <div className="card">
                    <label >
                        <p>Contraseña:</p>
                        <PasswordInput
                            type='password'
                            {...register('password')}
                            placeholder='Escribe tu contraseña'
                        />
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </label>
                </div>

                <div className="card">
    <label>
        <p>Cumpleaños:</p>
        <Controller
    control={control}
    name="birthdate"
    render={({ field }) => (
        <DatePicker
            {...field}
            format={dateFormat}
            placeholder="Seleccionar fecha"
            className="birthdate-input"
            value={field.value ? dayjs(field.value) : null} // Convierte Date a dayjs para mostrarlo en el DatePicker
            onChange={(date) => field.onChange(date ? date.toDate() : null)} // Convierte dayjs a Date para almacenarlo en el formulario
        />
    )}
/>

        {errors.birthdate && <p className="error-message">{errors.birthdate.message}</p>}
    </label>
</div>

<div className="card">
<p>Imagen:</p>
                <Input
              
                
                    type="url"
                    placeholder='Adjunta una imagen'
                    {...register("url")}
                />
                {errors.url && <p className="error-message">{errors.url.message}</p>}
            </div>

                <Button type='submit' variant="subtle" className="button-form">{user ? 'Edit' : 'Add'}</Button>
            </form>
        </div>
    )
}

export default FormUser
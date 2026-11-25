import { CircleAlert } from "lucide-react";
import { fieldClass } from "./inputFieldStyle";

export default function InputField({ error, register, id, placeholder, label, fieldName, type }) {
    return <div>
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
            {label} <span className="text-danger">*</span>
        </label>
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            aria-invalid={error ? "true" : undefined}
            {...register(fieldName)}
            className={fieldClass(!!error)}
        />
        {error && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger" role="alert">
                <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {error.message}
            </p>
        )}
    </div>
}
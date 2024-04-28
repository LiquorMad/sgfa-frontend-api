import { HTMLAttributes } from 'react'
interface Props extends HTMLAttributes<HTMLParagraphElement> {
    messages?: string
}

const InputError = ({ messages, className = '', ...props }: Props) => (
    <span>
        { messages}
    </span>
)

export default InputError

interface Props {
    children: React.ReactNode;
}

export const FormGroup = ({ children }: Props ) => {
    return (
        <div className="grid md:grid-cols-2 md:gap-6">{children}</div>
    )
}
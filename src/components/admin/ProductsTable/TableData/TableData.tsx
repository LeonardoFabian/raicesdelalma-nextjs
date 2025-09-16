interface Props {
    children: React.ReactNode,
}

export const TableData = ({ children } : Props ) => {
    return (
         <td className="px-6 py-4">
            { children }
        </td>
    )
}
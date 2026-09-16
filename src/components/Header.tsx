

/** Header Properties. */
type HeaderProps = {
    text: string
}

/**
 * 
 * @param param0 
 * @returns 
 */
export function Header( { text }: HeaderProps ) {
    return (
        <h1 className="h3 my-4 text-center">{ text }</h1>
    );
}

export default Header;
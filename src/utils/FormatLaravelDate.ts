/**
 * Formats a Laravel UTC timestamp into a clean, human-readable date.
 * @param dateString - '2026-09-15T16:26:29.000000Z'
 * @returns '16 September 2026' or '16/09/2026' depending on configuration
 */
export const formatDate = ( dateString: string | undefined | null ): string => {

    if ( !dateString ) {
        return '';
    }

    const date = new Date( dateString );

    // Check if the date parsing was valid
    if ( isNaN( date.getTime() )) {
        return '';
    }

    // Returns formatted string like: "16 September 2026"
    return new Intl.DateTimeFormat( 'en-AU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format( date );

};
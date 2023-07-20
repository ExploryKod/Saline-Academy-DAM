export function capitalizeFirstLetter(str) {
    if(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    } else {        
    return str;
    }
}

export function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    // Janvier is month 0
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
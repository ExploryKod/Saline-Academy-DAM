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
    // Janvier est 0 donc on ajoute 1
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// @param date: string
export function calculateDelayFromToday(date) {
    const today = new Date();
    date = new Date(date);
    // Nombre de milisecondes dans une journée
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; 
    const differenceInMilliseconds = Math.abs(date - today);
    const differenceInDays = Math.round(differenceInMilliseconds / oneDayInMilliseconds);
    return differenceInDays;
  };
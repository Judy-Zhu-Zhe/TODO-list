export const formattingDate = (date) => {
    const arr = date.toLocaleDateString().split('/');
    if (arr[1] < 10) arr[1] = '0' + arr[1];
    if (arr[2] < 10) arr[2] = '0' + arr[2];
    return arr.join('-');
}

export const isOverDue = (due) => {
    const todayStr = formattingDate(new Date());
    return due && due.localeCompare(todayStr) === -1;
}

export const isCloseDue = (due) => {
    const todayStr = formattingDate(new Date());
    return due && due.localeCompare(todayStr) === 0;
}

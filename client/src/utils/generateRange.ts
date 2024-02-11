export const generateRange = (start: number = 1, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (item, index) => {
        console.log(item);
        return start + index;
    });
};

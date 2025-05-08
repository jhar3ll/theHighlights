export function capitalizeWords(word: string){
    let result = "";
    for (let i=0; i<word.length; i++){
        if (i === 0) result = word[0].toUpperCase();
        else if ([" ", "-"].includes(word[i-1])) result += word[i].toUpperCase();
        else result += word[i];
    }

    return result;
}
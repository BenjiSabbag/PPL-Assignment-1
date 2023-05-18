import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
export const countLetters:(str: string) => {[key: string]: number} = (str) => {
    const strLow = R.toLower(str);
    const strArr = stringToArray(strLow).filter(x => x != " ");
    return strArr.reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });
    };


/* Question 2 */
export const isPaired:(str: string) => boolean = (str) => {
    const strArr = stringToArray(str);
    const parArr = strArr.filter(letter => letter === '{' || letter === '}' || letter === '[' || letter === ']' || letter === '(' || letter === ')');
    const check = (s: string[]): boolean =>{
        if (s.length === 0) {
            return true;
        } else if (s.length % 2 !== 0) {
            return false;
        } else if (s[0] === ')' || s[0] === ']' || s[0] === '}') {
            return false;
        } else {
            const opening = s[0];
            const closing = opening === '(' ? ')' : opening === '[' ? ']' : '}';
            const i = s.indexOf(closing);
            return i !== -1 && check(s.slice(1, i)) && check(s.slice(i + 1));
        }
    }
    return check(parArr);
}

/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence : (t: WordTree) => string = (t) => {
    let str: string = t.root;
    if (t.children.length === 0)
        // t is a leaf - cannot go down
        return str;
    else return str + t.children.reduce((acc, curr) => acc + " " + treeToSentence(curr), ""); // recursive case
}


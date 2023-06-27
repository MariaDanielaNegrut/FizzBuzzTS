import * as fs from 'fs';


type RulePosition = {
    normal: boolean;
    start?: boolean;
    end?: boolean;
    beforeWord?: string;
    afterWord?: string;
}


type Rule = {
    // for now all are multiples
    number: number;
    word?: string;
    position?: RulePosition;
    effect?: "clear" | "reverse" | "priority";
}


var allRules: Rule[] = [];

function setup(): void {
    // Arguments of interest start at index 2
    if (process.argv.length > 2) {
        const filePath: string = process.argv[2];
        const jsonString: string = fs.readFileSync(filePath, 'utf-8');

        try {
            const rulesRead = JSON.parse(jsonString).rules;
            allRules = allRules.concat(rulesRead);
        } catch (error) {
            console.log("Provided file doesnt respect format.");
            return;
        }
    }

    allRules.sort((a, b) => {
        return a.number - b.number
    });
}

function fizzbuzzCustom(limit: number): void {
    for (let i: number = 1; i <= limit ; i++) {
        let text: string[] = [];
        let cleared: boolean = false;

        let applicableRules: Rule[] = allRules.filter(rule => {
           return i % rule.number === 0;
        });

        applicableRules.forEach(rule => {
            if (rule.effect === "clear") {
                text = [];
                cleared =  true;
            }

            if (rule.effect === "reverse") {
                text.reverse();
            }

            if (rule.position != undefined && rule.word != undefined && (!cleared || rule.effect === "priority" || rule.effect === "clear")) {
                let position: RulePosition = rule.position;

                if (position.beforeWord !== undefined) {
                    let pozB: number = -1;
                    let word = position.beforeWord;

                    text.forEach((item:string, index:number) => {
                        if (item.startsWith(word)) {
                            pozB = index;
                            return;
                        }
                    })

                    if (pozB != -1) {
                        text.splice(pozB, 0, rule.word);
                    } else {
                        if (position.start === true) {
                            text.splice(0, 0, rule.word);
                        } else if (position.end === true) {
                            text.splice(text.length - 1, 0, rule.word);
                        }
                    }
                }
                else if (position.afterWord !== undefined) {
                    let pozB: number = -1;
                    let word = position.afterWord;

                    text.forEach((item:string, index:number) => {
                        if (item.startsWith(word)) {
                            pozB = index;
                            return;
                        }
                    })

                    if (pozB != -1) {
                        text.splice(pozB + 1, 0, rule.word);
                    } else {
                        if (position.start === true) {
                            text.splice(0, 0, rule.word);
                        } else if (position.end === true) {
                            text.splice(text.length - 1, 0, rule.word);
                        }
                    }
                }
                else if (position.normal === true) {
                    text.push(rule.word);
                } else if (position.start === true) {
                    text.splice(0, 0, rule.word);
                } else if (position.end === true) {
                    text.splice(text.length, 0, rule.word);
                }
            }
        });

        if (text.length === 0) {
            console.log(i.toString());
        } else {
            console.log(text.join(""));
        }
    }
}

setup();
fizzbuzzCustom(100);

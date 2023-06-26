// This is our main function
function fizzbuzz(n: number): void {
    for (let i = 1; i <= n; i++) {
        let text: string[] = [];

        if (i % 3 == 0) {
            text.push("Fizz");
        }

        if (i % 5 == 0) {
            text.push("Buzz");
        }

        if (i % 7 == 0) {
            text.push("Bang");
        }

        if (i % 11 == 0) {
            text = [];
            text.push("Bong");
        }

        if (i % 13 == 0) {
            let pozB:number = -1;

            text.forEach((item:string, index:number) => {
                if (item.startsWith("B")) {
                    pozB = index;
                    return;
                }
            })

            if (pozB != -1) {
                text.splice(pozB, 0, "Fezz");
            } else {
                text.push("Fezz");
            }
        }

        if (i % 17 == 0) {
            text.reverse();
        }

        if (text.length > 0) {
            console.log(text.join(""));
        } else {
            console.log(i.toString());
        }

    }
}

// Now, we run the main function:
fizzbuzz(200);
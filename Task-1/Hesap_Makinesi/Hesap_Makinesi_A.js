let rl = require('readline');

rl = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

function hesapMakinesi(){ 
    rl.question("1. sayıyı giriniz: ", (sayi1) => {
        rl.question("2. sayıyı giriniz: ", (sayi2) => {
            rl.question("Yapılacak işlemi giriniz: ", (islem) => {
                const num1 = parseInt(sayi1);
                const num2 = parseInt(sayi2);
                
                if (isNaN(num1) || isNaN(num2)) {
                    console.log("Lütfen geçerli sayılar giriniz");
                    rl.question("Yeni işlem yapmak istiyor musunuz? (e/h)", (cevap) => {
                        if (cevap === "e") {
                            hesapMakinesi();
                        } else {
                            rl.close();
                        }
                    });
                    return;
                }
                
                if (islem === "+") {
                    console.log(num1 + num2);
                } else if (islem === "-") {
                    console.log(num1 - num2);
                } else if (islem === "*") {
                    console.log(num1 * num2);
                } else if (islem === "/") {
                    if (num2 === 0) {
                        console.log("0'a bölme hatası");
                    } else {
                        console.log(num1 / num2);
                    }
                } else {
                    console.log("Geçersiz işlem");
                } 
                
                rl.question("Yeni işlem yapmak istiyor musunuz? (e/h)", (cevap) => {
                    if (cevap === "e") {
                        hesapMakinesi();
                    } else {
                        rl.close();
                    }
                });
            });
        });
    });
}

hesapMakinesi();
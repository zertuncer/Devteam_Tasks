let rl = require('readline');

rl = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

function guessNumber(){ 
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    
    function tahminEt() {
        rl.question("Sayıyı tahmin edin: ", (sayi) => {
            const tahmin = parseInt(sayi);
            
            if (tahmin === randomNumber) {
                console.log("Tebrikler, doğru sayıyı tahmin ettiniz!");
                rl.question("Yeni tahmin oyunu istiyor musunuz? (e/h)", (cevap) => {
                    if (cevap === "e") {
                        guessNumber();
                    } else {
                        rl.close();
                    }
                });
            } else if (tahmin < randomNumber) {
                console.log("Daha büyük bir sayı giriniz.");
                tahminEt(); // Aynı sayı için tekrar sor
            } else {
                console.log("Daha küçük bir sayı giriniz.");
                tahminEt(); // Aynı sayı için tekrar sor
            }
        });
    }
    
    tahminEt();
}

guessNumber();
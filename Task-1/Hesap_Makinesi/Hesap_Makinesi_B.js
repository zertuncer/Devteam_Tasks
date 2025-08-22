let rl = require('readline');

rl = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

function hesapMakinesi(){ 
    rl.question("1. sayıyı giriniz: ", (sayi1) => {
        rl.question("2. sayıyı giriniz: ", (sayi2) => {
            rl.question("İşlemi giriniz (+, -, *, /): ", (islem) => {
                const num1 = parseInt(sayi1);
                const num2 = parseInt(sayi2);
                
                if (isNaN(num1) || isNaN(num2)) {
                    console.log("Lütfen geçerli sayılar giriniz!");
                } else {
                    let sonuc;
                    switch(islem) {
                        case '+':           // islem === "+" ise
                            sonuc = num1 + num2;
                            break;          // switch'ten çık
                            
                        case '-':           // islem === "-" ise
                            sonuc = num1 - num2;
                            break;
                            
                        case '*':           // islem === "*" ise
                            sonuc = num1 * num2;
                            break;
                            
                        case '/':           // islem === "/" ise
                            sonuc = num2 === 0 ? "Sıfıra bölme hatası" : num1 / num2;
                            break;
                            
                        default:            // Hiçbiri değilse
                            sonuc = "Geçersiz işlem";
                    }
                    console.log("Sonuç:", sonuc);
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
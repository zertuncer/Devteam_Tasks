let rl = require('readline');

rl = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

function hesapMakinesi(){ 
    rl.question("İşlemi giriniz (örn: 5+3): ", (islem) => {
        try {
            const sonuc = eval(islem);
            console.log("Sonuç:", sonuc);
        } catch (error) {
            console.log("Geçersiz işlem!");
        }
        
        rl.question("Yeni işlem yapmak istiyor musunuz? (e/h)", (cevap) => {
            if (cevap === "e") {
                hesapMakinesi();
            } else {
                rl.close();
            }
        });
    });
}

hesapMakinesi();
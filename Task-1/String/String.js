let rl = require('readline');

rl = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

function Input(){ 
    rl.question("Cümle giriniz: ", (sentence) => {
        console.log("Cümleni tersi(harflerin sırası değiştirilmiş):", sentence.split("").reverse().join(""))
        console.log("Cümleni tersi(sadece kelimelerin sırası değiştirilmiş):", sentence.split(" ").reverse().join(" "))
        const dizi = sentence.split(" ");
        console.log("Kelime sayısı:", dizi.length);
        sentence = dizi.join("")
        console.log("Harf sayısı:", sentence.length);

        
        rl.question("Yeni cümle girmek istiyor musunuz? (e/h)", (cevap) => {
            if (cevap === "e") {
                Input();
            } else {
                rl.close();
            }
        });
    });
}

Input();
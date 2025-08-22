class Person {
  static classnameCount = 0; // oluşturulmuş toplam Person instance'larının sayısı
  #age;
  name;

  constructor(name, age) {
    this.name = name;
    this.#age = age; // setter üzerinden doğrula
    Person.classnameCount++; // instance oluşturulduğunda sayacı artır
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    if (!Number.isInteger(value) || value < 0 || value > 100) {
      console.log("Uyarı: Yaş 0-100 arasında bir tam sayı olmalıdır.");
      process.exit();
    }
    this.#age = value;
  }

  introduce() {
    return `Merhaba, ben ${this.name}. ${this.age} yaşındayım.`;
  }

  static count() {
    return Person.classnameCount; // classnameCount'u döndür
  }
}

class Student extends Person {
  static classnameCount = 0; // oluşturulmuş toplam Student instance'larının sayısı
  #studentNo;

  constructor(name, age, studentNo) {
    super(name, age);
    this.#studentNo = studentNo;
    Student.classnameCount++; // Student instance oluşturulduğunda sayacı artır
  }

  introduce() {
    return `Merhaba, ben ${this.name}. ${this.age} yaşındayım. Öğrenci numaram: ${this.#studentNo}.`;
  }

  static count() {
    return Student.classnameCount; // Student classnameCount'u döndür
  }
}

class Instructor extends Person {
    static classnameCount = 0; // oluşturulmuş toplam Instructor instance'larının sayısı
    #branch;
    constructor(name, age, branch) {
        super(name, age);
        this.#branch = branch;
        Instructor.classnameCount++; // Instructor instance oluşturulduğunda sayacı artır
    }
    introduce() {
        return `Merhaba, ben ${this.name}. ${this.age} yaşındayım. Branşım: ${this.#branch}.`;
      }
      static count() {
        return Instructor.classnameCount; // Instructor classnameCount'u döndür
      }
}

const p1 = new Person("Ali", 23);
const s1 = new Student("Bahadır", 21, 123456);
const s2 = new Student("Elif", 20, 123457);
const i1 = new Instructor("Ahmet", 30, "Matematik");
console.log(p1.introduce());
console.log(s1.introduce());
console.log(i1.introduce());

console.log(Person.count());
console.log(Student.count());
console.log(Instructor.count());
//============================== NO 1 ===================

let str = "NEGIE1";

let splitStr = str.split("");
let sliceStr = splitStr.slice(0, splitStr.length - 1);
let int = splitStr.slice(-1);
let revStr = sliceStr.reverse();
revStr.push(int[0]);
let output1 = revStr.join("");
console.log(output1);

//============================== NO 2 ======================

let sentence = "Saya sangat senang mengerjakan soal algoritma";
let splitSentece = sentence.split(" ");
let output2 = "";
splitSentece.forEach((el) => {
  if (el.length > output2.length) {
    output2 = el;
  }
});
console.log(`${output2}: ${output2.length} character`);

//============================== NO 3 =======================
const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];
let output3 = [];
let counter = 0;

QUERY.forEach((el) => {
  INPUT.forEach((ele) => {
    if (el == ele) {
      counter++;
    }
  });
  output3.push(counter);
  counter = 0;
});
console.log(output3);

//============================== NO 4 ========================

const Matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];
const first = [];
const second = [];

for (let i = 0; i < Matrix.length; i++) {
  const el = Matrix[i];
  for (let j = 0; j < el.length; j++) {
    const ele = el[j];
    if (i === j) {
      first.push(ele);
    }
    if (i === el.length - 1 - j) {
      second.push(ele);
    }
  }
}
let totalFirst = 0;
let totalSecond = 0;
first.forEach((el) => {
  totalFirst += el;
});
second.forEach((el) => {
  totalSecond += el;
});

let result = totalFirst - totalSecond;
console.log(result);

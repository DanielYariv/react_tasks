class Counter {
  //cunstructor
  constructor() {
    this.num = 0;
  }

  //class methods
  Initialize(num_from_user) {
    if (Number.isInteger(num_from_user) == false || num_from_user <= 0) {
      alert("please enter only positive integer");
      return;
    }
    this.num = num_from_user;
  }

  Increment() {
    this.num++;
  }
  Go() {
    let arr = [];
    for (let i = 0; i <= this.num; i++) {
      arr.push(i);
    }
    dynamicP.innerHTML = arr.join(", ");
    //console.log(arr.join(", "));
  }
}
let number = document.getElementById("numFromUser");
let btnStart = document.getElementById("btnStart");
let btnPlus = document.getElementById("btnPlus");
let btnGo = document.getElementById("btnGo");
let dynamicP = document.getElementById("dynamic_p");
number.addEventListener("click", function () {
  btnPlus.disabled = true;
  btnGo.disabled = true;
  dynamicP.innerHTML = "";
});
btnStart.addEventListener("click", function () {
  c1 = new Counter();
  c1.Initialize(Number(number.value));
  btnPlus.disabled = false;
  btnGo.disabled = false;
});
btnPlus.addEventListener("click", function () {
  c1.Increment();
  number.value = Number(number.value) + 1;
});
btnGo.addEventListener("click", function () {
  c1.Go();
});

class Duck {
  constructor(name, color, age, weight, img) {
    this.name = name;
    this.color = color;
    this.age = age;
    this.weight = weight;
    this.img = img;
  }
  Show() {
    let str = "";
    str += `<h3>duck details:</h3>`;
    str += `duck name: ${this.name}<br>`;
    str += `duck color: <span style="color:${this.color}">${this.color}</span><br>`;
    str += `duck age: ${this.age}<br>`;
    str += `duck weight: ${this.weight}<br>`;
    str += `<img src="${this.img}" alt="duck" width="150" height="150"><br>`;

    document.getElementById("dynamic_p").innerHTML = str;
  }
  Quack() {
    let num_of_quacks = Math.round((this.age * this.weight) / 2);
    let str = "";
    for (let i = 0; i < num_of_quacks; i++) {
      str += `Quack, `;
    }
    document.getElementById("dynamic_p").innerHTML = str;

    if (this.counter_audio < 3) {
      this.counter_audio++;
      document.getElementById("duck_audio").play();
      setTimeout(() => this.Quack(), 1500);
    }
  }
}
const form = document.getElementById("duck_form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const elementsArr = form.elements;
  const inputsArr = [];
  inputsArr.push(
    elementsArr[0].value, //name
    elementsArr[1].value, //color
    elementsArr[2].value, //age
    elementsArr[3].value, //weight
    elementsArr[4].value //img
  );
  const pass_validation = validaionFunc(inputsArr);
  if (pass_validation == true) {
    duck1 = new Duck(
      inputsArr[0], //name
      inputsArr[1], //color
      inputsArr[2], //age
      inputsArr[3], //weight
      inputsArr[4] //img
    );
    document.getElementById("show").hidden = false;
    document.getElementById("quack").hidden = false;
    for (let i = 0; i < elementsArr.length; i++) {
      elementsArr[i].disabled = "true";
    }
  } else {
    alert("Please fill out the entire form");
  }
});
function validaionFunc(inputsArr) {
  for (let input of inputsArr) {
    if (input == "") {
      return false;
    }
  }
  return true;
}

//show event listener
const btnShow = document.getElementById("show");
btnShow.addEventListener("click", function () {
  duck1.Show();
});
const btnQuack = document.getElementById("quack");
btnQuack.addEventListener("click", function () {
  duck1.counter_audio = 0;
  duck1.Quack();
});

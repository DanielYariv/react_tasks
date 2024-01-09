class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  Show() {
    console.log(`(${this.x},${this.y})`);
  }
  Equals(p) {
    if (p.x == this.x && p.y == this.y) {
      return true;
    }
    return false;
  }
}
//function for question 4.2
function Is_identical(pointsArr, x, y) {
  for (let i = 0; i < pointsArr.length; i++) {
    if (pointsArr[i].x == x && pointsArr[i].y == y) {
      return true;
    }
  }
  return false;
}
//general array for question 4.2,4.3
let pointsArray = [];
let point1 = new Point(1, 2);
let point2 = new Point(2, 3);
let point3 = new Point(12, 9);
let point4 = new Point(-4, -2);
pointsArray.push(point1, point2, point3, point4);

//example for question 4.2
console.log(Is_identical(pointsArray, 1, 2)); //true
console.log(Is_identical(pointsArray, 3, 8)); //false

//function for question 4.3
function Is_equals(pointsArr, pointObj) {
  return pointsArr.find((point) => point.Equals(pointObj)) !== undefined;
}

//example for question 4.3
let pointObj1 = new Point(-4, -2);
let pointObj2 = new Point(-9, -2);
console.log(Is_equals(pointsArray, pointObj1)); //true
console.log(Is_equals(pointsArray, pointObj2)); //false

//question 4.4
let pointsInRoadArray = [
  new Point(1, 2),
  new Point(2, 3),
  new Point(12, 9),
  new Point(3, 6),
  new Point(7, 11),
];
function distance() {
  let totdistance = 0;
  for (let i = 0; i < pointsInRoadArray.length - 1; i++) {
    totdistance += Math.sqrt(
      Math.pow(pointsInRoadArray[i].x - pointsInRoadArray[i + 1].x, 2) +
        Math.pow(pointsInRoadArray[i].y - pointsInRoadArray[i + 1].y, 2)
    );
  }
  return totdistance.toFixed(2);
}
function Show() {
  let str = "";
  for (let i = 0; i < pointsInRoadArray.length; i++) {
    str += `point ${i + 1}: (${pointsInRoadArray[i].x},${
      pointsInRoadArray[i].y
    })<br/> `;
  }
  document.getElementById("points").innerHTML = str;
  str = "";
  str = `the distance is:${distance()}`;
  document.getElementById("distance").innerHTML = str;
}
Show();

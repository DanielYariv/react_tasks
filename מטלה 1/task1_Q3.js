const countryList = [
  "United States",
  "USA",
  "Canada",
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and/or Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Croatia (Hrvatska)",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "France, Metropolitan",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard and Mc Donald Islands",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, Democratic People's Republic of",
  "Korea, Republic of",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libyan Arab Jamahiriya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova, Republic of",
  "Monaco",
  "Mongolia",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia South Sandwich Islands",
  "Spain",
  "Sri Lanka",
  "St. Helena",
  "St. Pierre and Miquelon",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen Islands",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States minor outlying islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City State",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna Islands",
  "Western Sahara",
  "Yemen",
  "Yugoslavia",
  "Zaire",
  "Zambia",
  "Zimbabwe",
];

class Clock {
  constructor(country, hours, minutes, secondes) {
    this.country = country;
    this.hours = hours;
    this.minutes = minutes;
    this.secondes = secondes;
  }
  ConverToSeconds() {
    return (
      Number(this.hours * 3600) +
      Number(this.minutes * 60) +
      Number(this.secondes)
    );
  }
  Show() {
    let strhour = this.hours;
    let strminutes = this.minutes;
    let strsecondes = this.secondes;
    if (this.hours.toString().length < 2) {
      strhour = `0${this.hours}`;
    }
    if (this.minutes.toString().length < 2) {
      strminutes = `0${this.minutes}`;
    }
    if (this.secondes.toString().length < 2) {
      strsecondes = `0${this.secondes}`;
    }
    return `${strhour}:${strminutes}:${strsecondes}`;
  }
}
const form = document.getElementById("clock_form");
console.log(form);
const elementsArr = form.elements;
console.log(elementsArr);
let clocksArr = [];
console.log(clocksArr);
let counter = 5;
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const checkCountry = countryValidation();
  if (emptyInputValidation() == false) {
    alert("Please fill out the entire form");
    return;
  }
  if (checkCountry == true) {
    let clock = new Clock(
      elementsArr[0].value, //country
      elementsArr[1].value, //hours
      elementsArr[2].value, //minutes
      elementsArr[3].value //seconds
    );
    clocksArr.push(clock);
    console.log(clocksArr);
    form.reset();
    counter--;
    document.getElementById("counter").innerHTML = `${counter} more to submit!`;
    if (counter == 0) {
      let str = "";
      for (let i = 0; i < clocksArr.length; i++) {
        let time = clocksArr[i].Show();
        str += `clock number ${i + 1}: Country: ${
          clocksArr[i].country
        }, Time: ${time}, Time in Seconds: ${clocksArr[
          i
        ].ConverToSeconds()}<br/>`;
      }
      document.getElementById("counter").innerHTML = "THE CLOCKS YOU SUBMITED:";
      document.getElementById("dynamic_p").innerHTML = str;
    }
  }
  if (checkCountry == false) {
    alert("please enter valid country");
  }
});

function countryValidation() {
  const countrys = countryList.map((country) => country.trim().toLowerCase());
  let country_from_user = elementsArr[0].value.trim().toLowerCase();
  if (countrys.find((country) => country == country_from_user) !== undefined) {
    return true;
  }
  return false;
}
function emptyInputValidation() {
  for (let i = 0; i < elementsArr.length; i++) {
    if (elementsArr[i].value === "") {
      return false;
    }
  }
  return true;
}

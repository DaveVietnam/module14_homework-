//ВСЕ ЗАДАНИЯ В ОДНОМ JS ФАЙЛЕ

// Задание 1

// Создание экземпляра класса DOMParser. Он позволит нам парсить XML
const parser = new DOMParser();

const xmlString = `
  <list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// Получение всех DOM-нод

const students = xmlDOM.querySelectorAll("student"); //returns a nodelist that we turn into an arr with array.from
const result = {
  list: Array.from(students).map((student) => {
    const nameElement = student.querySelector("name");
    const firstName = student.querySelector("first").textContent;
    const lastName = student.querySelector("second").textContent;
    return {
      name: `${firstName} ${lastName}`,
      age: Number(student.querySelector("age").textContent),
      prof: student.querySelector("prof").textContent,
      lang: nameElement.getAttribute("lang"),
    };
  }),
};

console.log(result);

// Задание 2
const jsonString = `{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}`;

const data = JSON.parse(jsonString);
console.log("data", data);
const list = data.list;
console.log(typeof list);
console.log(list);

const result2 = {
  list: list.map((student) => {
    return {
      name: student.name,
      age: student.age,
      prof: student.prof,
    };
  }),
};

console.log(result2);

// Задание 3
const btn = document.querySelector("button");

btn.addEventListener("click", () => {
  const input = document.getElementById("numberInput").value;
  const number = parseInt(input, 10);
  const resultDiv = document.getElementById("result");

  // Очистка результата
  resultDiv.innerHTML = "";

  // Проверка на диапазон от 1 до 10
  if (isNaN(number) || number < 1 || number > 10) {
    resultDiv.innerText = "Число вне диапазона от 1 до 10";
    return;
  }

  // Создание XHR запроса
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://jsonplaceholder.typicode.com/photos?_limit=${number}`,
    true
  );

  xhr.onload = function () {
    if (xhr.status === 200) {
      const photos = JSON.parse(xhr.responseText);
      resultDiv.innerHTML = photos
        .map(
          (photo) =>
            `<p>${photo.title}</p><img src="${photo.thumbnailUrl}" alt="${photo.title}">`
        )
        .join("");
    } else {
      resultDiv.innerText = "Ошибка при получении данных";
    }
  };

  xhr.onerror = function () {
    resultDiv.innerText = "Произошла ошибка при выполнении запроса";
  };

  xhr.send();
});

// Задание 4

const submit = document.getElementById("submit");

const outOfRange = function (number) {
  return isNaN(number) || number < 100 || number > 300;
};

submit.addEventListener("click", () => {
  const input1 = document.getElementById("numberInput1").value;
  const input2 = document.getElementById("numberInput2").value;
  const number1 = parseInt(input1, 10);
  const number2 = parseInt(input2, 10);
  const resultDiv = document.getElementById("result1");

  // Очистка результата
  resultDiv.innerHTML = "";

  // Проверка на диапазон от 1 до 10
  if (outOfRange(number1) || outOfRange(number2)) {
    resultDiv.innerText = "Число вне диапазона от 100 до 300";
    return;
  }

  fetch(`https://dummyimage.com/${number1}x${number2}/cfcfcf/000000.png`)
    .then((response) => response.blob()) //get the image as a blob
    .then((blob) => {
      const photosURL = URL.createObjectURL(blob); //create a local URL
      resultDiv.innerHTML = `<img src="${photosURL}">`; //display the image
    })
    .catch((err) => console.log(err));

  //*The .blob() method in JavaScript is used with the fetch API to handle binary data, such as images, videos, or other file types, here we png as an example
});

// Задание 5
const submitBtn = document.getElementById("submitBtn");
const outOfRange2 = function (number) {
  return isNaN(number) || number < 1 || number > 10;
};

submitBtn.addEventListener("click", async () => {
  try {
    const inputPage = document.getElementById("numberInput3").value;
    const inputLimit = document.getElementById("numberInput4").value;
    const pageNumber = parseInt(inputPage, 10);
    const limitNumber = parseInt(inputLimit, 10);
    const resultDiv = document.getElementById("result2");

    // Очистка результата
    resultDiv.innerHTML = "";

    // Проверка на диапазон от 1 до 10
    if (outOfRange2(pageNumber)) {
      return console.log("Номер страницы вне диапазона от 1 до 10");
    } else if (outOfRange2(limitNumber)) {
      return console.log("Лимит вне диапазона от 1 до 10");
    } else if (outOfRange2(pageNumber) && outOfRange2(limitNumber)) {
      return console.log("Номер страницы и лимит вне диапазона от 1 до 10");
    }

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=${limitNumber}`
    );
    console.log(response);

    const data = await response.json();
    console.log(data);

    resultDiv.innerHTML = data
      .map((photo) => `<img src="${photo.url}" alt="${photo.title}" />`)
      .join("");
  } catch (err) {
    console.error(err.message);
  }
});

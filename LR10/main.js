// Отримуємо елементи галереї
const thumbBar = document.querySelector('.thumb-bar');
const displayedImg = document.querySelector('.displayed-img');
const overlay = document.querySelector('.overlay');
const btn = document.querySelector('button');

// Зациклювання для створення мініатюр зображень
for (let i = 1; i <= 5; i++) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/pic${i}.jpg`);
  thumbBar.appendChild(newImage);

  // Обробник для натискання на мініатюру
  newImage.onclick = function () {
    displayedImg.src = newImage.getAttribute('src');
  };
}

// Обробник для кнопки затемнення/підсвічування
btn.onclick = function () {
  const currentClass = btn.getAttribute('class');
  if (currentClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighter';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darker';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
};
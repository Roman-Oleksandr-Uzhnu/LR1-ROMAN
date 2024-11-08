document.addEventListener("DOMContentLoaded", () => {
    const movieContainer = document.getElementById("movieContainer");
    const noResultsMessage = document.createElement("div");
    noResultsMessage.id = "noResultsMessage";
    noResultsMessage.innerText = "Нічого не знайдено";
    noResultsMessage.style.display = "none";
    noResultsMessage.style.textAlign = "center";
    noResultsMessage.style.fontSize = "18px";
    noResultsMessage.style.color = "#ff6600"; // Помаранчевий колір
    movieContainer.appendChild(noResultsMessage);

    const genreFilter = document.getElementById("genreFilter");
    const directorFilter = document.getElementById("directorFilter");
    const releaseYearFilter = document.getElementById("releaseYearFilter");
    const languageFilter = document.getElementById("languageFilter");
    const sortOption = document.getElementById("sortOption");
    const searchInput = document.getElementById("search");

    let movies = [];

    fetch("movies.json")
        .then(response => response.json())
        .then(data => {
            movies = data;
            populateFilters();
            displayMovies(movies);
        });

    function populateFilters() {
        const genres = [...new Set(movies.map(movie => movie.genre))];
        const directors = [...new Set(movies.map(movie => movie.director))];
        const years = [...new Set(movies.map(movie => movie.releaseYear))];
        const languages = [...new Set(movies.map(movie => movie.language))];

        genres.forEach(genre => genreFilter.innerHTML += `<option value="${genre}">${genre}</option>`);
        directors.forEach(director => directorFilter.innerHTML += `<option value="${director}">${director}</option>`);
        years.forEach(year => releaseYearFilter.innerHTML += `<option value="${year}">${year}</option>`);
        languages.forEach(language => languageFilter.innerHTML += `<option value="${language}">${language}</option>`);
    }

    function displayMovies(filteredMovies) {
        movieContainer.innerHTML = "";
        movieContainer.appendChild(noResultsMessage); // Додаємо повідомлення до контейнера фільмів
        
        if (filteredMovies.length === 0) {
            noResultsMessage.style.display = "block"; // Показуємо повідомлення
        } else {
            noResultsMessage.style.display = "none"; // Ховаємо повідомлення
            filteredMovies.forEach(movie => {
                const movieCard = document.createElement("div");
                movieCard.classList.add("movie-card");
                movieCard.innerHTML = `
                    <img src="${movie.image}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <p>${movie.director}</p>
                    <p>${movie.genre} | ${movie.releaseYear}</p>
                    <p>Рейтинг: ${movie.rating}</p>
                `;
                movieCard.addEventListener("click", () => showModal(movie));
                movieContainer.appendChild(movieCard);
            });
        }
    }

    function filterAndSortMovies() {
        let filteredMovies = movies;

        if (genreFilter.value) filteredMovies = filteredMovies.filter(movie => movie.genre === genreFilter.value);
        if (directorFilter.value) filteredMovies = filteredMovies.filter(movie => movie.director === directorFilter.value);
        if (releaseYearFilter.value) filteredMovies = filteredMovies.filter(movie => movie.releaseYear == releaseYearFilter.value);
        if (languageFilter.value) filteredMovies = filteredMovies.filter(movie => movie.language === languageFilter.value);
        if (searchInput.value) filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(searchInput.value.toLowerCase()));

        const sortBy = sortOption.value;
        filteredMovies.sort((a, b) => {
            if (sortBy === "rating") return b.rating - a.rating;
            if (sortBy === "releaseYear") return b.releaseYear - a.releaseYear;
            return a.title.localeCompare(b.title);
        });

        displayMovies(filteredMovies);
    }

    genreFilter.addEventListener("change", filterAndSortMovies);
    directorFilter.addEventListener("change", filterAndSortMovies);
    releaseYearFilter.addEventListener("change", filterAndSortMovies);
    languageFilter.addEventListener("change", filterAndSortMovies);
    sortOption.addEventListener("change", filterAndSortMovies);
    searchInput.addEventListener("input", filterAndSortMovies);

    function showModal(movie) {
        document.getElementById("modalTitle").innerText = movie.title;
        document.getElementById("modalDirector").innerText = "Режисер: " + movie.director;
        document.getElementById("modalGenre").innerText = "Жанр: " + movie.genre;
        document.getElementById("modalYear").innerText = "Рік випуску: " + movie.releaseYear;
        document.getElementById("modalLanguage").innerText = "Мова: " + movie.language;
        document.getElementById("modalRating").innerText = "Рейтинг: " + movie.rating;
        document.getElementById("modalActors").innerText = "Актори: " + movie.actors.join(", ");
        document.getElementById("modalDuration").innerText = "Тривалість: " + movie.duration;
        document.getElementById("modalBudget").innerText = "Бюджет: " + (movie.budget || "Невідомо");
        document.getElementById("modalDescription").innerText = movie.description;
        document.getElementById("modalTrailer").href = movie.trailer;
        document.getElementById("modalImage").src = movie.image;

        document.getElementById("movieModal").style.display = "flex";
    }

    document.getElementById("closeModal").addEventListener("click", () => {
        document.getElementById("movieModal").style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === document.getElementById("movieModal")) {
            document.getElementById("movieModal").style.display = "none";
        }
    });
});

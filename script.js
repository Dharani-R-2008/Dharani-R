// ===============================
// VETRI CINEMAS - JAVASCRIPT
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // Welcome message
    console.log("Welcome to Vetri Cinemas!");

    // Movie cards
    const movieCards = document.querySelectorAll(".movie-card");

    movieCards.forEach(function (card) {

        card.addEventListener("click", function () {

            // Remove selection from other cards
            movieCards.forEach(function (item) {
                item.classList.remove("selected");
            });

            // Select clicked movie
            card.classList.add("selected");

            const movieName = card.querySelector("h3").textContent;

            console.log("Selected Movie: " + movieName);
        });
    });


    // Book Ticket buttons
    const bookButtons = document.querySelectorAll(".book-button");

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            // Stop direct link for a moment
            event.preventDefault();

            // Find movie name
            const movieCard = button.closest(".movie-card");
            const movieName = movieCard.querySelector("h3").textContent;

            // Confirmation message
            const confirmBooking = confirm(
                "🎬 Movie: " + movieName +
                "\n\nDo you want to book tickets?"
            );

            if (confirmBooking) {

                // Open booking website
                window.open(
                    "https://in.bookmyshow.com/",
                    "_blank"
                );

            } else {

                console.log("Booking cancelled");

            }

        });

    });


    // Explore Movies button
    const exploreButton = document.querySelector(".main-button");

    if (exploreButton) {

        exploreButton.addEventListener("click", function () {

            document.querySelector("#movies").scrollIntoView({
                behavior: "smooth"
            });

        });

    }

});

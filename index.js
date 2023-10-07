document.addEventListener("DOMContentLoaded", function() {
  // Get all elements with the class "category-card"
  var categoryCards = document.querySelectorAll(".category-card");

  // Get the modal elements by ID
  var modal = document.getElementById("myModal");
  var modalTitle = document.getElementById("modalTitle");
  var modalImage = document.getElementById("modalImg"); // Get the image element
  var modalDetails = document.getElementById("modalDetails");

  // Function to open the modal with image details
  function openModal(title, imageSrc, details) {
    modalTitle.textContent = title;
    modalImage.src = imageSrc; // Set the image source
    modalDetails.innerHTML = details;
    modal.style.display = "block";
  }

  // Function to close the modal
  function closeModal() {
    modal.style.display = "none";
  }

  // Attach click event listeners to each category card
  categoryCards.forEach(function(card) {
    card.addEventListener("click", function() {
      var title = card.querySelector("h2").textContent;
      var imageSrc = card.querySelector("img").src;
      var details = card.querySelector(".details").innerHTML;
      openModal(title, imageSrc, details); // Open the modal with image details
    });
  });

  // Attach click event listener to the modal close button
  var closeButton = document.getElementById("closeModal");
  closeButton.addEventListener("click", function() {
    closeModal(); // Close the modal when the close button is clicked
  });

  // Attach click event listener to the modal itself to close it
  modal.addEventListener("click", function(event) {
    if (event.target === modal) {
      closeModal(); // Close the modal if you click outside the modal
    }
  });

  // Attach keyboard event listener to close modal with Esc key
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      closeModal(); // Close the modal when the Escape key is pressed
    }
  });

  // Initially hide details within each category card
  categoryCards.forEach(function(card) {
    var details = card.querySelector(".details");
    details.style.display = "none";
  });

  // Get the container where flower images and content will be loaded
  var flowerCategory = document.getElementById("flowerCategory");

  // Specify the folder where your flower images are located
  var folderPath = "images/flower/";

  // Function to fetch image files from a folder
  function fetchImages() {
    // Fetch a list of image files from the folder
    fetch(folderPath)
      .then(response => response.text())
      .then(data => {
        // Parse the HTML response to extract image file names
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, "text/html");
        var links = doc.querySelectorAll("a");

        var flowerImages = [];

        links.forEach(function(link) {
          var href = link.getAttribute("href");
          if (href.match(/\.(jpe?g|png|gif)$/)) {
            var title = "Title " + (flowerImages.length + 1);
            var description = "Description " + (flowerImages.length + 1);
            var imageSrc = folderPath + href;

            var details = [
              { title: "Detail 1", content: "Detail 1 Content" },
              { title: "Detail 2", content: "Detail 2 Content" },
              { title: "Detail 3", content: "Detail 3 Content" }
            ];

            flowerImages.push({ src: imageSrc, title: title, description: description, details: details });
          }
        });

        // Generate HTML for the images
        flowerImages.forEach(function(imageData) {
          var categoryCard = document.createElement("div");
          categoryCard.classList.add("category-card", "image-modal-trigger");

          var image = document.createElement("img");
          image.src = imageData.src;
          image.alt = "Flower Image";

          var title = document.createElement("h2");
          title.textContent = imageData.title;

          var description = document.createElement("p");
          description.textContent = imageData.description;

          var detailsContainer = document.createElement("div");
          detailsContainer.classList.add("details");

          imageData.details.forEach(function(detail) {
            var detailElement = document.createElement("div");

            var detailTitle = document.createElement("h3");
            detailTitle.textContent = detail.title;

            var detailContent = document.createElement("p");
            detailContent.textContent = detail.content;

            detailElement.appendChild(detailTitle);
            detailElement.appendChild(detailContent);

            detailsContainer.appendChild(detailElement);
          });

          categoryCard.appendChild(image);
          categoryCard.appendChild(title);
          categoryCard.appendChild(description);
          categoryCard.appendChild(detailsContainer);

          // Add a click event listener to open the modal
          categoryCard.addEventListener("click", function() {
            openModal(imageData.title, imageData.src, imageData.details);
          });

          // Append the category card to the flowerCategory container
          flowerCategory.appendChild(categoryCard);
        });
      })
      .catch(error => {
        console.error("Error fetching images:", error);
      });
  }

  // Call the fetchImages function to load flower images
  fetchImages();
});

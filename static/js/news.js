document.addEventListener("DOMContentLoaded", () => {
  Papa.parse("./static/data/news.csv", {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;
      const cardsDiv = document.getElementById("cards");

      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `
          <p>${item.category}</p>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          <a href = "${item.url}">
            <p class = "read-more">Read More</p>
          </a>
        `;
        cardsDiv.appendChild(card);
      });
    }
  });
});

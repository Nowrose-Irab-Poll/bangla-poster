document.addEventListener('DOMContentLoaded', function() {
    var rowItems = document.querySelectorAll('#grid-container-row #grid-banner .col');
  
    rowItems.forEach(function(item) {
      item.addEventListener('click', function(event) {
        var param1 = 'image';
        var imageUrl = event.target.src.split("/").pop();
        var queryString = encodeURIComponent(param1) + '=' + encodeURIComponent(imageUrl);
        var url = CONFIG.ROOT_DOMAIN+ "poster-engine.html?" + queryString;
  
  
        window.location.href = url;
      });
    });
  });
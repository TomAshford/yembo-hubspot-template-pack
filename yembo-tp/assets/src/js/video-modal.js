document.addEventListener("DOMContentLoaded", function() {

  if (document.querySelector(".open-video")) {

    // open modal on click
    document.addEventListener("click", function(e) {
      var target = e.target;

      // Check if the target or one of its parent elements is the anchor with class 'open-video'
      var videoLink = target.closest('.open-video');
      if (videoLink) {
        e.preventDefault();

        // Get data from the button click
        var triggerURL = videoLink.getAttribute('href');
        var triggerID = videoLink.getAttribute('data-target');

        // Update modal attributes with trigger data
        var videoModal = document.querySelector('.videoModal');
        videoModal.setAttribute('data-video', triggerURL);
        videoModal.id = triggerID;

        var modalID = '#' + videoLink.dataset.target;
        var modal = document.querySelector(modalID);
        modal.classList.add('modal--open');

        // Open modal
        modal.style.display = "block";
        modal.classList.add('modal--open');

        var htm = '<div class="modal__wrapper"><a href="#" class="modal--close" role="button" tabindex="0"></a><iframe width="640" height="360" src="' + triggerURL + '" frameborder="0" allowfullscreen ></iframe></div><div class="modal__overlay"></div>';

        // Append iframe to parent modal
        modal.innerHTML = htm;
        modal.querySelector('.modal--close').focus();

        return false;
      }
    });

    // close modal
    document.addEventListener("click", function(e) {
      var target = e.target;
      if (target.classList.contains("modal--close") || target.classList.contains("modal__overlay")) {
        e.preventDefault();
        var modals = document.querySelectorAll('.modal');
        modals.forEach(function(modal) {
          modal.style.display = "none";
          modal.innerHTML = '';
          modal.setAttribute('data-video', "");
          modal.removeAttribute('id');
          modal.classList.remove('modal--open');
        });
      }
    });

  }

});

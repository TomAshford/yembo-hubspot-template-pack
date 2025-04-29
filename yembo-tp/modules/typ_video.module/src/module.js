document.addEventListener("DOMContentLoaded", function() {
    const iframeContainers = document.querySelectorAll('.iframe_wrapper--embed');
    const videoContainers = document.querySelectorAll('.iframe_wrapper--local');
    const ctrlVideo = document.getElementById('typVid');

    // Function to add click event listener to iframe containers
    function addIframeClickEvent(container) {
        container.addEventListener("click", function () {
            var playButton = document.querySelector('.typVideo__video__play');
            
            var iframe = container.querySelector('iframe');
            var iframeSrc = iframe.getAttribute('src');
            iframe.setAttribute('src', iframeSrc + "&autoplay=1");
            if (playButton.classList.contains("active")) {
                playButton.classList.remove("active");
            } else {
                playButton.classList.add("active");
            }
        });
    }

    // Function to toggle video playback and controls
    function toggleVideoPlayback() {
        var playButton = document.querySelector('.typVideo__video__play');
    
        if (playButton.classList.contains("active")) {
            ctrlVideo.setAttribute('controls', 0);
            ctrlVideo.pause();
            playButton.classList.remove("active");
        } else {
            ctrlVideo.setAttribute('controls', 1);
            ctrlVideo.play();
            playButton.classList.add("active");
        }
    }

    // Add click event listener to iframe containers if they exist
    if (iframeContainers.length > 0) {
        iframeContainers.forEach(function (container) {
            addIframeClickEvent(container);
        });
    }


    // Add click event listener to video play buttons if video containers exist
    if (videoContainers.length > 0) {
        var playButton = document.querySelector('.typVideo__video__play');
        playButton.addEventListener("click", function (e) {
            e.preventDefault();
            toggleVideoPlayback();
        });
    }

});
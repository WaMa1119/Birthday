const video =
  document.getElementById(
    "introVideo"
  );

const giftSection =
  document.getElementById(
    "giftSection"
  );

// Intentar autoplay
window.addEventListener(
  "load",
  () => {

    video.play().catch(
      (err) => {
        console.log(err);
      }
    );

  }
);

// Cuando termina el video
video.addEventListener(
  "ended",
  () => {

    giftSection.style.display =
      "block";

    giftSection.scrollIntoView({
      behavior: "smooth"
    });

  }
);
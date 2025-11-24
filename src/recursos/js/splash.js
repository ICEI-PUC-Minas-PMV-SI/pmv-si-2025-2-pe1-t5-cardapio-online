// Splash screen animation script
// Handles timing for logo reveal

document.addEventListener('DOMContentLoaded', function() {
  const splashScreen = document.querySelector('.splash-screen');
  const loader = document.querySelector('.splash-screen__loader');

  // Duration: 3s total - logo animation
  setTimeout(() => {
    // After 3s, transition to app (simulate)
    splashScreen.style.opacity = 0;
    setTimeout(() => {
      // Redirect or hide splash
      splashScreen.style.display = 'none';
      // In real app, navigate to main page
      console.log('Splash complete, transitioning to app...');
    }, 500);
  }, 3000);
});

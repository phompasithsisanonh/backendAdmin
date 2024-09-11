// const { promotionEndTimeInMinutes } = req.body; // Get the promotion end time in minutes

// if (promotionEndTimeInMinutes === undefined) {
//     return res.status(400).send('Promotion end time in minutes is required.');
// }

// const now = new Date();
// const endDate = new Date(now.getTime() + promotionEndTimeInMinutes * 60 * 1000); // Calculate end date
// const timeLeftMs = endDate - now; // Time left in milliseconds
// console.log(timeLeftMs);

// if (timeLeftMs <= 0) {
//     return res.send('Promotion has already ended.');
// }

// const timeLeftMin = Math.ceil(timeLeftMs / (1000 * 60)); // Convert time left to minutes

// // Set up a timer to perform an action when the promotion ends
// setTimeout(() => {
//     console.log('Promotion ended!');
//     // Perform actions like sending notifications, updating databases, etc.
// }, timeLeftMs);

// res.send(`Promotion timer set. It will end in ${timeLeftMin} minutes.`);









// const countdown = (expirationDate) => {
//     const now = new Date();
//     const difference = expirationDate - now;
  
//     if (difference <= 0) {
//       return 'The promotion has expired.';
//     }
  
//     const seconds = Math.floor(difference / 1000) % 60;
//     const minutes = Math.floor(difference / 1000 / 60) % 60;
//     const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
//     const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  
//     return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
//   };
  
//   const expirationDate = new Date(2024, 8, 10, 10, 55, 59); // Set your expiration date here
//   console.log('Countdown Timer');
  
//   const printCountdown = () => {
//     const remainingTime = countdown(expirationDate);
//     console.log(`Time remaining until promotion expires: ${remainingTime}`);
//   };
  
//   // Print countdown every second
//   setInterval(printCountdown, 1000);
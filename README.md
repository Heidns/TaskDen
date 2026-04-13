<img width="1920" height="1019" alt="image" src="https://github.com/user-attachments/assets/d9e5398f-a2c5-48b1-a432-51010641b777" /># TaskDen 🪷

TaskDen is a serene, zen-inspired to-do list web application designed to keep your mind clear and your tasks organized. Built with a focus on tranquility, it features a calming UI with glass-morphism effects and a peaceful background to help you get into a productive flow state.

## ✨ Features

* **Task Management:** Easily add, complete, and delete tasks.
* **Smart Categorization:** Tag your tasks as *Work*, *Personal*, or *Urgent*.
* **Priority Levels:** Assign *High*, *Medium*, or *Low* priorities. Tasks are color-coded with subtle borders for quick scanning.
* **Live Filtering:** Instantly filter your view by *All*, *Active*, *Completed*, or *High Priority*.
* **Progress Tracking:** Watch your productivity grow with a live progress bar and task statistics (Total, Done, Remaining).
* **Data Persistence:** Your tasks are automatically saved to your browser's Local Storage, so they'll still be there when you come back.
* **Serene UI:** A beautiful, responsive design featuring a misty mountain backdrop, sage green accents, and a frosted-glass aesthetic.

## 🛠️ Tech Stack

This project is built using purely standard web technologies. No frameworks or external libraries required!
* **HTML5:** Semantic structure.
* **CSS3:** Custom properties (variables), Flexbox, responsive design, and backdrop-filter (glass-morphism).
* **Vanilla JavaScript (ES6+):** DOM manipulation, event handling, and Local Storage integration.

## 📂 File Structure

The project is split into three clean, manageable files:
* `index.html` — The main layout and structure of the app.
* `style.css` — The styling, animations, and "Serene Zen" theme configuration.
* `script.js` — The logic for adding, deleting, filtering, and saving tasks.

## 🚀 How to Run Locally

Since this is a vanilla web project, getting it running is incredibly simple:

1. Clone or download this repository to your local machine.
2. Ensure all three files (`index.html`, `style.css`, `script.js`) are located in the exact same folder.
3. Double-click the `index.html` file to open it in your default web browser.

*Note: For the best experience, an active internet connection is recommended upon first load to fetch the Google Fonts (Syne and DM Sans) and the Unsplash background image.*

## 🎨 Customization

Want to change the background? 
Open `style.css`, locate the `body` selector, and replace the URL with a link to your preferred image.

```css
body {
  font-family: 'DM Sans', sans-serif;
  /* Calming misty mountain and lake scene */
  background: linear-gradient(rgba(18, 33, 29, 0.3), rgba(18, 33, 29, 0.5)), 
              url('https://images.pexels.com/photos/4095186/pexels-photo-4095186.jpeg') no-repeat center center fixed;
  background-size: cover;
  color: var(--text);
  min-height: 100vh;
  padding: 2rem 1rem 4rem;
}

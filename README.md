<img width="540" height="1196" alt="image" src="https://github.com/user-attachments/assets/f813e8a2-96f7-4b53-81a9-245882bba767" />

💊 Smart Medicine Reminder & Expiry Alert (JIVAI)






A lightweight web-based medicine reminder system that helps users track medicines, get dose reminders, and detect expired medicines in real time. The app also includes a simple AI-style assistant (JIVAI) for safety explanations and guidance.
________________________________________
🚀 Features
•	➕ Add Medicines with name, time, and expiry date
•	⏰ Dose Reminder Alerts (missed dose detection)
•	❌ Expired Medicine Detection
•	🧹 Delete Expired Medicines with one click
•	🔔 Browser Notifications (PWA-ready)
•	🤖 JIVAI Assistant for safety explanations
•	🌐 Works Online / Local Network Friendly
•	📱 Mobile-friendly UI
________________________________________
🖼️ Screenshots
Screenshots are included in the README for UI preview (medicine list, alerts, assistant, and notifications).
________________________________________
🛠️ Tech Stack
•	Frontend: HTML, CSS, JavaScript
•	Backend: JavaScript (Node-style logic)
•	AI Functions: Custom JS functions (jivai-function/)
•	Notifications: Browser Notification API
•	PWA Support: Service Worker (sw.js)
________________________________________
📂 Project Structure
.
├── app.js              # Main application logic
├── chat.js             # JIVAI assistant logic
├── index.html          # Main UI
├── sw.js               # Service Worker (notifications / PWA)
├── jivai-function/     # AI helper functions
├── favicon.ico
├── README.md
└── .idea/
________________________________________
⚙️ Setup & Run
1️⃣ Clone the repository
git clone https://github.com/Shubham12gupta/<repo-name>.git
cd <repo-name>
2️⃣ Run locally
You can serve it using any static server:
npx serve .
or
python -m http.server 8080
Then open:
http://localhost:8080
________________________________________
🔔 Enable Notifications
•	Click Enable Notifications in the UI
•	Allow browser permission
•	The app will notify you when:
o	A dose is missed
o	A medicine has expired
________________________________________
⚠️ Safety Note
Expired medicines may lose effectiveness or become unsafe.
This app does not replace medical advice. Always consult a healthcare professional.
________________________________________
🧠 JIVAI Assistant
The built-in JIVAI Assistant helps explain:
•	Medicine safety
•	Expiry risks
•	Reminder usage
It uses rule-based AI logic for fast and offline-friendly responses.
________________________________________
🌱 Future Improvements
•	Cloud sync & user accounts
•	WhatsApp / SMS reminders
•	Medicine barcode scanning
•	Doctor / prescription upload
•	Multilingual support
________________________________________
👨‍💻 Author
Shubham Gupta
DevOps & LLM Engineer
________________________________________
⭐ Support
If you find this project useful, consider giving it a ⭐ on GitHub!



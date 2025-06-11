📱 CampusConnect+ Complex Computing Problem (CCP)
1. Introduction
🎯 Objective & Goals
CampusConnect+ is a cross-platform mobile application developed using React Native and Expo CLI. Its primary goal is to enhance student engagement in campus activities by providing:

Smart Event Discovery: Browse and search upcoming events with detailed information.

Seamless Registration & Check-In: Register for events and check in via QR codes.

Personalized Recommendations: AI-based suggestions based on user preferences.

Real-Time Feedback & Social Interaction: Rate events, leave comments, and view an activity feed.

Modern UI/UX & Accessibility: Dark/light theme support, responsive design, and accessibility features.

2. Designed Model
2.1 UI Sketches & Mockups
🏠 Home Screen
Header: App title, search bar, collapsible on scroll.

Category Chips: Horizontal chips (e.g., “All”, “Tech”, “Social”).

AI Recommendations: Carousel of “Recommended For You” event cards.

Event List: Animated list of event cards with image, title, date, venue.

📄 Event Details
Full-screen banner image

Event metadata (date, venue, category)

Description, tags, attendance stats

Actions: “Check-In / View Pass”, “Give Feedback”

Comments section with avatars and timestamps

👤 Profile Screen
User avatar, name, email

Preference toggles (Tech, Sports, etc.)

Dark mode switch

2.2 Flowcharts & Diagrams
🔄 App Navigation Flow
Launch → Home

Home → Event Details

Event Details → Check-In / Feedback / Comments

Home → Profile / Feed

📶 Data Flow
Mock API → fetch events → AsyncStorage cache

Registration → AsyncStorage → QRCode

Feedback → AsyncStorage → Activity Feed

3. Methodology
3.1 Tools & Technologies
Category	Tools/Libraries
Development	React Native, Expo CLI, Visual Studio Code
UI Components	react-native-elements, react-native-vector-icons
Animations	react-native-animatable
Local Storage	AsyncStorage
QR Code Generator	react-native-qrcode-svg
Data Source	Local JSON (mockEvents.json)
Version Control	Git & GitHub
Testing	React Native Debugger, Expo Go Emulator

3.2 Core Implementation Steps
🛠️ Project Setup
bash
Copy
Edit
expo init CampusConnectPlus
npm install react-native-elements react-native-qrcode-svg react-native-animatable
expo install react-native-svg expo-linear-gradient
🔍 Smart Event Discovery
Load mockEvents.json into state

Display events via FlatList and EventCard

Enable filtering/searching by title, tags, and category

✅ Event Registration & QR Check-In
Register button writes event info to AsyncStorage (registrations key)

Navigate to CheckInScreen, generate JSON payload

Render dynamic QR Code from payload

🤖 AI-Based Recommendations
Store user preferences in AsyncStorage

Use recommendationLogic.js for rule-based event filtering

💬 Feedback & Social Feed
Feedback form writes data to feedback key

Comments saved under comments_{eventId}

Feed screen aggregates and displays all feedback with animations

🧠 Search, Filter & Sort
Responsive search bar and category chips

Animated collapsible header for better UX

🌗 Themes & Accessibility
theme.js provides theme context and AsyncStorage persistence

High-contrast color schemes and font scaling

Toggle between light and dark modes from profile screen

4. Results & Discussion
4.1 Screenshots
Home Screen: Event list, search, and category filters
<img src="https://github.com/user-attachments/assets/1d931300-6e6c-4c3e-9c75-fc696945d930" alt="CampusConnect+ Event Screen" width="300" />

Event Details: Title, description, QR and feedback actions
<img src="https://github.com/user-attachments/assets/a2da02eb-5390-42fc-a8f8-0b14c352b17e" alt="CampusConnect Screenshot" width="300"/>

Check-In Screen: Displays a unique QR pass
<img src="https://github.com/user-attachments/assets/ed635902-439c-423b-b0b5-7f992616e1d3" alt="CampusConnect Screenshot" width="300"/>

Feedback Screen: User ratings and comment form
<img src="https://github.com/user-attachments/assets/efec800e-96e2-4112-bc71-3693563946c1" alt="CampusConnect Screenshot" width="300"/>

Feed Screen: Displays animated feedback entries
<img src="https://github.com/user-attachments/assets/63030c89-ad27-469e-ba49-fb8b6e8aa7c9" alt="CampusConnect Screenshot" width="300"/>

Profile Screen: Preferences and dark mode toggle
<img src="https://github.com/user-attachments/assets/ce73dc1d-15e6-4667-b131-5ee079bbde25" alt="CampusConnect Screenshot 1" width="300"/>
<br/>
<img src="https://github.com/user-attachments/assets/e5b09899-ef1e-4aa0-9bc2-4a5ab6243158" alt="CampusConnect Screenshot 2" width="300"/>


4.2 Functionality Verification
✅ Mock Data Loading: Immediate load from local JSON

✅ Navigation: Smooth screen transitions with react-navigation

✅ Persistence: AsyncStorage retains preferences and registrations

✅ Responsiveness: Adaptive layouts for all screen sizes

✅ Animations: Polished transitions and feedback

4.3 Limitations & Future Work
Limitation	Recommendation
Uses local JSON mock data	Replace with live REST API or Firebase
No user login	Integrate OAuth or Firebase Authentication
Lacks real-time notifications	Use Expo Push Notifications
Static recommendation logic	Incorporate ML-based personalization

5. Conclusion
CampusConnect+ meets all defined CCP requirements and provides a modern, scalable, and interactive solution for campus event engagement. With its AI-driven suggestions, responsive UI, and modular codebase, the app is well-positioned for future integration with backend services and user authentication platforms.


# Sample Snack app

Open the `App.js` file to start writing some code. You can preview the changes directly on your phone or tablet by scanning the **QR code** or use the iOS or Android emulators. When you're done, click **Save** and share the link!

When you're ready to see everything that Expo provides (or if you want to use your own editor) you can **Download** your project and use it with [expo cli](https://docs.expo.dev/get-started/installation/#expo-cli)).

All projects created in Snack are publicly available, so you can easily share the link to this project via link, or embed it on a web page with the `<>` button.

If you're having problems, you can tweet to us [@expo](https://twitter.com/expo) or ask in our [forums](https://forums.expo.dev/c/expo-dev-tools/61) or [Discord](https://chat.expo.dev/).

Snack is Open Source. You can find the code on the [GitHub repo](https://github.com/expo/snack).

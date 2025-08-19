# 🎶 Music Flow — React + Vite + Tailwind  

## 📖 Project Description  
Music Flow is a **music player web application** inspired by Spotify's interface, developed with **React, Vite, and Tailwind CSS**. The app provides a modern user experience with blur effects, gradients, and animations, focusing on clean UI and reusable components.  

## 🚀 Main Features  
- 📱 **Responsive interface**: Optimized for mobile, tablet, and desktop.  
- ▶️ **Audio player**: Play/pause controls with progress bar.  
- ⭐ **Song library**: Favorites system with persistence in **localStorage**.  
- 🔍 **Song search**: Real-time filtering by title or artist.  
- 📂 **Section navigation**: Home, Library, and Playing.  
- 🎨 **Modern visual effects**: Gradients, blur, animations, and transitions.  

## 🗂️ Project Structure  
src/  
├── components/       # Reusable components  
│   ├── layout/       # Structure components (Header, Sidebar, Player)  
│   └── tracks/       # Song-related components  
├── contexts/         # React contexts (Audio, Library)  
├── data/             # Static data (tracks.js)  
├── hooks/            # Custom hooks  
├── pages/            # Page components  
└── App.jsx           # Main component  

## ⚙️ Installation & Execution  
1. Clone the repository:  
git clone <REPOSITORY_URL>  
cd react-proyecto  

2. Install dependencies:  
npm install  

3. Run in development mode:  
npm run dev  

4. Build for production:  
npm run build  

5. Format code:  
npm run format  

## 🌐 Live Demo  
👉 [View Music Flow on Vercel](https://music-flow-proyect-2xa5.vercel.app/)
## 🛠️ Technologies Used  
- ⚛️ **React** – Library for building user interfaces  
- ⚡ **Vite** – Fast build tool for development  
- 🎨 **Tailwind CSS** – Utility-first CSS framework  
- 💾 **LocalStorage API** – Favorites data persistence  
- 🎵 **Web Audio API** – Audio playback  

## ✅ Implemented Features  
- Audio playback with play/pause controls  
- Persistent favorites system  
- Real-time search by title or artist  
- Section navigation without reloads  
- Responsive design across devices  
- Modern UI with gradients, blur, and animations  

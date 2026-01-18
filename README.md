# 🤖 Absurditron-9000

**Absurditron-9000** is a playful, AI-powered simulator that responds to silly, nonsensical, or absurd user prompts with humorous and unpredictable replies. The app is designed purely for entertainment, focusing on exaggerated reactions, creativity, and surprise rather than accuracy or usefulness.

🔗 **Live Demo:** https://absurditron-9000.vercel.app/  
📦 **GitHub Repository:** https://github.com/chinmay-260807/Absurditron-9000.git

---

## 🌟 Overview

Absurditron-9000 allows users to type absolutely anything—random words, strange questions, or complete nonsense—and receive a wacky AI-generated response. The app embraces chaos and creativity, turning every interaction into a fun experiment.

The project was built to explore AI integration in frontend apps, handle real production deployments, and learn how AI-powered applications differ between development environments and live hosting.

---

## ✨ Features

- 🎭 Accepts any silly or random user input  
- 🤖 Generates absurd AI-powered responses  
- 🌀 Unpredictable and playful interaction style  
- ⚡ Fast response handling with loading feedback  
- 📱 Fully responsive on all devices  
- 🧠 Powered by Gemini AI  
- 🚀 Deployed on Vercel with production-safe configuration  
- 🛑 Includes fallback UI to prevent blank screens  

---

## 🛠️ Tech Stack

- **React** – UI and component logic  
- **Vite** – Fast dev server and optimized builds  
- **TypeScript** – Type safety and maintainability  
- **Gemini API** – AI response generation  
- **HTML / CSS / JavaScript** – Core web technologies  
- **Vercel** – Hosting and deployment  

---

## 🎮 How to Use the App (Tutorial)

1. Open the app using the live demo link above.  
2. You’ll see a text input field on the screen.  
3. Type anything silly, random, or absurd.  
4. Click the **Submit** button.  
5. Absurditron-9000 will respond with a humorous and unpredictable message.  
6. Try multiple prompts to experience different chaotic responses.  

There are no rules—absurd inputs are encouraged.

---

## 🔐 Creating a Gemini API Key (Step-by-Step)

This app uses **Gemini AI**, so an API key is required for it to work correctly when deployed.

### Step 1: Open Google AI Studio
Go to:
```
https://aistudio.google.com
```

Sign in with your Google account.

---

### Step 2: Create an API Key
1. In Google AI Studio, open the **API keys** or **Get API key** section.  
2. Click **Create API Key**.  
3. Copy the generated API key (you will need it for deployment).

---

### Step 3: Add the API Key to Vercel

1. Go to **Vercel Dashboard**  
2. Select your **Absurditron-9000** project  
3. Open **Settings → Environment Variables**  
4. Add a new environment variable with:
   - **Key:** `VITE_GEMINI_API_KEY`
   - **Value:** *(Paste your Gemini API key)*
   - **Environment:** Production (and Preview if needed)
5. Save the variable

---

### Step 4: Redeploy the App
After adding the environment variable:
- Trigger a **new deployment** on Vercel
- The app will now be able to communicate with Gemini successfully

---

## 🧪 Run the Project Locally

```bash
# Clone the repository
git clone https://github.com/chinmay-260807/Absurditron-9000.git

# Navigate into the project folder
cd Absurditron-9000

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will run at:
```
http://localhost:5173
```

To use Gemini locally, create a `.env` file and add:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

---

## 📦 Build & Preview Production Version

```bash
npm run build
npm run preview
```

This generates the optimized production build inside the `dist/` folder.

---

## 🌐 Deployment (Vercel)

Absurditron-9000 is deployed using **Vercel** with the following configuration:

- **Framework Preset:** Vite  
- **Build Command:** `npm run build`  
- **Output Directory:** `dist`  
- **Environment Variable Required:** `VITE_GEMINI_API_KEY`

The app does **not rely on Google AI Studio at runtime**—it communicates directly with Gemini using the API key.

---

## 🧠 Development Challenges & Learnings

- Understanding the difference between AI Studio preview and live deployment  
- Properly configuring Gemini API access for production  
- Avoiding blank screens caused by missing API responses  
- Handling async AI calls safely with loading and error states  
- Deploying Vite + React apps correctly on Vercel  

---

## 💡 What I Learned

- Securely integrating AI APIs in frontend applications  
- Using environment variables correctly in production  
- Debugging deployment-only issues  
- Managing AI responses without blocking UI rendering  
- Building playful apps with stable production behavior  

---

## 📄 License

This project is open source and available under the **MIT License**.

---

Have fun embracing the absurd 🤖✨

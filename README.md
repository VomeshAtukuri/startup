# 🚀 Pitch Startup

**Pitch Startup** is a platform where entrepreneurs, visionaries, and innovators can pitch their startup ideas to the world. Users can create, showcase, and review startup ideas, fostering a collaborative ecosystem for innovation. Whether you're looking for feedback, co-founders, or investors, Pitch Startup is the place to be!

## 🌟 Features

- ✅ **Pitch Your Idea** – Create and share your startup idea with the community.
- 💬 **Community Reviews** – Other users can review, comment, and give constructive feedback on your pitch.
- 📷 **Image Uploads** – Upload pitch-related images securely via **Pinata Server**.
- 🔐 **Secure Authentication** – GitHub-based authentication powered by **NextAuth**.
- 🎨 **Beautiful UI** – Elegant, accessible, and modern UI built with **shadcn/ui**.
- 🚀 **Blazing Fast Performance** – Serverless architecture powered by **Neon PostgreSQL**.
- 📊 **Data Persistence** – Robust database handling using **Drizzle ORM**.
- 🔎 **Sleek Icons** – Enhanced UI using **lucide-react** icons.

---

## 🛠 Tech Stack

| Technology       | Purpose |
|-----------------|---------|
| **Next.js**     | Full-stack framework for building the app |
| **React.js**    | Frontend library for dynamic UI |
| **Drizzle ORM** | Type-safe ORM for interacting with Neon PostgreSQL |
| **Neon PostgreSQL** | Serverless database for efficient storage |
| **shadcn/ui**   | Pre-built UI components for a modern look |
| **NextAuth**    | Authentication system (GitHub provider) |
| **Pinata Server** | Decentralized image storage |
| **lucide-react** | Icon library for clean and modern UI |

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/atukurivomesh/pitch-startup.git
cd pitch-startup

### 2️⃣ Install Dependencies

```sh
npm install
# or
yarn install

### 3️⃣ Setup Environment Variables

Create a .env.local file in the root directory and add the following:

```sh
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
DATABASE_URL=your_neon_database_url
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key
PINATA_JWT=your_pinata_jwt
NEXT_PUBLIC_GATEWAY_URL=your_pinata_gateway_url

### 4️⃣ Run the Development Server

```sh
npm run dev
# or
yarn dev

Your app should now be running on http://localhost:3000 🚀.

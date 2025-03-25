# 🚀 Pitch Startup

**Pitch Startup** is a platform designed for entrepreneurs, visionaries, and innovators to pitch their startup ideas to the world. Users can create, showcase, and review startup ideas, fostering a collaborative ecosystem for innovation. Whether you're seeking feedback, co-founders, or investors, Pitch Startup is the place to be!

## 🌟 Features

- ✅ **Pitch Your Idea** – Share your startup idea with the community.
- 💬 **Community Reviews** – Receive constructive feedback and comments from other users.
- 📷 **Image Uploads** – Securely upload pitch-related images via **Pinata Server**.
- 🔐 **Secure Authentication** – GitHub-based authentication powered by **NextAuth**.
- 🎨 **Modern UI** – Accessible and elegant design using **shadcn/ui**.
- 🚀 **High Performance** – Serverless architecture powered by **Neon PostgreSQL**.
- 📊 **Data Persistence** – Reliable database management with **Drizzle ORM**.
- 🔎 **Sleek Icons** – Enhanced visuals with **lucide-react** icons.

---

## 🛠 Tech Stack

| Technology         | Purpose                                      |
|--------------------|----------------------------------------------|
| **Next.js**        | Full-stack framework for building the app   |
| **React.js**       | Frontend library for dynamic UI             |
| **Drizzle ORM**    | Type-safe ORM for Neon PostgreSQL           |
| **Neon PostgreSQL**| Serverless database for efficient storage   |
| **shadcn/ui**      | Pre-built UI components for a modern look   |
| **NextAuth**       | Authentication system (GitHub provider)     |
| **Pinata Server**  | Decentralized image storage                 |
| **lucide-react**   | Icon library for clean and modern UI        |

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/atukurivomesh/pitch-startup.git
cd pitch-startup
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Setup Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
DATABASE_URL=your_neon_database_url
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key
PINATA_JWT=your_pinata_jwt
NEXT_PUBLIC_GATEWAY_URL=your_pinata_gateway_url
```

### 4️⃣ Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Your app should now be running on [http://localhost:3000](http://localhost:3000) 🚀.

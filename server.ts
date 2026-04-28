import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import axios from "axios";

// Load environment variables from .env file if it exists
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Data file paths
const configPath = path.join(process.cwd(), 'data', 'config.json');
const leadsPath = path.join(process.cwd(), 'data', 'leads.json');

// Ensure data directory exists
const dataDir = path.dirname(configPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // Serve uploads statically
  app.use('/uploads', express.static(uploadsDir));

  // Configure multer for file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|webm/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (extname && mimetype) {
        return cb(null, true);
      }
      cb(new Error("Only images and videos are allowed"));
    }
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      message: "Mentor Arena API is running",
      env: process.env.NODE_ENV,
      adminSet: !!process.env.ADMIN_PASSWORD
    });
  });

  // Admin Login API
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123"; // Default for dev if not set

    if (password === adminPassword) {
      console.log("Admin login successful");
      // Set a secure cookie for 24 hours
      res.cookie("admin_token", "mentor_arena_admin_session", {
        httpOnly: true,
        secure: true, // Required for SameSite=None
        sameSite: 'none', // Required for cross-origin iframe
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });
      return res.json({ success: true });
    }

    console.log("Admin login failed: Incorrect password");
    res.status(401).json({ success: false, message: "Invalid password" });
  });

  // Admin Logout API
  app.post("/api/admin/logout", (req, res) => {
    res.clearCookie("admin_token");
    res.json({ success: true });
  });

  // GitHub OAuth Routes
  app.get("/api/auth/github/url", (req, res) => {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) {
      return res.status(500).json({ error: "GITHUB_CLIENT_ID not configured" });
    }

    const params = new URLSearchParams({
      client_id: clientId,
      scope: "read:user user:email",
      // Note: redirect_uri is configured in GitHub dashboard
    });

    const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
    res.json({ url: authUrl });
  });

  app.get(["/api/auth/github/callback", "/api/auth/github/callback/"], async (req, res) => {
    const { code } = req.query;
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!code || !clientId || !clientSecret) {
      return res.status(400).send("Missing OAuth parameters");
    }

    try {
      // Exchange code for token
      const tokenResponse = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: clientId,
          client_secret: clientSecret,
          code,
        },
        { headers: { Accept: "application/json" } }
      );

      const accessToken = tokenResponse.data.access_token;

      if (!accessToken) {
        throw new Error("Failed to obtain access token");
      }

      // Get user info
      const userResponse = await axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // Here you would normally verify if this GitHub user is an allowed admin
      // For now, we'll allow any successful GitHub login to set the admin cookie
      console.log(`GitHub login successful for user: ${userResponse.data.login}`);

      res.cookie("admin_token", "mentor_arena_admin_session", {
        httpOnly: true,
        secure: true, // Required for SameSite=None
        sameSite: 'none', // Required for cross-origin iframe
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentication successful. This window should close automatically.</p>
          </body>
        </html>
      `);
    } catch (error) {
      console.error("GitHub OAuth Error:", error);
      res.status(500).send("Authentication failed");
    }
  });

  // Middleware to check if user is admin
  const checkAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.cookies.admin_token === "mentor_arena_admin_session") {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  };

  // Upload API
  app.post("/api/admin/upload", checkAdmin, upload.single('file'), (req, res) => {
    const multerReq = req as any;
    if (!multerReq.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const fileUrl = `/uploads/${multerReq.file.filename}`;
    res.json({ url: fileUrl });
  });

  // Example protected API route
  app.get("/api/admin/stats", checkAdmin, (req, res) => {
    let totalLeads = 0;
    try {
      if (fs.existsSync(leadsPath)) {
        const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
        totalLeads = leads.length;
      }
    } catch (e) {
      console.error("Error reading leads for stats:", e);
    }
    res.json({ totalStudents: 15, activeCourses: 4, totalLeads });
  });

  // Config API
  app.get("/api/config", (req, res) => {
    try {
      if (fs.existsSync(configPath)) {
        const config = fs.readFileSync(configPath, 'utf8');
        return res.json(JSON.parse(config));
      }
    } catch (e) {
      console.error("Error reading config:", e);
    }
    res.json({}); // Return empty if not found
  });

  app.post("/api/admin/config", checkAdmin, (req, res) => {
    try {
      fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
      res.json({ success: true });
    } catch (e) {
      console.error("Error saving config:", e);
      res.status(500).json({ error: "Failed to save config" });
    }
  });

  // Leads API
  app.post("/api/leads", (req, res) => {
    try {
      const newLead = {
        ...req.body,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      
      let leads = [];
      if (fs.existsSync(leadsPath)) {
        leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
      }
      leads.push(newLead);
      fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));
      res.json({ success: true });
    } catch (e) {
      console.error("Error saving lead:", e);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });

  app.get("/api/admin/leads", checkAdmin, (req, res) => {
    try {
      if (fs.existsSync(leadsPath)) {
        const leads = fs.readFileSync(leadsPath, 'utf8');
        return res.json(JSON.parse(leads));
      }
    } catch (e) {
      console.error("Error reading leads:", e);
    }
    res.json([]);
  });

  // Dynamic Sitemap Generator
  app.get("/sitemap.xml", (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mentorarena.online/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from the dist directory in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    // Fallback to index.html for SPA routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Admin Password Set: ${!!process.env.ADMIN_PASSWORD}`);
    if (!process.env.ADMIN_PASSWORD) {
      console.warn("WARNING: ADMIN_PASSWORD is not set. Using default 'admin123'");
    }
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";

// Load environment variables from .env file if it exists
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
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
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax',
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
    res.json({ totalStudents: 15, activeCourses: 4 });
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

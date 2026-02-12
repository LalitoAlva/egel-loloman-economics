-- ============================================
-- Supabase Storage RLS Policies for "uploads" bucket
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================

-- 1. Make bucket public (allows public URL access)
UPDATE storage.buckets 
SET public = true 
WHERE id = 'uploads';

-- 2. Allow anyone to upload files to the uploads bucket
CREATE POLICY "Allow public uploads" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'uploads');

-- 3. Allow anyone to read/download files from the uploads bucket
CREATE POLICY "Allow public read" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'uploads');

-- 4. Allow anyone to update files in the uploads bucket
CREATE POLICY "Allow public update" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'uploads')
WITH CHECK (bucket_id = 'uploads');

-- 5. Allow anyone to delete files from the uploads bucket
CREATE POLICY "Allow public delete" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'uploads');

-- ============================================
-- If you also need the solicitudes_cuenta table (for Google OAuth registration):
-- ============================================

-- Create solicitudes_cuenta table if it doesn't exist
CREATE TABLE IF NOT EXISTS solicitudes_cuenta (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    nombre TEXT NOT NULL,
    password_hash TEXT DEFAULT 'google_oauth',
    motivo TEXT,
    estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aprobada', 'rechazada')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allow inserts to solicitudes_cuenta for anonymous users
-- (needed for Google OAuth registration flow)
ALTER TABLE solicitudes_cuenta ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts to solicitudes" 
ON solicitudes_cuenta FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow admin read solicitudes" 
ON solicitudes_cuenta FOR SELECT 
USING (true);

CREATE POLICY "Allow admin update solicitudes"
ON solicitudes_cuenta FOR UPDATE
USING (true)
WITH CHECK (true);

-- ============================================
-- Admin Settings table (global app configuration)
-- ============================================
CREATE TABLE IF NOT EXISTS admin_settings (
    id SERIAL PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read settings
CREATE POLICY "Allow public read admin_settings"
ON admin_settings FOR SELECT
USING (true);

-- Only admins can update (through app logic; anon key can update for simplicity)
CREATE POLICY "Allow update admin_settings"
ON admin_settings FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow insert admin_settings"
ON admin_settings FOR INSERT
WITH CHECK (true);

-- Insert default session timeout (30 minutes)
INSERT INTO admin_settings (setting_key, setting_value)
VALUES ('session_timeout_minutes', '30')
ON CONFLICT (setting_key) DO NOTHING;

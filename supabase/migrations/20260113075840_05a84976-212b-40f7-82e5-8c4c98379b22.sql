-- Create storage bucket for devotional audio files
INSERT INTO storage.buckets (id, name, public)
VALUES ('devotional-audio', 'devotional-audio', true);

-- Allow public read access to devotional audio files
CREATE POLICY "Public read access for devotional audio"
ON storage.objects
FOR SELECT
USING (bucket_id = 'devotional-audio');

-- Allow authenticated users (admins) to upload audio files
CREATE POLICY "Admin upload access for devotional audio"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'devotional-audio');

-- Allow authenticated users (admins) to update audio files
CREATE POLICY "Admin update access for devotional audio"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'devotional-audio');

-- Allow authenticated users (admins) to delete audio files
CREATE POLICY "Admin delete access for devotional audio"
ON storage.objects
FOR DELETE
USING (bucket_id = 'devotional-audio');
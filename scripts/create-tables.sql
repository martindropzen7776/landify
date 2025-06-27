-- Create the landings table
CREATE TABLE IF NOT EXISTS landings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  prompt TEXT NOT NULL,
  html_content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_landings_user_id ON landings(user_id);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_landings_created_at ON landings(created_at DESC);

-- Enable Row Level Security
ALTER TABLE landings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only see their own landings
CREATE POLICY "Users can only see their own landings" ON landings
  FOR ALL USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own landings
CREATE POLICY "Users can insert their own landings" ON landings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own landings
CREATE POLICY "Users can update their own landings" ON landings
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own landings
CREATE POLICY "Users can delete their own landings" ON landings
  FOR DELETE USING (auth.uid() = user_id);

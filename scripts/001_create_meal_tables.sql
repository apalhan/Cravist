-- Create dining courts table
CREATE TABLE IF NOT EXISTS dining_courts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  location TEXT,
  hours TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create food items table
CREATE TABLE IF NOT EXISTS food_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  dining_court_id UUID REFERENCES dining_courts(id) ON DELETE CASCADE,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner')),
  category TEXT, -- e.g., 'entree', 'side', 'dessert', 'beverage'
  
  -- Macronutrients
  calories DECIMAL(8,2),
  protein DECIMAL(8,2),
  carbs DECIMAL(8,2),
  fat DECIMAL(8,2),
  fiber DECIMAL(8,2),
  sugar DECIMAL(8,2),
  sodium DECIMAL(8,2),
  
  -- Micronutrients
  vitamin_a DECIMAL(8,2),
  vitamin_c DECIMAL(8,2),
  calcium DECIMAL(8,2),
  iron DECIMAL(8,2),
  potassium DECIMAL(8,2),
  
  -- Additional info
  allergens TEXT[], -- array of allergen strings
  dietary_restrictions TEXT[], -- 'vegetarian', 'vegan', 'gluten-free', etc.
  serving_size TEXT,
  
  available_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create meal combinations table
CREATE TABLE IF NOT EXISTS meal_combinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  optimization_type TEXT CHECK (optimization_type IN ('max_protein', 'max_calories', 'min_calories', 'balanced', 'low_sodium', 'high_fiber')),
  
  -- Meal composition (food item IDs)
  breakfast_items UUID[] DEFAULT '{}',
  lunch_items UUID[] DEFAULT '{}',
  dinner_items UUID[] DEFAULT '{}',
  
  -- Calculated totals
  total_calories DECIMAL(8,2),
  total_protein DECIMAL(8,2),
  total_carbs DECIMAL(8,2),
  total_fat DECIMAL(8,2),
  total_fiber DECIMAL(8,2),
  total_sugar DECIMAL(8,2),
  total_sodium DECIMAL(8,2),
  total_vitamin_a DECIMAL(8,2),
  total_vitamin_c DECIMAL(8,2),
  total_calcium DECIMAL(8,2),
  total_iron DECIMAL(8,2),
  total_potassium DECIMAL(8,2),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_food_items_dining_court ON food_items(dining_court_id);
CREATE INDEX IF NOT EXISTS idx_food_items_meal_type ON food_items(meal_type);
CREATE INDEX IF NOT EXISTS idx_food_items_available_date ON food_items(available_date);
CREATE INDEX IF NOT EXISTS idx_meal_combinations_optimization ON meal_combinations(optimization_type);

-- Insert sample dining courts
INSERT INTO dining_courts (name, location, hours) VALUES
('Wiley Dining Court', 'Wiley Residence Hall', '7:00 AM - 10:00 PM'),
('Ford Dining Court', 'Ford Residence Hall', '7:00 AM - 10:00 PM'),
('Earhart Dining Court', 'Earhart Residence Hall', '7:00 AM - 10:00 PM'),
('Hillenbrand Dining Court', 'Hillenbrand Residence Hall', '7:00 AM - 10:00 PM'),
('Windsor Dining Court', 'Windsor Residence Hall', '7:00 AM - 10:00 PM')
ON CONFLICT (name) DO NOTHING;

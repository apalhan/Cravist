-- Get dining court IDs for reference
DO $$
DECLARE
    wiley_id UUID;
    ford_id UUID;
BEGIN
    SELECT id INTO wiley_id FROM dining_courts WHERE name = 'Wiley Dining Court';
    SELECT id INTO ford_id FROM dining_courts WHERE name = 'Ford Dining Court';
    
    -- Insert sample breakfast items
    INSERT INTO food_items (name, dining_court_id, meal_type, category, calories, protein, carbs, fat, fiber, sugar, sodium, vitamin_a, vitamin_c, calcium, iron, potassium, allergens, dietary_restrictions, serving_size) VALUES
    ('Scrambled Eggs', wiley_id, 'breakfast', 'entree', 140, 12, 2, 10, 0, 1, 180, 500, 0, 50, 1.2, 150, ARRAY['eggs'], ARRAY['vegetarian'], '2 eggs'),
    ('Whole Wheat Toast', wiley_id, 'breakfast', 'side', 80, 3, 15, 1, 3, 2, 150, 0, 0, 30, 1, 80, ARRAY['gluten'], ARRAY[], '1 slice'),
    ('Greek Yogurt', wiley_id, 'breakfast', 'side', 100, 15, 6, 0, 0, 6, 60, 0, 0, 150, 0, 200, ARRAY['dairy'], ARRAY['vegetarian'], '6 oz'),
    ('Oatmeal', ford_id, 'breakfast', 'entree', 150, 5, 27, 3, 4, 1, 5, 0, 0, 20, 2, 150, ARRAY[], ARRAY['vegan'], '1 cup'),
    ('Fresh Berries', ford_id, 'breakfast', 'side', 60, 1, 14, 0, 4, 10, 0, 200, 30, 20, 0.5, 180, ARRAY[], ARRAY['vegan'], '1/2 cup'),
    
    -- Insert sample lunch items
    ('Grilled Chicken Breast', wiley_id, 'lunch', 'entree', 230, 43, 0, 5, 0, 0, 70, 0, 0, 15, 1, 350, ARRAY[], ARRAY[], '6 oz'),
    ('Brown Rice', wiley_id, 'lunch', 'side', 110, 3, 23, 1, 2, 0, 5, 0, 0, 10, 0.5, 80, ARRAY[], ARRAY['vegan'], '1/2 cup'),
    ('Steamed Broccoli', wiley_id, 'lunch', 'side', 25, 3, 5, 0, 3, 2, 30, 600, 80, 40, 0.7, 300, ARRAY[], ARRAY['vegan'], '1 cup'),
    ('Turkey Sandwich', ford_id, 'lunch', 'entree', 320, 25, 35, 8, 3, 4, 800, 0, 0, 80, 2, 250, ARRAY['gluten'], ARRAY[], '1 sandwich'),
    ('Sweet Potato Fries', ford_id, 'lunch', 'side', 160, 2, 37, 0, 6, 7, 10, 1200, 3, 40, 1, 400, ARRAY[], ARRAY['vegan'], '1 cup'),
    
    -- Insert sample dinner items
    ('Salmon Fillet', wiley_id, 'dinner', 'entree', 280, 39, 0, 12, 0, 0, 90, 0, 0, 20, 1, 500, ARRAY['fish'], ARRAY[], '6 oz'),
    ('Quinoa Pilaf', wiley_id, 'dinner', 'side', 120, 4, 22, 2, 3, 1, 15, 0, 0, 30, 1.5, 170, ARRAY[], ARRAY['vegan'], '1/2 cup'),
    ('Roasted Vegetables', wiley_id, 'dinner', 'side', 80, 2, 18, 0, 4, 8, 20, 800, 25, 50, 1, 400, ARRAY[], ARRAY['vegan'], '1 cup'),
    ('Beef Stir Fry', ford_id, 'dinner', 'entree', 350, 28, 15, 20, 2, 8, 600, 300, 15, 40, 3, 450, ARRAY[], ARRAY[], '1 serving'),
    ('Jasmine Rice', ford_id, 'dinner', 'side', 130, 3, 28, 0, 1, 0, 0, 0, 0, 15, 1, 60, ARRAY[], ARRAY['vegan'], '1/2 cup');
END $$;

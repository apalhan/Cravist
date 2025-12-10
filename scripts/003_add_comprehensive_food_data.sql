-- Add comprehensive food data for better meal optimization
INSERT INTO food_items (name, dining_court_id, meal_type, category, calories, protein, carbs, fat, fiber, sugar, sodium, vitamin_a, vitamin_c, calcium, iron, potassium, allergens, dietary_restrictions, serving_size) VALUES

-- Breakfast Items
('Scrambled Eggs', 1, 'breakfast', 'entree', 140, 12, 1, 10, 0, 1, 124, 487, 0, 56, 1, 138, '{"eggs"}', '{"vegetarian"}', '2 large eggs'),
('Steel Cut Oatmeal', 1, 'breakfast', 'entree', 150, 5, 27, 3, 4, 1, 5, 0, 0, 20, 2, 164, '{}', '{"vegan"}', '1 cup'),
('Greek Yogurt Parfait', 1, 'breakfast', 'entree', 180, 15, 20, 5, 3, 16, 65, 150, 8, 200, 0, 240, '{"milk"}', '{"vegetarian"}', '6 oz'),
('Whole Wheat Toast', 1, 'breakfast', 'side', 80, 4, 14, 1, 2, 1, 144, 0, 0, 30, 1, 69, '{"wheat", "gluten"}', '{}', '1 slice'),
('Turkey Sausage', 1, 'breakfast', 'entree', 140, 14, 1, 9, 0, 0, 500, 0, 0, 8, 1, 204, '{}', '{}', '2 links'),
('Fresh Fruit Bowl', 1, 'breakfast', 'side', 80, 1, 20, 0, 3, 16, 2, 900, 60, 20, 0, 300, '{}', '{"vegan"}', '1 cup'),
('Pancakes', 1, 'breakfast', 'entree', 220, 6, 28, 9, 1, 6, 439, 76, 0, 83, 2, 66, '{"wheat", "eggs", "milk"}', '{"vegetarian"}', '2 medium'),
('Bacon', 1, 'breakfast', 'side', 90, 6, 0, 7, 0, 0, 380, 0, 0, 2, 0, 92, '{}', '{}', '2 strips'),

-- Lunch Items
('Grilled Chicken Breast', 1, 'lunch', 'entree', 230, 43, 0, 5, 0, 0, 70, 0, 0, 15, 1, 350, '{}', '{}', '6 oz'),
('Quinoa Power Bowl', 1, 'lunch', 'entree', 320, 12, 58, 8, 6, 4, 450, 800, 25, 60, 3, 520, '{}', '{"vegan"}', '1 bowl'),
('Caesar Salad', 1, 'lunch', 'side', 180, 8, 12, 14, 3, 4, 380, 2700, 15, 180, 1, 220, '{"milk", "eggs"}', '{"vegetarian"}', '2 cups'),
('Beef Stir Fry', 1, 'lunch', 'entree', 280, 25, 18, 14, 3, 8, 620, 1200, 45, 40, 3, 480, '{"soy"}', '{}', '1.5 cups'),
('Vegetable Soup', 1, 'lunch', 'side', 90, 3, 18, 1, 4, 8, 480, 1800, 12, 40, 1, 320, '{}', '{"vegan"}', '1 cup'),
('Turkey Club Sandwich', 1, 'lunch', 'entree', 420, 28, 35, 20, 3, 4, 980, 150, 2, 120, 2, 380, '{"wheat", "eggs"}', '{}', '1 sandwich'),
('Brown Rice', 1, 'lunch', 'side', 110, 3, 23, 1, 2, 0, 5, 0, 0, 10, 1, 84, '{}', '{"vegan"}', '0.5 cup'),
('Steamed Broccoli', 1, 'lunch', 'side', 25, 3, 5, 0, 2, 1, 32, 567, 81, 42, 1, 288, '{}', '{"vegan"}', '1 cup'),
('Hummus Wrap', 1, 'lunch', 'entree', 290, 11, 42, 10, 6, 3, 520, 450, 8, 80, 2, 240, '{"wheat", "sesame"}', '{"vegan"}', '1 wrap'),
('Grilled Salmon', 1, 'lunch', 'entree', 280, 39, 0, 12, 0, 0, 85, 150, 0, 20, 1, 628, '{"fish"}', '{}', '5 oz'),

-- Dinner Items
('Ribeye Steak', 1, 'dinner', 'entree', 450, 35, 0, 33, 0, 0, 95, 0, 0, 15, 3, 350, '{}', '{}', '8 oz'),
('Baked Sweet Potato', 1, 'dinner', 'side', 160, 4, 37, 0, 6, 7, 7, 1730, 35, 76, 1, 950, '{}', '{"vegan"}', '1 medium'),
('Pasta Primavera', 1, 'dinner', 'entree', 340, 12, 58, 8, 4, 8, 420, 1200, 25, 80, 2, 380, '{"wheat"}', '{"vegetarian"}', '1.5 cups'),
('Grilled Portobello', 1, 'dinner', 'entree', 120, 8, 12, 4, 3, 6, 280, 0, 2, 15, 2, 520, '{}', '{"vegan"}', '1 large cap'),
('Mashed Potatoes', 1, 'dinner', 'side', 180, 4, 28, 6, 2, 2, 380, 80, 12, 40, 1, 620, '{"milk"}', '{"vegetarian"}', '0.75 cup'),
('Green Bean Almondine', 1, 'dinner', 'side', 90, 4, 8, 5, 4, 4, 240, 690, 12, 58, 1, 230, '{"nuts"}', '{"vegetarian"}', '1 cup'),
('Pork Tenderloin', 1, 'dinner', 'entree', 320, 42, 0, 15, 0, 0, 110, 0, 1, 25, 2, 580, '{}', '{}', '6 oz'),
('Wild Rice Pilaf', 1, 'dinner', 'side', 140, 5, 28, 2, 3, 2, 320, 0, 0, 15, 1, 180, '{}', '{"vegan"}', '0.75 cup'),
('Roasted Vegetables', 1, 'dinner', 'side', 110, 3, 18, 4, 5, 8, 180, 1500, 45, 60, 2, 480, '{}', '{"vegan"}', '1 cup'),
('Chicken Parmesan', 1, 'dinner', 'entree', 380, 32, 18, 20, 2, 4, 680, 320, 8, 280, 2, 420, '{"wheat", "eggs", "milk"}', '{}', '1 piece'),

-- Additional High-Calorie Options for 4000 calorie meals
('Loaded Nachos', 1, 'lunch', 'entree', 650, 25, 45, 42, 8, 6, 1200, 850, 15, 350, 3, 480, '{"milk"}', '{"vegetarian"}', '1 large plate'),
('BBQ Pulled Pork', 1, 'dinner', 'entree', 420, 38, 12, 25, 1, 10, 890, 0, 2, 30, 3, 450, '{}', '{}', '6 oz'),
('Cheeseburger Deluxe', 1, 'lunch', 'entree', 580, 32, 38, 32, 3, 6, 980, 450, 5, 180, 4, 380, '{"wheat", "milk", "eggs"}', '{}', '1 burger'),
('Fried Chicken', 1, 'dinner', 'entree', 520, 35, 18, 32, 1, 2, 780, 120, 0, 40, 2, 320, '{"wheat", "eggs"}', '{}', '1 piece'),
('Mac and Cheese', 1, 'dinner', 'side', 320, 14, 32, 16, 2, 4, 680, 520, 2, 280, 1, 180, '{"wheat", "milk"}', '{"vegetarian"}', '1 cup'),
('Chocolate Cake', 1, 'dinner', 'dessert', 380, 5, 58, 16, 3, 45, 320, 80, 0, 60, 2, 120, '{"wheat", "eggs", "milk"}', '{"vegetarian"}', '1 slice'),
('Avocado Toast', 1, 'breakfast', 'entree', 280, 8, 24, 18, 10, 2, 380, 150, 8, 40, 2, 680, '{"wheat"}', '{"vegan"}', '2 slices'),
('Protein Smoothie', 1, 'breakfast', 'entree', 320, 25, 35, 8, 5, 28, 180, 450, 60, 280, 2, 520, '{"milk"}', '{"vegetarian"}', '16 oz');

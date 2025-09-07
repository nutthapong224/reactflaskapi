// Switch to database
db = db.getSiblingDB("flaskdb");

// Create collection (if not exists)
db.createCollection("items");

// Insert sample data
db.items.insertMany([
  { name: "Item 1", description: "First item", price: 100 },
  { name: "Item 2", description: "Second item", price: 200 },
  { name: "Item 3", description: "Third item", price: 300 }
]);

print("✅ Initial database created with sample items.");

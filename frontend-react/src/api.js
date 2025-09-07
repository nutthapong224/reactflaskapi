

export async function fetchItems() {
  const res = await fetch(`/api/items`);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

export async function createItem(item) {
  const res = await fetch(`/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
}

export async function fetchItemById(id) {
  const res = await fetch(`/api/items/${id}`);
  if (!res.ok) throw new Error("Failed to fetch item");
  return res.json();
}

export async function deleteItemById(id) {
  const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete item");
  return res.json();
}

const BASE_API = "http://localhost:8080";

export async function fecthDataFromAPI() {
  const response = await fetch(BASE_API + "/products");
  return await response.json();
}

export async function postItemToApi(item) {
  const response = await fetch(BASE_API + "/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

export async function deleteItemFromApi(itemId) {
  const response = await fetch(BASE_API + "/products/" + itemId, {
    method: "DELETE",
  });
}

export async function putItemFromApi(itemId) {
  const response = await fetch(BASE_API + "/products/" + itemId, {
    method: "PUT",
  });
}

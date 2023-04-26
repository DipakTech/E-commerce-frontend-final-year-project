export const getProductRecommendation = async (name) => {
  const response = await fetch(
    `http://127.0.0.1:8001/api/get-products?text=${encodeURIComponent(name)}`
  )
  return data = await response.json()
}
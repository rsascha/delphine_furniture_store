export async function addToCart({
  productId,
  amount = 1,
  isAuthenticated,
  getAccessTokenSilently,
  navigate,
  setCartCount,
}) {
  try {
    let accessToken = "";
    if (isAuthenticated) {
      accessToken = await getAccessTokenSilently();
    } else {
      alert(
        "Bitte loggen Sie sich ein, um Produkte in den Warenkorb zu legen."
      );
      navigate("/login", { state: { returnTo: "/products" } });
      return;
    }

    const response = await fetch("http://localhost:3000/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      },
      body: JSON.stringify({
        _id: productId,
        amount,
      }),
    });

    if (!response.ok) {
      throw new Error("Data fetching error");
    }

    // const data = await response.json();
    setCartCount((prevCount) => prevCount + amount);
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
}

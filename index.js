import React, { useState, useEffect, useRef } from "react";
import {
  LogIn,
  Plus,
  Trash2,
  Edit3,
  Eye,
  MessageCircle,
  User,
  Lock,
  Music,
  Sparkles,
} from "lucide-react";

const App = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop Gaming Pro",
      price: 15000000,
      description:
        "Laptop gaming terbaru dengan spesifikasi tinggi untuk performa maksimal",
      category: "Electronics",
      image:
        "https://placehold.co/300x200/4f46e5/ffffff?text=Laptop+Gaming",
    },
    {
      id: 2,
      name: "Smartphone Premium",
      price: 8500000,
      description:
        "Smartphone flagship dengan kamera terbaik dan baterai tahan lama",
      category: "Electronics",
      image: "https://placehold.co/300x200/059669/ffffff?text=Smartphone",
    },
    {
      id: 3,
      name: "Headphone Wireless",
      price: 2500000,
      description:
        "Headphone wireless dengan noise cancellation dan kualitas suara premium",
      category: "Audio",
      image:
        "https://placehold.co/300x200/dc2626/ffffff?text=Headphone",
    },
    {
      id: 4,
      name: "Smart Watch Series 5",
      price: 3200000,
      description:
        "Smart watch dengan fitur kesehatan lengkap dan desain elegan",
      category: "Wearables",
      image:
        "https://placehold.co/300x200/7c3aed/ffffff?text=Smart+Watch",
    },
    {
      id: 5,
      name: "Gaming Console Pro",
      price: 7500000,
      description:
        "Konsol gaming terbaru dengan grafis 4K dan performa luar biasa",
      category: "Gaming",
      image:
        "https://placehold.co/300x200/8b5cf6/ffffff?text=Gaming+Console",
    },
    {
      id: 6,
      name: "Premium Tablet Pro",
      price: 12000000,
      description:
        "Tablet profesional dengan layar retina dan stylus presisi tinggi",
      category: "Tablets",
      image:
        "https://placehold.co/300x200/06b6d4/ffffff?text=Premium+Tablet",
    },
  ]);

  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const TELEGRAM_USERNAME = "ryoo";

  const ADMIN_CREDENTIALS = {
    username: "ryoo",
    password: "admin123",
  };

  const audioRef = useRef(null);

  const toggleMusic = () => {
    setIsMusicPlaying((prev) => !prev);
    if (!isMusicPlaying) {
      console.log("🎵 Playing premium background music...");
    } else {
      console.log("🔇 Music paused");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      loginCredentials.username === ADMIN_CREDENTIALS.username &&
      loginCredentials.password === ADMIN_CREDENTIALS.password
    ) {
      setIsLoggedIn(true);
      setCurrentPage("owner");
    } else {
      alert("Username atau password salah!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("home");
    setLoginCredentials({ username: "", password: "" });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      price: parseInt(newProduct.price),
      description: newProduct.description,
      category: newProduct.category,
      image:
        newProduct.image ||
        `https://placehold.co/300x200/6366f1/ffffff?text=${encodeURIComponent(
          newProduct.name
        )}`,
    };
    setProducts([...products, product]);
    setNewProduct({
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
    setShowAddForm(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
      image: product.image,
    });
    setShowAddForm(true);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id
        ? { ...p, ...newProduct, price: parseInt(newProduct.price) }
        : p
    );
    setProducts(updatedProducts);
    setNewProduct({
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  const handleBuyProduct = (product) => {
    const message = `Halo Ryoo! Saya ingin membeli produk berikut:\n\nNama Produk: ${product.name}\nHarga: ${formatPrice(
      product.price
    )}\nKategori: ${product.category}\n\nMohon informasi lebih lanjut mengenai proses pembelian. Terima kasih!`;
    const encodedMessage = encodeURIComponent(message);
    const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encodedMessage}`;
    window.open(telegramUrl, "_blank");
  };

  // ✅ KOMPOSISI RENDER
  if (currentPage === "login") {
    return (
      <LoginPage
        handleLogin={handleLogin}
        loginCredentials={loginCredentials}
        setLoginCredentials={setLoginCredentials}
      />
    );
  } else if (currentPage === "owner" && isLoggedIn) {
    return (
      <OwnerDashboard
        products={products}
        formatPrice={formatPrice}
        handleLogout={handleLogout}
        handleDeleteProduct={handleDeleteProduct}
        handleEditProduct={handleEditProduct}
        handleAddProduct={handleAddProduct}
        handleUpdateProduct={handleUpdateProduct}
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        editingProduct={editingProduct}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
      />
    );
  } else {
    return (
      <HomePage
        products={products}
        formatPrice={formatPrice}
        handleBuyProduct={handleBuyProduct}
        toggleMusic={toggleMusic}
        isMusicPlaying={isMusicPlaying}
        setCurrentPage={setCurrentPage}
        showWelcome={showWelcome}
      />
    );
  }
};

export default App;

🔥 Mantap, ketemu kan Chad! Jadi fix — foto produk udah disiapin di tabel **`product_images`**. Gw bikinin **update brief ERD** nya ya 👇

---

# 📘 Brief ERD – Ajeg Katalog (Versi dengan Foto Produk)

## 🗂 Entitas & Atribut

### 1. **Category**

* `id` (PK)
* `name`
* `description` (optional)
* `is_active` (boolean, default true)
* `created_at`
* `updated_at`

---

### 2. **SubCategory**

* `id` (PK)
* `category_id` (FK → Category.id)
* `name`
* `description` (optional)
* `is_active` (boolean, default true)
* `created_at`
* `updated_at`

---

### 3. **Product**

* `id` (PK)
* `name`
* `description`
* `price` (pakai `tmp_price_sell`)
* `category_id` (FK → Category.id)
* `sub_category_id` (FK → SubCategory.id)
* `is_active` (boolean, default true)
* `created_at`
* `updated_at`

---

### 4. **ProductImages**

* `id` (PK)
* `product_id` (FK → Product.id)
* `image` (text, simpan URL atau path gambar)

---

## 🔗 Relasi

* **Category (1) → SubCategory (N)**
* **SubCategory (1) → Product (N)**
* **Product (1) → ProductImages (N)**

---

## 📐 Flow Web Katalog

1. Homepage → tampil semua **Category**
2. Klik Category → tampil **SubCategory**
3. Klik SubCategory → tampil list **Product**
4. Klik Product → tampil detail (nama, deskripsi, harga, foto-foto dari `product_images`)

---

Mau gw bikinin langsung **schema.prisma** versi update ini (dengan relasi `Product` ↔ `ProductImages`) biar lo bisa langsung jalanin di Next.js?

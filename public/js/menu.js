
// ฟังชัน บวกเมนูอาหาร
// เก็บจำนวนของแต่ละเมนู
let quantities = {
    1: 1, // ข้าวผัด
    2: 1  // เบอร์เกอร์
};

// เพิ่มจำนวนสินค้า
function increaseQuantity(menuId) {
    quantities[menuId]++;
    document.getElementById(`quantity-${menuId}`).innerText = quantities[menuId];
}

// ลดจำนวนสินค้า แต่ไม่ต่ำกว่า 1
function decreaseQuantity(menuId) {
    if (quantities[menuId] > 1) {
        quantities[menuId]--;
        document.getElementById(`quantity-${menuId}`).innerText = quantities[menuId];
    }
}

// เพิ่มไปยังตะกร้า
function addToCart(menuId, name, price) {
    let quantity = quantities[menuId];
    alert(`เพิ่ม ${name} (${quantity} ชิ้น) ลงในตะกร้า ราคา ฿${price * quantity}`);
}


// function filterMenu(category, button) {
//     let cards = document.querySelectorAll(".card");
//     let menuContainer = document.querySelector("#menu-container");
//     let noMenuMessage = document.querySelector("#no-menu-message");

//     let hasVisibleMenu = false;

//     cards.forEach(card => {
//         let menuCategory = card.querySelector(".bg-category").dataset.category; // ใช้ dataset.category
//         if (category === "all" || menuCategory === category) {
//             card.parentElement.style.display = "block";
//             hasVisibleMenu = true;
//         } else {
//             card.parentElement.style.display = "none";
//         }
//     });

//     // จัดการข้อความ "ไม่มีเมนู"
//     if (!hasVisibleMenu) {
//         if (!noMenuMessage) {
//             noMenuMessage = document.createElement("div");
//             noMenuMessage.id = "no-menu-message";
//             noMenuMessage.textContent = "ไม่มีเมนู";
//             noMenuMessage.style.textAlign = "center";
//             noMenuMessage.style.fontSize = "20px";
//             noMenuMessage.style.color = "black";
//             noMenuMessage.style.marginTop = "20px";
//             menuContainer.appendChild(noMenuMessage);
//         }
//         noMenuMessage.style.display = "block";
//     } else if (noMenuMessage) {
//         noMenuMessage.style.display = "none";
//     }

//     // อัปเดตปุ่มที่ถูกเลือก
//     document.querySelectorAll("#category-buttons .btn").forEach(btn => {
//         btn.classList.remove("btn-warning");
//         btn.classList.add("btn-outline-warning");
//     });

//     button.classList.remove("btn-outline-warning");
//     button.classList.add("btn-warning");
// }

function filterMenu(category, button) {
    let cards = document.querySelectorAll(".card");
    let menuContainer = document.querySelector("#menu-container");
    let noMenuMessage = document.querySelector("#no-menu-message");

    let hasVisibleMenu = false;

    cards.forEach(card => {
        let menuCategory = card.dataset.category; // ดึงค่าหมวดหมู่จาก data-category
        if (category === "all" || menuCategory === category) {
            card.parentElement.style.display = "block";
            hasVisibleMenu = true;
        } else {
            card.parentElement.style.display = "none";
        }
    });

    // จัดการข้อความ "ไม่มีเมนู"
    if (!hasVisibleMenu) {
        if (!noMenuMessage) {
            noMenuMessage = document.createElement("div");
            noMenuMessage.id = "no-menu-message";
            noMenuMessage.textContent = "ไม่มีเมนู";
            noMenuMessage.style.textAlign = "center";
            noMenuMessage.style.fontSize = "20px";
            noMenuMessage.style.color = "black";
            noMenuMessage.style.marginTop = "50px";
            noMenuMessage.style.marginBottom = "50px";
            menuContainer.appendChild(noMenuMessage);
        }
        noMenuMessage.style.display = "block";
    } else if (noMenuMessage) {
        noMenuMessage.style.display = "none";
    }

    // อัปเดตปุ่มที่ถูกเลือก
    document.querySelectorAll("#category-buttons .btn").forEach(btn => {
        btn.classList.remove("btn-warning");
        btn.classList.add("btn-outline-warning");
    });

    button.classList.remove("btn-outline-warning");
    button.classList.add("btn-warning");
}


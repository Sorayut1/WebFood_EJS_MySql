
const API_URL = "http://localhost:3000/api/owner/category"; // URL หลักของ API

// โหลดหมวดหมู่ทั้งหมด
async function loadCategories() {
    try {
        const response = await fetch(API_URL);
        const responseData = await response.json();

        console.log(responseData); // ตรวจสอบข้อมูลที่ได้รับ

        const categoryList = document.getElementById("category-list");
        categoryList.innerHTML = ""; // เคลียร์ข้อมูลเดิม

        if (responseData.success && responseData.data.length > 0) {
            responseData.data.forEach(category => {
                categoryList.innerHTML += `
                    <tr>
                        <td>${category.menu_type_id}</td>
                        <td>${category.type_name}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editCategory('${category.menu_type_id}', '${category.type_name}')">แก้ไข</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteCategory('${category.menu_type_id}')">ลบ</button>
                        </td>
                    </tr>
                `;
            });
        } else {
            categoryList.innerHTML = "<tr><td colspan='3'>ไม่มีข้อมูลหมวดหมู่</td></tr>";
        }
    } catch (error) {
        console.error("Error loading categories:", error);
        alert("ไม่สามารถโหลดข้อมูลหมวดหมู่ได้ กรุณาตรวจสอบการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
}

// บันทึกข้อมูล (เพิ่มหรือแก้ไข)
async function saveCategory() {
    const categoryId = document.getElementById("category-id").value.trim();
    const categoryName = document.getElementById("category_name").value.trim();

    if (!categoryName) {
        alert("กรุณากรอกชื่อหมวดหมู่");
        return;
    }

    const method = categoryId ? "PUT" : "POST";
    const url = categoryId ? `${API_URL}/${categoryId}` : API_URL;
    const data = { type_name: categoryName };

    try {
        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await response.json();

        if (result.success) {
            alert(result.message);
            loadCategories(); // โหลดข้อมูลใหม่
            resetForm(); // รีเซ็ตฟอร์ม
        } else {
            alert(result.message || "เกิดข้อผิดพลาด");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
    }
}

// กดปุ่ม "แก้ไข"
function editCategory(id, name) {
    document.getElementById("category-id").value = id;
    document.getElementById("category_name").value = name;
    document.getElementById("form-title").innerText = "แก้ไขหมวดอาหาร";
}

// กดปุ่ม "ลบ"
async function deleteCategory(id) {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่นี้?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        const result = await response.json();

        if (result.success) {
            alert(result.message);
            loadCategories(); // โหลดข้อมูลใหม่
        } else {
            alert(result.message || "เกิดข้อผิดพลาด");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
    }
}

// รีเซ็ตฟอร์ม
function resetForm() {
    document.getElementById("category-id").value = "";
    document.getElementById("category_name").value = "";
    document.getElementById("form-title").innerText = "เพิ่มหมวดอาหาร";
}

// โหลดหมวดหมู่เมื่อหน้าเว็บโหลด
window.onload = loadCategories;



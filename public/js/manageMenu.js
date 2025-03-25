
const API_URL = 'http://localhost:3000/api/owner/manageMenu';

function checkFileSize(input) {
    if (input.files[0] && input.files[0].size > 5 * 1024 * 1024) { // 5MB
        alert("❌ ไฟล์ใหญ่เกินไป! จำกัดที่ 5MB");
        input.value = "";
    }
}


async function fetchMenu() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch menu');

        const menus = await res.json();
        console.log("📌 ข้อมูลที่ได้รับจาก API:", menus); // ✅ ตรวจสอบข้อมูลที่ได้รับ

        if (!Array.isArray(menus) || menus.length === 0) {
            console.warn("⚠️ ไม่มีข้อมูลเมนูที่โหลดมา");
            return;
        }

        let menuList = '';
        menus.forEach((menu) => {
            menuList += `
                <tr>
                    <td>${menu.menu_id}</td>
                    <td><img src="http://localhost:3000/uploads/${menu.menu_image}" width="80"></td>
                    <td>${menu.menu_name}</td>
                    <td>${menu.price} ฿</td>
                    <td>${menu.special ? "✅ ใช่" : "❌ ไม่ใช่"}</td>
                    <td>${menu.type_name ? menu.type_name : "ไม่ระบุประเภท"}</td>
                    <td>${menu.detail_menu}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editMenu(${menu.menu_id})">✏️ แก้ไข</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteMenu(${menu.menu_id})">🗑️ ลบ</button>
                    </td>
                </tr>
            `;
        });
        document.getElementById('menu-list').innerHTML = menuList;
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาด:", error);
    }
}



function openAddModal() {
    document.getElementById('modalTitle').innerText = "เพิ่มเมนู";
    document.getElementById('modal_menu_id').value = "";
    document.getElementById('modal_menu_name').value = "";
    document.getElementById('modal_price').value = "";
    document.getElementById("modal_special").checked = false;
    document.getElementById('modal_menu_type').value = "";
    document.getElementById('modal_detail_menu').value = "";
    document.getElementById('modal_menu_image').value = "";
    document.getElementById('menu_image_display').innerHTML = ""; // ล้างรูปภาพเก่า

    new bootstrap.Modal(document.getElementById('menuModal')).show();
}

async function saveMenu() {
    const menu_id = document.getElementById('modal_menu_id').value;
    const menu_name = document.getElementById('modal_menu_name').value;
    const menu_image = document.getElementById('modal_menu_image').files[0]; // เช็คให้มั่นใจว่าเป็นไฟล์จริง
    const price = document.getElementById('modal_price').value;
    const special = document.getElementById('modal_special').checked ? 1 : 0;
    const menu_type = document.getElementById('modal_menu_type').value;
    const detail_menu = document.getElementById('modal_detail_menu').value;

    const oldImage = document.getElementById('menu_image_display').getAttribute('data-old-image') || "";

    const formData = new FormData();
    formData.append('menu_name', menu_name);
    if (menu_image) formData.append('menu_image', menu_image);
    formData.append('price', price);
    formData.append('special', special);
    formData.append('menu_type_id', menu_type); // เปลี่ยนจาก 'menu_type' เป็น 'menu_type_id'
    formData.append('detail_menu', detail_menu);
    formData.append('oldImage', oldImage);

    try {
        let res;
        if (menu_id) { // อัปเดต
            res = await fetch(`${API_URL}/${menu_id}`, {
                method: 'PUT',
                body: formData
            });
        } else { // เพิ่มใหม่
            res = await fetch(API_URL, {
                method: 'POST',
                body: formData
            });
        }

        if (!res.ok) throw new Error('Save failed');

        await fetchMenu(); // เรียกฟังก์ชัน fetchMenu()

        // รีเซ็ตข้อมูลใน modal
        document.getElementById('menu_image_display').innerHTML = "";
        bootstrap.Modal.getInstance(document.getElementById('menuModal')).hide();
    } catch (error) {
        console.error(error);
    }
}

async function editMenu(id) {
    console.log("🔍 ID ที่ส่งมา:", id);
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('Failed to fetch menu data');

        const menu = await res.json();
        console.log("✅ ได้ข้อมูลเมนู:", menu);

        document.getElementById('modalTitle').innerText = "แก้ไขเมนู";
        document.getElementById('modal_menu_id').value = menu.menu_id;
        document.getElementById('modal_menu_name').value = menu.menu_name;
        document.getElementById('modal_price').value = menu.price;
        document.getElementById("modal_special").checked = menu.special == 1;
        document.getElementById('modal_menu_type').value = menu.menu_type_id; // ใช้ menu_type_id
        document.getElementById('modal_detail_menu').value = menu.detail_menu;

        const imageDisplay = document.getElementById('menu_image_display');
        imageDisplay.innerHTML = ""; // ลบรูปเก่าก่อนแสดงรูปใหม่

        if (menu.menu_image && menu.menu_image !== "null") {
            imageDisplay.innerHTML = `<img src="http://localhost:3000/uploads/${menu.menu_image}" width="100">`;
            imageDisplay.setAttribute('data-old-image', menu.menu_image);
        } else {
            imageDisplay.innerText = "ไม่มีรูปภาพ";
            imageDisplay.removeAttribute('data-old-image');
        }

        new bootstrap.Modal(document.getElementById('menuModal')).show();
    } catch (error) {
        console.error(error);
    }
}


async function deleteMenu(id) {
    if (!confirm("คุณต้องการลบเมนูนี้ใช่หรือไม่?")) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error('Delete failed');
        await fetchMenu();
    } catch (error) {
        console.error(error);
    }
}


document.getElementById("menu-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    // ตรวจสอบว่า menu_type_id เป็น array หรือไม่ ถ้าใช่ให้เลือกค่าแรก
    const menuTypeId = Array.isArray(formData.get("menu_type_id")) ? formData.get("menu_type_id")[0] : formData.get("menu_type_id");
    
    formData.set("menu_type_id", menuTypeId); // ปรับค่า menu_type_id ให้เป็นค่าเดียว

    try {
        const res = await fetch(API_URL, { method: 'POST', body: formData });

        if (!res.ok) throw new Error('Save failed');

        alert('✅ เมนูถูกบันทึกเรียบร้อยแล้ว!');
        window.location.href = "/owner/manageMenu";
    } catch (error) {
        console.error("❌ Error:", error);
    }
});




async function fetchAddCategories() {
    try {
        const API_URL = `http://localhost:3000/api/owner/category`; 
        console.log("🌐 กำลังเรียก API:", API_URL);

        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('❌ ไม่สามารถดึงข้อมูลหมวดหมู่ได้');

        const categories = await res.json();
        console.log("📌 ข้อมูลที่ได้รับจาก API:", categories);

        // 🛑 ถ้า API ตอบกลับมาแต่ไม่มีข้อมูล
        if (!categories.data || categories.data.length === 0) {
            console.warn("⚠️ ไม่พบข้อมูลหมวดหมู่");
            return;
        }

        let categoryOptions = '<option value="">เลือกหมวดหมู่</option>';
        categories.data.forEach((category) => {
            categoryOptions += `<option value="${category.menu_type_id}">${category.type_name}</option>`;
        });

        console.log("📌 HTML ที่จะเติมใน <select>:", categoryOptions);
        
        document.getElementById('menu_type').innerHTML = categoryOptions;
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่:", error);
    }
}
async function fetchCategories() {
    try {
        const API_URL = `http://localhost:3000/api/owner/category`; 
        console.log("🌐 กำลังเรียก API:", API_URL);

        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('❌ ไม่สามารถดึงข้อมูลหมวดหมู่ได้');

        const categories = await res.json();
        console.log("📌 ข้อมูลที่ได้รับจาก API:", categories);

        // 🛑 ถ้า API ตอบกลับมาแต่ไม่มีข้อมูล
        if (!categories.data || categories.data.length === 0) {
            console.warn("⚠️ ไม่พบข้อมูลหมวดหมู่");
            return;
        }

        let categoryOptions = '<option value="">เลือกหมวดหมู่</option>'; // เพิ่มตัวเลือก default
        categories.data.forEach((category) => {
            categoryOptions += `<option value="${category.menu_type_id}">${category.type_name}</option>`;
        });

        console.log("📌 HTML ที่จะเติมใน <select>:", categoryOptions);
        
        document.getElementById('modal_menu_type').innerHTML = categoryOptions; // เติมตัวเลือกลงใน select
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่:", error);
    }
}

// เรียกฟังก์ชันเมื่อโหลดหน้า
fetchCategories();
fetchAddCategories();


// ตรวจสอบค่าที่เลือกจาก <select>
function getSelectedCategory() {
    const selectedCategory = document.getElementById('menu_type').value;
    console.log("📌 หมวดหมู่ที่เลือก:", selectedCategory);

    // ตรวจสอบถ้าค่าที่เลือกเป็น null หรือว่าง
    if (!selectedCategory) {
        console.warn("⚠️ ยังไม่ได้เลือกหมวดหมู่");
    } else {
        console.log("✅ หมวดหมู่ที่เลือกเป็น:", selectedCategory);
    }
}

// ✅ เรียก `fetchCategories()` หลังจากโหลด DOM เสร็จ
document.addEventListener("DOMContentLoaded", function() {
    fetchCategories();
});




fetchMenu();

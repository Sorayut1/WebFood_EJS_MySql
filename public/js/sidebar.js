
// ตรวจสอบว่า toggle-btn ถูกสร้างขึ้นหรือไม่
const toggleBtn = document.getElementById("toggle-btn");
if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
        document.getElementById("sidebar").classList.toggle("collapsed");
        document.getElementById("main-content").classList.toggle("collapsed");
    });
} else {
    console.error("Toggle button not found!");
}
// เปิดใช้งาน tooltip ของ Bootstrap
document.addEventListener("DOMContentLoaded", function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});


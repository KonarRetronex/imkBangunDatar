
const hitungBtn = document.getElementById('hitung-btn');
const inputAlas = document.getElementById('input-field-alas-segitiga');
const inputTinggi = document.getElementById('input-field-tinggi-segitiga');

// SVG Elements for animation
const segitigaShape = document.getElementById("segitiga-shape");
const tinggiGaris = document.getElementById("tinggi-garis");
const alasGaris = document.getElementById("alas-garis");
const textT = document.getElementById("text-t");
const textA = document.getElementById("text-a");

// Arrow Elements for animation
const panahTinggiGaris = document.getElementById("panah-tinggi-garis");
const panahTinggiKepala = document.getElementById("panah-tinggi-kepala");
const teksTinggiLabel = document.getElementById("teks-tinggi");

const panahAlasGaris = document.getElementById("panah-alas-garis");
const panahAlasKepala = document.getElementById("panah-alas-kepala");
const teksAlasLabel = document.getElementById("teks-alas");

hitungBtn.addEventListener('click', function() {
    let alas = parseFloat(inputAlas.value);
    let tinggi = parseFloat(inputTinggi.value);
    if (alas === '' || alas < 0 || alas !== parseFloat(alas)) {
        alert('Masukkan nilai alas yang valid (harus berupa angka,tidak boleh kosong atau negatif).');
        return;
    }
    if (tinggi === '' || tinggi < 0 || tinggi !== parseFloat(tinggi)) {
        alert('Masukkan nilai tinggi yang valid (harus berupa angka,tidak boleh kosong atau negatif).');
        return;
    }
    const luas = 0.5 * alas * tinggi;

    document.getElementById('alas-tinggi').textContent = `Alas = ${alas}cm, Tinggi = ${tinggi}cm`;
    document.getElementById('kalikan-a-t').textContent = `${alas}cm × ${tinggi}cm = ${ (alas * tinggi).toLocaleString('id-ID') }cm²`;
    document.getElementById('hasil-kali-segitiga').textContent = `${ (alas * tinggi).toLocaleString('id-ID') }cm² × ½ = ${luas.toLocaleString('id-ID')}cm²`;
    document.getElementById('value-hasil-akhir-segitiga').textContent = luas.toLocaleString('id-ID') + 'cm²';

    // --- ANIMATE SVG ---
    textT.textContent = `t = ${tinggi}`;
    textA.textContent = `a = ${alas}`;

    // Scaled values for visualization (Min 50px, Max constraints)
    let visualA = Math.max(50, Math.min(50 + (alas * 2.5), 240)); 
    let visualT = Math.max(50, Math.min(50 + (tinggi * 2.5), 130));

    let centerX = 150;
    let baselineY = 150; // Bottom of triangle
    let leftX = centerX - (visualA / 2);
    let rightX = centerX + (visualA / 2);
    let topY = baselineY - visualT;

    // Update Triangle Path
    segitigaShape.setAttribute("d", `M ${centerX} ${topY} L ${leftX} ${baselineY} L ${rightX} ${baselineY} Z`);
    
    // Update Dotted Lines
    tinggiGaris.setAttribute("x1", centerX);
    tinggiGaris.setAttribute("y1", topY);
    tinggiGaris.setAttribute("x2", centerX);
    tinggiGaris.setAttribute("y2", baselineY);

    alasGaris.setAttribute("x1", leftX);
    alasGaris.setAttribute("y1", baselineY + 8);
    alasGaris.setAttribute("x2", rightX);
    alasGaris.setAttribute("y2", baselineY + 8);

    // Update Label positions
    textT.setAttribute("y", topY + (visualT / 2) + 5);
    textA.setAttribute("y", baselineY + 26);

    // Update Arrows to follow the new sizes
    let tArrowY = topY + 20; 
    panahTinggiGaris.setAttribute("d", `M ${centerX + 5} ${tArrowY} Q ${centerX + 15} ${tArrowY - 15} ${centerX + 32} ${tArrowY - 15}`);
    panahTinggiKepala.setAttribute("points", `${centerX + 24},${tArrowY - 21} ${centerX + 32},${tArrowY - 15} ${centerX + 24},${tArrowY - 9}`);
    teksTinggiLabel.setAttribute("x", centerX + 40);
    teksTinggiLabel.setAttribute("y", tArrowY - 9);

    let aArrowXOffset = rightX - 20;
    panahAlasGaris.setAttribute("d", `M ${aArrowXOffset} ${baselineY + 13} Q ${aArrowXOffset + 10} ${baselineY + 28} ${aArrowXOffset + 27} ${baselineY + 28}`);
    panahAlasKepala.setAttribute("points", `${aArrowXOffset + 19},${baselineY + 22} ${aArrowXOffset + 27},${baselineY + 28} ${aArrowXOffset + 19},${baselineY + 34}`);
    teksAlasLabel.setAttribute("x", aArrowXOffset + 35);
    teksAlasLabel.setAttribute("y", baselineY + 33);
});

inputAlas.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        hitungBtn.click();
    }
});

inputTinggi.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        hitungBtn.click();
    }
});

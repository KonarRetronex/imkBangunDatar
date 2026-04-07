
const hitungBtn = document.getElementById('hitung-btn');
const inputJariJari = document.getElementById('input-field-lingkaran');


const lingkaranShape = document.getElementById("lingkaran-shape");
const lingkaranGaris = document.getElementById("lingkaran-garis");
const gambarTextR = document.getElementById("gambar-text-r");
const panahGaris = document.getElementById("panah-garis");
const panahKepala = document.getElementById("panah-kepala");
const teksJariJari = document.getElementById("teks-jari-jari");

hitungBtn.addEventListener('click', function() {
    let r = parseFloat(inputJariJari.value);

    if (r === '' || r < 0 || r !== parseFloat(r)) {
        alert('Masukkan nilai jari-jari yang valid (harus berupa angka,tidak boleh kosong atau negatif).');
        return;
    }

    const rKuadrat = r * r;
    const pi = 3.14;
    const hasilKali = rKuadrat * pi;
    
    document.getElementById('r').textContent = `Nilai r = ${r}cm`;
    document.getElementById('r-kuadrat').textContent = `${r}² = ${r}cm × ${r}cm = ${rKuadrat.toLocaleString('id-ID')}cm²`;
    document.getElementById('hasil-kali').textContent = `${rKuadrat}cm² × ${pi} = ${hasilKali.toLocaleString('id-ID')}cm²`;
    document.getElementById('value-hasil-akhir-lingkaran').textContent = hasilKali.toLocaleString('id-ID') + 'cm²';


// --- ANIMATE THE SVG ---
    
    // Update the text inside the drawing
    gambarTextR.textContent = `r = ${r}`;
    
    // Calculate how big the circle should be
    let scaledR = 30 + (r * 1.2);
    let visualRadius = Math.max(30, Math.min(scaledR, 95));

    // 1. Resize the circle and dotted line
    lingkaranShape.setAttribute("r", visualRadius);
    lingkaranGaris.setAttribute("x2", 150 + visualRadius);

    // 2. Position the "r = ..." text safely inside the circle (using the / 3 trick!)
    gambarTextR.setAttribute("x", 150 + (visualRadius / 3));
    let dynamicFontSize = Math.max(12, Math.min(16, visualRadius / 2));
    gambarTextR.setAttribute("font-size", dynamicFontSize);

    // 3. Perfect the Arrow! Find the exact right edge of the circle
    let edgeX = 150 + visualRadius;

    // 4. Draw a perfectly smooth curve that ends horizontally
    panahGaris.setAttribute("d", `M ${edgeX + 2} 90 Q ${edgeX + 15} 75 ${edgeX + 32} 75`);
    
    // 5. Draw a perfectly symmetrical arrowhead
    panahKepala.setAttribute("points", `${edgeX + 24},68 ${edgeX + 32},75 ${edgeX + 24},82`);
    
    // 6. Move the "Jari-jari" text perfectly next to the arrow tip
    teksJariJari.setAttribute("x", edgeX + 40);
    teksJariJari.setAttribute("y", 80);
});

inputJariJari.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        hitungBtn.click();
    }
});

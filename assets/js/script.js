const myModal = new bootstrap.Modal(document.getElementById("modal"));
const form = document.querySelector("form");

const rackBuku = [];
const rakSelesai = [];
const rakBulumSelesai = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  let data = Object.fromEntries(formData.entries());
  data.id = +new Date();

  tambahBuku(data);
  resetForm(form);

  console.log(rakSelesai);
  console.log(rakBulumSelesai);

  susunBuku();
});

function tambahBuku(buku) {
  if (buku.status == "selesa") {
    rakSelesai.push(buku);
  } else {
    rakBulumSelesai.push(buku);
  }

  myModal.hide();

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Data Berhasil Disimpan",
    showConfirmButton: false,
    timer: 1500,
  });
}

function resetForm(form) {
  form.reset();
}

function susunBuku() {
  const selesai = document.getElementById("rakSelesai");
  const belum = document.getElementById("rakBelumSelesai");

  selesai.innerHTML = "";
  rakBulumSelesai.forEach((val, i) => {
    belum.innerHTML += `
    <div class="row p-2 border rounded">
    <div class="col">
      <h3>${val.judul}</h3>
      <p>Penulis :</p>
      <p>Tahun Terbit :</p>
      <div
        class="btn-group"
        role="group"
        aria-label="Basic outlined example"
      >
        <button onclick="hapusBuku()" type="button" class="btn btn-outline-primary">
          Edit
        </button>
        <button onclick="editBuku())" type="button" class="btn btn-outline-primary">
          Hapus
        </button>
      </div>
    </div>
  </div>
  <hr>
    `;
  });

  belum.innerHTML = "";
  rakBulumSelesai.forEach((val, i) => {
    // console.log(val.judul);
    belum.innerHTML += `
    <div class="row p-2 border rounded">
    <div class="col">
      <h3>${val.judul}</h3>
      <p>Penulis : ${val.penulis}</p>
      <p>Tahun Terbit : ${val.tahunterbit}</p>
      <div
        class="btn-group"
        role="group"
        aria-label="Basic outlined example"
      >
        <button onclick="editBuku(${i},'${val.status}')" type="button" class="btn btn-outline-primary">
          Edit
        </button>
        <button onclick="hapusBuku(${i},'${val.status}')" type="button" class="btn btn-outline-primary">
          Hapus
        </button>
      </div>
    </div>
  </div>
  <hr>
    `;
  });
}

function hapusBuku(id, status) {
  if (status == "selesai") {
    rakSelesai.splice(id);
  }

  susunBuku();
}

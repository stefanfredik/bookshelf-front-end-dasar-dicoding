const myModal = new bootstrap.Modal(document.getElementById("modal"));
const form = document.querySelector("form");

const rackBuku = [];
const rakSelesai = [];
const rakBelumSelesai = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  let data = Object.fromEntries(formData.entries());
  data.id = +new Date();

  tambahBuku(data);
  resetForm(form);

  console.log(rakSelesai);
  console.log(rakBelumSelesai);

  susunBuku();
});

function tambahBuku(buku) {
  if (buku.status == "selesai") {
    rakSelesai.push(buku);
  } else {
    rakBelumSelesai.push(buku);
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
  rakSelesai.forEach((val, i) => {
    selesai.innerHTML += `
    <div class="row p-2 border rounded">
    <h3>${val.judul}</h3>
    <div class="col-md-8">
      <p class="badge bg-primary">Penulis : ${val.penulis}</p>
      <p>Tahun Terbit : ${val.tahunterbit}</p>


      <div class="btn-group" role="group" aria-label="Basic outlined example">
        <button onclick="editBuku(${i},'${val.status}')" type="button" class="btn btn-outline-primary">Edit</button>
        <button onclick="hapusBuku(${i},'${val.status}')" type="button" class="btn btn-outline-primary">Hapus</button>
    </div>

    </div>
    <div class="col-md-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
      <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
      </svg>
    </div>
  </div>
  <hr>
    `;
  });

  belum.innerHTML = "";
  rakBelumSelesai.forEach((val, i) => {
    // console.log(val.judul);
    belum.innerHTML += `
    <div class="row p-2 border rounded">
    
    <div class="col-md-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
      </svg>
    </div>
    <div class="col-md-8">
      <h3>${val.judul}</h3>
      <p class="badge bg-primary">Penulis : ${val.penulis}</p>
      <p>Tahun Terbit : ${val.tahunterbit}</p>
      <div class="btn-group" role="group" aria-label="Basic outlined example">
        <button onclick="editBuku('${i}','${val.status}')" type="button" class="btn btn-outline-primary">Edit</button>
        <button onclick="hapusBuku('${i}','${val.status}')" type="button" class="btn btn-outline-primary">Hapus</button>
    </div>
    </div>
  </div>
  <hr>
    `;
  });
}

function hapusBuku(id, status) {
  if (status == "selesai") {
    rakSelesai.splice(id, 1);
  } else {
    rakBelumSelesai.splice(id, 1);
  }

  susunBuku();

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Data Berhasil Disimpan",
    showConfirmButton: false,
    timer: 1500,
  });
}

function editBuku() {
  myModal.show();
}

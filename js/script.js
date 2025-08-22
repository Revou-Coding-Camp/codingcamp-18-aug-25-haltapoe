// Mengambil elemen DOM
const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const addButton = document.getElementById('add-btn');
const filterButton = document.getElementById('filter-btn');
const deleteAllButton = document.getElementById('delete-all-btn');
const todoListBody = document.querySelector('.todo-list tbody');

// Array untuk menyimpan data tugas
let todoList = [];

// Fungsi untuk memeriksa apakah input hanya mengandung angka
function isValidDate(date) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;  // Format mm/dd/yyyy
  return regex.test(date);  // Memeriksa apakah input sesuai dengan format
}

// Fungsi untuk menambahkan tugas ke dalam daftar
addButton.addEventListener('click', function() {
  const task = todoInput.value.trim();
  const dueDate = dateInput.value.trim();

  if (task && dueDate) {
    if (!isValidDate(dueDate)) {
      alert("Please enter a valid date in the format mm/dd/yyyy.");
      return;
    }
    const newTask = {
      task,
      dueDate,
      status: 'Pending'
    };

    todoList.push(newTask); // Menambahkan tugas baru ke array
    console.log(todoList);  // Cek apakah data ditambahkan dengan benar
    renderTodoList();  // Memperbarui tampilan setelah tugas ditambahkan
    todoInput.value = '';  // Mengosongkan input
    dateInput.value = '';  // Mengosongkan input tanggal
  } else {
    alert("Please fill in both fields.");
  }
});

// Fungsi untuk menghapus tugas tertentu
function deleteTask(index) {
  todoList.splice(index, 1);  // Menghapus tugas dari array berdasarkan index
  renderTodoList();  // Memperbarui tampilan setelah tugas dihapus
}

// Fungsi untuk menghapus semua tugas
deleteAllButton.addEventListener('click', function() {
  todoList = [];  // Mengosongkan array tugas
  renderTodoList();  // Memperbarui tampilan setelah semua tugas dihapus
});

// Fungsi untuk memfilter tugas berdasarkan tanggal
filterButton.addEventListener('click', function() {
  const filterDate = dateInput.value.trim();
  if (filterDate) {
    const filteredList = todoList.filter(todo => todo.dueDate === filterDate);  // Memfilter tugas berdasarkan tanggal
    renderTodoList(filteredList);  // Menampilkan daftar tugas yang sudah difilter
  } else {
    alert("Please enter a date to filter.");
  }
});

// Fungsi untuk merender daftar tugas
function renderTodoList(list = todoList) {
  todoListBody.innerHTML = '';  // Mengosongkan tubuh tabel sebelum merender ulang

  if (list.length === 0) {
    todoListBody.innerHTML = '<tr><td colspan="4">No task found</td></tr>';
    return;
  }

  list.forEach((todo, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.dueDate}</td>
      <td>${todo.status}</td>
      <td><button class="delete-btn" onclick="deleteTask(${index})">Delete</button></td>
    `;
    todoListBody.appendChild(tr);
  });
}

// Memulai aplikasi dengan merender daftar kosong
renderTodoList();
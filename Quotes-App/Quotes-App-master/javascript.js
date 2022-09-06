//button with id myBtn
var value = 1;
var author = "";
var link = ["quotes.html", "", "", ""];
function getAuthors() {
  if (value == 1) {
    var table = document.getElementById("Author-table");
    table.style = "display:block;";

    url = "https://quote-api-app.herokuapp.com/author";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          var row = `
                 <tr>
                 <td>${data[i]}</td>
                 </tr>`;
          table.innerHTML += row;
        }
        addRowHandlers();
      });
    value = 0;
  } else {
    var table = document.getElementById("Author-table");
    table.style = "display:none;";
    value = 1;
  }
}

function addRowHandlers() {
  var table = document.getElementById("Author-table");
  var rows = table.getElementsByTagName("tr");
  for (i = 0; i < rows.length; i++) {
    var currentRow = table.rows[i];
    var createClickHandler = function (row) {
      return function () {
        var cell = row.getElementsByTagName("td")[0];
        author = cell.innerHTML;
        sessionStorage.setItem("authName", author);
        return (window.location.href = "quotes.html");
      };
    };
    currentRow.onclick = createClickHandler(currentRow);
  }
}

function getQuotes(x) {
  if (value == 1) {
    var table = document.getElementById("Quotes-table");
    table.style = "display:block;";

    url = "https://quote-api-app.herokuapp.com/quote";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          var row = `
                 <tr>
                 <td>${data[i].quote}
                 <span>${data[i].likes} </span>
                 <br><br><span><i>-${data[i].author}</i></span></td>
                 </tr>`;
          table.innerHTML += row;
        }
        authorSearch();
      });
    value = 0;
  } else {
    var table = document.getElementById("Quotes-table");
    table.style = "display:none;";
    value = 1;
  }
  if (x != "") {
    document.getElementById("myInput").value = x;
  }
}

function authorSearch() {
  let input, filter, table, tr, td, txtValue;

  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("Quotes-table");
  tr = table.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function getAuthorName() {
  if (author == "") {
    author = sessionStorage.getItem("authName");
    sessionStorage.removeItem("authName");
  }
  if (author == null) {
    return "";
  } else {
    return author;
  }
}

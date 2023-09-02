let data = [
  {
    name: "user1",
    role: "Web Developer",
    image: "user1.png",
  },
  {
    name: "user2",
    role: "Web Developer",
    image: "user2.png",
  },
  {
    name: "user3",
    role: "Web Developer",
    image: "user3.png",
  },
  {
    name: "user4",
    role: "Web Developer",
    image: "user4.png",
  },
  {
    name: "user5",
    role: "Web Developer",
    image: "user5.png",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
const ul = document.querySelector("ul");

const createListElement = () => {
  ul.innerHTML = "";

  const listHeader = document.createElement("li");
  listHeader.classList.add("list-header"); // เพิ่มคลาสสำหรับหัวข้อ
  listHeader.innerHTML = `
    <div class="header-content">
      <h2>การจัดวางตำแหน่งสามารถทำได้หรือไม่?</h2>
      <p>คลิกที่รายการและลากเพื่อจัดวาง</p>
    </div>
  `;
  ul.appendChild(listHeader);

  data.forEach((person, i) => {
    const li = document.createElement("li");
    li.setAttribute("list-pos", i);

    li.innerHTML = `
        <div class="user">
          <img src="images/${person.image}" alt="" />
          <div class="info">
            <h2>${person.name}</h2>
            <p>${person.role}</p>
          </div>
        </div>
        <h1 class="iocn">&#10978;</h1>
        `;

    ul.appendChild(li);
  });
  listenToEvents();
};

createListElement();

// ─────────────────────────────────────────────────────────────────────────────
function listenToEvents() {
  let lists = ul.querySelectorAll("li"),
    current_pos,
    drop_pos;

  for (let li of lists) {
    li.draggable = true;

    li.ondragstart = function () {
      current_pos = this.getAttribute("list-pos");

      //   ul.style.height = ul.clientHeight + "px";
      //   setTimeout(() => {
      //     this.style.display = "none";
      //   }, 0);

      //   ul.style.height = ul.clientHeight - this.clientHeight + "px";
    };

    li.ondragenter = () => li.classList.add("active");
    li.ondragleave = () => li.classList.remove("active");

    li.ondragend = function () {
      this.style.display = "flex";
      for (let active_list of lists) {
        active_list.classList.remove("active");
      }
    };

    li.ondragover = (e) => e.preventDefault();

    li.ondrop = function (e) {
      e.preventDefault();
      //   ul.style.height = ul.clientHeight + this.clientHeight + "px";

      drop_pos = this.getAttribute("list-pos");
      data.splice(drop_pos, 0, data.splice(current_pos, 1)[0]);

      createListElement();
      //   console.log(
      //     "data",
      //     JSON.stringify(data.splice(current_pos, 1)[0], null, 2)
      //   );
      //   console.log("current_pos", JSON.stringify(current_pos, null, 2)),
      //     console.log("drop_pos", JSON.stringify(drop_pos, null, 2));
    };
  }
}

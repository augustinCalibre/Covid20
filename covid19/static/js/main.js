const buildInfoBox = (ncas, nguerie, ndeces) => {
    return `<li class="ncas">Nombre de cas: <b>${ncas}</b></li>
    <li class="ndeces">Nombre de décès: <b>${nguerie}</b></li>
    <li class="nguerie">Nombre de guéris: <b>${ndeces}</b></li>
    <li class="nactif">Nombre de cas actifs: <b>${ncas - (nguerie + ndeces)}</b></li>`
}



const changeResultBodies = (item, pointerPosition) => {
    const mapSvg = document.querySelector('.map-svg');
    const modal = document.querySelector('.modal-svg');

    const modalHeader = document.querySelector('.modal-svg h5');
    const modalUl = document.querySelector('.modal-svg .case-ul');

    const lis = buildInfoBox(item.fields.Ncas, item.fields.Ngueris, item.fields.Ndeces);
    // Update contents

    // Get parent position
    const { x, y } = mapSvg.getBoundingClientRect();
    const { cursorX, cursorY } = pointerPosition;

    const new_cursorX = cursorX - x;
    const new_cursorY = cursorY - y;

    modal.style.top = `${new_cursorX + 20}px`;
    modal.style.left = `${new_cursorY}px`;

    modalHeader.textContent = item.fields.ville;
    modalUl.innerHTML = lis;
}

const hidenField = document.querySelector('#data').value;
const jsonStore = JSON.parse(hidenField);

// Adding events
const paths = document.querySelectorAll('a[title]');
paths.forEach((path) => {
    path.addEventListener('mouseenter', (e) => {
        document.querySelector('.modal-svg').classList.toggle('hide_modal_svg');

        const id = e.target.getAttribute('id');
        // Fetch corresponding data
        const item = jsonStore.find((item) => id.toLowerCase() == item.fields.cleSvg.toLowerCase());
        if (item) {
            const { Ncas } = item.fields;
            if (Ncas > 5000) {
                e.target.children[0].style.fill = "red";
            }
            else {
                e.target.children[0].style.fill = "green";
            }
            changeResultBodies(item, { cursorX: e.clientX, cursorY: e.clientY });
            e.target.children[0].addEventListener('mouseout', (e) => {
                e.target.style.fill = "#a4ced2";
            })
        }
    });
});

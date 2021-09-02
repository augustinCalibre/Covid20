const changeResultBodies=(item,svgPath)=>{
    const modal=document.querySelector('.modal-svg');
    const modalHeader=document.querySelector('.modal-header h4');

    const modalPathPlace=document.querySelector('.modal-header .path_info #custom_path');
    const modalResult1=document.querySelector('.results .result1');
    const modalResult2=document.querySelector('.results .result2');
    const modalResult3=document.querySelector('.results .result3');


    // Update contents
    modalHeader.textContent=item.fields.ville;
    svgPath.style.fill="red";
    modalPathPlace.textContent='';
    modalPathPlace.appendChild(svgPath.cloneNode(true));
    modalResult1.textContent=item.fields.Ncas;
    modalResult2.textContent=item.fields.Ndeces;
    modalResult3.textContent=item.fields.Ngueris;

    modal.style.display="block";
}

const hidenField = document.querySelector('#data').value;
const jsonStore = JSON.parse(hidenField);

// Adding events
const paths = document.querySelectorAll('a[title]');
paths.forEach((path) => {
    path.addEventListener('mouseenter', (e) => {
        const id = e.target.getAttribute('id');
        // Fetch corresponding data
        const item = jsonStore.find((item) => id.toLowerCase() == item.fields.cleSvg.toLowerCase());
        console.log(item);
        if (item) {
            const { Ncas } = item.fields;
            if (Ncas > 200) {
                e.target.children[0].style.fill = "red";
            }
            else {
                e.target.children[0].style.fill = "green";
            } 
            changeResultBodies(item,e.target);
            e.target.children[0].addEventListener('mouseout', (e) => {
                e.target.style.fill = "#a4ced2";
            })
        }
    });
});

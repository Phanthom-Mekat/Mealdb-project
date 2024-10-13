const loadData = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=c';   
    const res = await fetch(url);
    const data = await res.json();
    showAllData(data.meals);
}

const showAllData =  (data) => {
    const menu = document.getElementById('menu');
    const showAll =document.getElementById('showAll');
    menu.textContent = '';
    let c = 0;
    for (const meal of data) {
        const div = document.createElement('div');
        div.classList.add('card', 'flex-row', 'card-compact', 'bg-base-100', 'shadow-xl', 'rounded-xl');
        div.innerHTML = `
        
        <figure>
          <img class="rounded-xl"
            src="${meal.strMealThumb}"
            alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">${meal.strMeal}</h2>
          <p>${meal.strInstructions.slice(0, 200)}</p>
          <div class="card-actions justify-end">
            <a onclick="openModal('${meal.strMeal.replace(/'/g, "\\'")}', '${meal.strMealThumb}', '${meal.strCategory}', '${meal.strArea}', \`${meal.strInstructions}\`, '${meal.strYoutube}')" class="border-b-2 cursor-pointer border-[#FFC107]">View Details</a>


          </div>
        </div>
        `;

        menu.appendChild(div);




        c++
        if(c === 4){
            break;
        }
    }
    showAll.addEventListener('click', () => {
        menu.textContent = '';
        for (const meal of data) {
            
            const div = document.createElement('div');
            div.classList.add('card', 'flex-row', 'card-compact', 'bg-base-100', 'shadow-xl', 'rounded-xl');
            div.innerHTML = `
            
            <figure>
              <img class="rounded-xl"
                src="${meal.strMealThumb}"
                alt="Shoes" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${meal.strMeal}</h2>
              <p>${meal.strInstructions.slice(0, 200)}</p>
              <div class="card-actions justify-end">
                <a onclick="openModal('${meal.strMeal.replace(/'/g, "\\'")}', '${meal.strMealThumb}', '${meal.strCategory}', '${meal.strArea}', \`${meal.strInstructions}\`, '${meal.strYoutube}')" class="border-b-2 cursor-pointer border-[#FFC107]">View Details</a>


              </div>
            </div>
            `;
            menu.appendChild(div);
        }   
    }) 

    
}

const openModal = (mealName, mealImage, category, area, instructions, youtubeLink) => {
  const modal = document.getElementById('my_modal_5');
  const modalTitle = modal.querySelector('#meal-title');
  const modalImage = modal.querySelector('#meal-image');
  const modalCategory = modal.querySelector('#meal-category');
  const modalArea = modal.querySelector('#meal-area');
  const modalInstructions = modal.querySelector('#meal-instructions');
  const modalYoutube = modal.querySelector('#meal-youtube');

  modalTitle.textContent = mealName;
  modalImage.src = mealImage;
  modalCategory.textContent = category;
  modalArea.textContent = area;
  modalInstructions.textContent = instructions;
  modalYoutube.href = youtubeLink;

  modal.showModal();
};












const searchAll = async () => {
    const search = document.getElementById('search');
    const menu = document.getElementById('menu');
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`;

    try {
        const res = await fetch(url);  
        const data = await res.json(); 
        showAllData(data.meals);  
    } catch (error) {
        console.error('Error fetching data:', error); 
    }
}


loadData();
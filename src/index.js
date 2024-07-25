import { Notify } from "notiflix";
import simpleLightbox from "simplelightbox";
import { fetchImg } from "./api";

const form = document.querySelector('#search-form');

const onFormSubmit = (e) => {
 e.preventDefault();
 const query = e.currentTarget.elements.searchQuery.value;
 console.log(query);
 onSearch(query);
};

const onSearch = async (query) => {
const img = await fetchImg(query);
console.log(img);
}

form.addEventListener('submit', onFormSubmit)
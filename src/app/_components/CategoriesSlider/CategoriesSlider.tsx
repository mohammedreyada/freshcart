import React from 'react'
import CategoriesSweipper from '../CategoriesSweipper/CategoriesSweipper';

export default async function CategoriesSlider() {
  let res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
  let data = await res.json();

  // خد الـ array الحقيقي
  const categories = data.data;

  return (
    <>
      <CategoriesSweipper categories={categories} />
    </>
  );
}

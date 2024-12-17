import React, { useState } from 'react';
import Drawer from './Drawer'; // Adjust the path as necessary

const ParentComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const productsByCategory = {
    // Sample product structure
    category1: [{ _id: '1', _images: ['image1.jpg'], _categoryId: [{ title: 'Category 1' }], _price: 10 }],
    category2: [{ _id: '2', _images: ['image2.jpg'], _categoryId: [{ title: 'Category 2' }], _price: 20 }]
  };

  const handleUpdateQuantity = (productId, change) => {
    setCartItems((prevCartItems) => {
      const newCartItems = [...prevCartItems];
      if (change === -1) {
        const index = newCartItems.lastIndexOf(productId);
        if (index !== -1) {
          newCartItems.splice(index, 1);
        }
      } else if (change === 1) {
        newCartItems.push(productId);
      }
      return newCartItems;
    });
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item !== productId));
  };

  return (
    <Drawer
      isOpen={true}
      onClose={() => {}}
      cartItems={cartItems}
      productsByCategory={productsByCategory}
      handleRemoveItem={handleRemoveItem}
      handleUpdateQuantity={handleUpdateQuantity}
    />
  );
};

export default ParentComponent;

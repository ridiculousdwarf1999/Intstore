document.addEventListener('DOMContentLoaded', () => {

  const search = document.querySelector('.search')
  const cartBtn = document.getElementById('cart');
  const wishlistBtn = document.getElementById('wishlist');
  const goodsWrapper = document.querySelector('.goods-wrapper');
  const cart = document.querySelector('.cart');
  const cartClose = document.querySelector('.cart-close');
  const category = document.querySelector('.category');

  const createCardGoods = (id, title, price, img) => {

    const card = document.createElement('div');
    card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
    card.innerHTML = `<div class="card">
                        <div class="card-img-wrapper">
                          <img class="card-img-top" src="${img}" alt="">
                          <button class="card-add-wishlist"
                            data-goods-id="${id}"></button>
                        </div>
                        <div class="card-body justify-content-between">
                          <a href="#" class="card-title">${title}</a>
                          <div class="card-price">${price} ₽</div>
                          <div>
                            <button class="card-add-cart"
                              data-goods-id="${id}">Добавить в корзину</button>
                          </div>
                        </div>
                      </div>`;
    return card
  };

  // goodsWrapper.appendChild(createCardGoods(1, 'Дартс', 2000, 'img/temp/Archer.jpg'));
  // goodsWrapper.appendChild(createCardGoods(2, 'Фламинго', 3000, 'img/temp/Flamingo.jpg'));
  // goodsWrapper.appendChild(createCardGoods(3, 'Носки', 333, 'img/temp/Socks.jpg'));

  const openCart = (event) => {
    event.preventDefault();
    cart.style.display = 'flex';
    document.addEventListener('keyup', closeCart);
  };

  // const closeCartX = () => {
  //   cart.style.display = 'none';
  // };

  const closeCart = (event) => {
    const target = event.target;
    if (target === cart || target === cartClose || event.keyCode === 27) {
      cart.style.display = 'none';
      document.removeEventListener('keyup', closeCart);
    }
    //console.log(event.keyCode);
  };

  const renderCard = (items) => {
    items.forEach((item) => {
      const {id, title, price, imgMin} = item;
      goodsWrapper.appendChild(createCardGoods(id, title, price, imgMin));
    });
  };

  const getGoods = (handler, filter) => {
    fetch('db/db.json')
      .then(response => response.json())
      .then(filter)
      .then(handler);
  };

  const randomSort = (item) => {
    return item.sort(() => Math.random() - 0.5);
  };

  const chooseCategory = event => {
    event.preventDefault();
    const target = event.target;
    if (target.classList.contains('category-item')) {
      goodsWrapper.innerHTML = '';
      const category = target.dataset.category;
      getGoods(renderCard, goods => randomSort(goods.filter(item => item.category.includes(category))))
    }
  };

  cartBtn.addEventListener('click', openCart);
  //cartClose.addEventListener('click', closeCartX);
  cart.addEventListener('click', closeCart);
  category.addEventListener('click', chooseCategory)
  
  getGoods(renderCard, randomSort);

});
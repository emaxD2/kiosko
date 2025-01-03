import React, { useState, useEffect, useRef } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonList,
  IonSearchbar,
} from '@ionic/react';
import { addOutline, pencilOutline, trashOutline } from 'ionicons/icons';
import { ref, push, onValue, remove, update, set } from 'firebase/database';
import { database } from '../pages/firebaseConfig';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productQuantity, setProductQuantity] = useState(0);
  const [productPrice, setProductPrice] = useState(0.0);
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);

  const productQuantityRef = useRef<HTMLIonInputElement>(null);
  const productPriceRef = useRef<HTMLIonInputElement>(null);

  // Maneja la entrada del nombre del producto
  const handleProductNameInput = (value: string) => {
    setProductName(value);

    // Filtra las sugerencias según la entrada del usuario
    const suggestions = products.filter((product) =>
      product.nombre.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(suggestions);
  };

  // Selecciona una sugerencia
  const handleSuggestionClick = (nombre: string) => {
    setProductName(nombre); // Establece el nombre del producto seleccionado
    setFilteredSuggestions([]); // Limpia las sugerencias
  };

  // Obtener los datos de Firebase
  useEffect(() => {
    const productsRef = ref(database, 'Productos');
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productList = data
        ? Object.entries(data).map(([id, value]: [string, any]) => ({
            id,
            ...value,
          }))
        : [];
      setProducts(productList);
    });
    return () => unsubscribe();
  }, []);

  // Agregar un nuevo producto
  const addProduct = async () => {
    try {
      const productData = prepareProductData();
      const duplicate = products.find(
        (product) => product.nombre.toLowerCase() === productName.toLowerCase()
      );

      if (duplicate) {
        alert('El producto ya existe. Por favor, edítalo si deseas cambiar algo.');
        return;
      }

      const newProductRef = push(ref(database, 'Productos'));
      await set(newProductRef, productData);
      console.log('Producto agregado:', newProductRef.key);
      resetForm();
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  // Editar un producto existente
  const editProduct = async () => {
    try {
      const productData = prepareProductData();
      const productRef = ref(database, `Productos/${editProductId}`);
      await update(productRef, productData);
      console.log('Producto actualizado:', editProductId);
      resetForm();
    } catch (error) {
      console.error('Error al editar producto:', error);
    }
  };

  // Preparar los datos del producto
  const prepareProductData = () => {
    const quantityValue = productQuantityRef.current?.value;
    const finalQuantity = Number(quantityValue) || 0;
    setProductQuantity(finalQuantity);

    const priceValue = productPriceRef.current?.value;
    const finalPrice = Number(priceValue) || 0.0;
    setProductPrice(finalPrice);

    return {
      nombre: productName,
      categoria: productCategory,
      cantidad: finalQuantity,
      precio: finalPrice,
    };
  };

  // Restablecer el formulario y cerrar el modal
  const resetForm = () => {
    setProductName('');
    setProductCategory('');
    setProductQuantity(0);
    setProductPrice(0.0);
    setIsEditing(false);
    setEditProductId(null);
    setShowModal(false);
  };

  // Eliminar un producto de Firebase
  const handleDeleteProduct = async (id: string) => {
    try {
      const productRef = ref(database, `Productos/${id}`);
      await remove(productRef);
      console.log('Producto eliminado:', id);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  // Filtrar los productos según el término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="TituloProductosTab2">Productos</IonTitle>
          <IonFab className="fab-add-product">
            <IonFabButton
              size="small"
              onClick={() => setShowModal(true)}
            >
              <IonIcon icon={addOutline} />
            </IonFabButton>
          </IonFab>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            placeholder="Buscar producto por nombre"
            value={searchTerm}
            onIonInput={(e) => setSearchTerm(e.detail.value!)}
            showCancelButton="never"
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {filteredProducts.map((product) => (
            <IonItem key={product.id}>
              <IonLabel>
                <div className="TituloProducto">{product.nombre}</div>
                <p className="descripcionListaProducto">Categoría: {product.categoria}</p>
                <p className="descripcionListaProducto">Cantidad: {product.cantidad}</p>
                <p className="descripcionListaProducto">Precio: Bs{product.precio}</p>
              </IonLabel>
              <IonButton
                fill="clear"
                onClick={() => {
                  setEditProductId(product.id);
                  setProductName(product.nombre);
                  setProductCategory(product.categoria);
                  setProductQuantity(product.cantidad || 0);
                  setProductPrice(product.precio || 0.0);
                  setIsEditing(true);
                  setShowModal(true);
                }}
              >
                <IonIcon icon={pencilOutline} />
              </IonButton>
              <IonButton
                fill="clear"
                color="danger"
                onClick={() => handleDeleteProduct(product.id)}
              >
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonModal isOpen={showModal} onDidDismiss={resetForm}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isEditing ? editProduct() : addProduct();
            }}
          >
            <div className="modal-content">
              <div className='tituloEditar'>{isEditing ? 'Editar Producto' : 'Agregar Producto'}</div>
              <IonItem>
                <IonLabel color='warning' position="stacked">Nombre</IonLabel>
                <IonInput
                  style={{ position: 'relative' }}
                  placeholder="Nombre del producto"
                  value={productName}
                  onIonInput={(e) => handleProductNameInput(e.detail.value!)}
                />
                {filteredSuggestions.length > 0 && (
                  <div className="suggestion-list">
                    {filteredSuggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="suggestion-item"
                        onClick={() => handleSuggestionClick(suggestion.nombre)}
                      >
                        {suggestion.nombre}
                      </div>
                    ))}
                  </div>
                )}
              </IonItem>

              <IonItem>
                <IonLabel color='warning' position="stacked">Categoría</IonLabel>
                <IonSelect
                  placeholder="Selecciona una categoría"
                  value={productCategory}
                  onIonChange={(e) => setProductCategory(e.detail.value)}
                >
                  <IonSelectOption value="Bebida">Bebida</IonSelectOption>
                  <IonSelectOption value="Galleta">Galleta</IonSelectOption>
                  <IonSelectOption value="Medicamento">Medicamento</IonSelectOption>
                  <IonSelectOption value="Helado">Helado</IonSelectOption>
                  <IonSelectOption value="Masticables">Masticable</IonSelectOption>
                  <IonSelectOption value="Jugos">Jugos</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel color='warning' position="stacked">Cantidad</IonLabel>
                <IonInput
                  ref={productQuantityRef}
                  type="number"
                  placeholder="Cantidad en inventario"
                  value={productQuantity}
                  onIonChange={(e) => setProductQuantity(Number(e.detail.value) || 0)}
                />
              </IonItem>
              <IonItem>
                <IonLabel color='warning' position="stacked">Precio</IonLabel>
                <IonInput
                  ref={productPriceRef}
                  type="number"
                  step="0.01"
                  placeholder="Precio del producto"
                  value={productPrice}
                  onIonChange={(e) => setProductPrice(Number(e.detail.value) || 0.0)}
                />
              </IonItem>
              <IonButton expand="full" type="submit">
                {isEditing ? 'Actualizar Producto' : 'Guardar Producto'}
              </IonButton>
              <IonButton expand="full" color="light" onClick={resetForm}>
                Cancelar
              </IonButton>
            </div>
          </form>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
import React from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonTabButton,
} from '@ionic/react';
import './Tab1.css';
import cuaderno from '../images/cuaderno3d.png';
import helado from '../images/helao.png';
import bebida from '../images/cocacola 3d.png';
import dulces from '../images/dulces3d.png';
import jugos from '../images/jugo3d.png';
import { cartOutline } from 'ionicons/icons';

const Tab1 = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="toolbar-content">
            <IonTitle className='TituloProductosTab1'>Menu Principal</IonTitle>
            <IonTabButton tab="tab3" href="/tab3" className="cart-button">
              <IonIcon aria-hidden="true" icon={cartOutline} />
            </IonTabButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Cartas estilo carrusel */}
        <figure className='icon-cards'>
          <div className="icon-cards-content">
            <div className='cards-item' style={{alignItems: 'center'}}>En Contruccion</div>
            <div className='cards-item' style={{alignItems: 'center'}}>En proceso de ideas frescas</div>
            <div className='cards-item' style={{alignItems: 'center'}}>Tal vez entre datos de dashboard</div>
          </div>
        </figure>
        <div className="parent">
          {/* Div 1 */}
          <div className="div1">
            <div className="text">
              <div className='tituloCartas'>Cambios recientes</div>
              <p className='descripcionCartas'>Este es un breve resumen de los cambios recientes.</p>
            </div>
            <img src={cuaderno} alt="Cuaderno" style={{width: 180}}/>
          </div>
          {/* Div 2 */}
          <div className="div2">
            <div className='tituloCartas'>Bebida</div>
            <p className='descripcionCartas'>Disfruta de las mejores bebidas refrescantes.</p>
            <img src={bebida} alt="Bebida" style={{width: 150}}/>
          </div>

          {/* Div 3 */}
          <div className="div3">
            <div className="text">
              <div className='tituloCartas'>Helados</div>
              <p className='descripcionCartas'>Los helados más deliciosos están aquí.</p>
            </div>
            <img src={helado} alt="Helado" style={{width: 180}}/>
          </div>

          {/* Div 4 */}
          <div className="div4">
            <div className="text">
              <div className='tituloCartas'>Dulces</div>
              <p className='descripcionCartas'>Explora nuestra variedad de dulces.</p>
            </div>
            <img src={dulces} alt="Dulces" style={{width: 200}}/>
          </div>

          {/* Div 5 */}
          <div className="div5">
            <div className="text">
              <div className='tituloCartas'>Jugos</div>
              <p className='descripcionCartas'>Jugos frescos y naturales para ti.</p>
            </div>
            <img src={jugos} alt="Jugos" style={{width: 51}}/>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
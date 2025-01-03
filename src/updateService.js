import { AppUpdate } from '@capawesome/capacitor-app-update';

// Función para verificar actualizaciones
export async function checkForUpdates() {
  try {
    const updateResult = await AppUpdate.checkForUpdate({
      url: 'https://kiosko-42d08.web.app/update.json' // La URL de actualización
    });

    if (updateResult.updateAvailable) {
      console.log('Hay una nueva actualización disponible');
      // Si hay una actualización disponible, descarga e instala
      await AppUpdate.downloadUpdate();
      console.log('Actualización descargada');
      // Recarga la app o realiza la actualización
      window.location.reload();
    } else {
      console.log('No hay actualizaciones disponibles');
    }
  } catch (error) {
    console.error('Error al verificar actualizaciones:', error);
  }
}
declare module '@capawesome/capacitor-app-update' {
    export interface AppUpdatePlugin {
      checkForUpdate(options: { url: string }): Promise<{ updateAvailable: boolean }>;
      downloadUpdate(): Promise<void>;
    }
  
    export const AppUpdate: AppUpdatePlugin;
  }  
import { Injectable } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/compat/firestore';
import { ref, Storage } from '@angular/fire/storage';
import { StorageModule } from '@angular/fire/storage';
import { getDownloadURL, uploadBytes } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private urlsImagenes: string[] = [];

  constructor(private storage: Storage) {
    //this.urlsImagenes[0] = '';
    //this.urlsImagenes[1] = '';
  }
/*
  async guardarImagenes(tipo: string, nombreFoto: string, imagenes: any) {
    if (tipo == 'paciente') {
      for (let i: number = 0; i < 2; i++) {

        const refImagenes = ref(this.storage, 'paciente_' + nombreFoto + '_' + i.toString());
        const espera = await uploadBytes(refImagenes, imagenes);
        this.urlsImagenes[i] = await getDownloadURL(refImagenes);

      }
    }
    else if (tipo == 'especialista') {

      const refImagenes = ref(this.storage, 'especialista_' + nombreFoto + '_1');
      const espera = await uploadBytes(refImagenes, imagenes);
      this.urlsImagenes[0] = await getDownloadURL(refImagenes);

    }
    else if (tipo == 'admin') {
      const refImagenes = ref(this.storage, 'admin_' + nombreFoto + '_1');
      const espera = await uploadBytes(refImagenes, imagenes);
      this.urlsImagenes[0] = await getDownloadURL(refImagenes);
    }
    else {
      console.log('Error en el servicio de guardar imagenes. No se ecnontro un TIPO correcto de usuario.')
    }

    return this.urlsImagenes;
  }*/

}
